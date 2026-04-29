const domain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN as string;
const token = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN as string;
const endpoint = `https://${domain}/api/2024-01/graphql.json`;

async function shopifyFetch<T>(query: string, variables?: object): Promise<T> {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0].message);
  return json.data as T;
}

function formatPrice(amount: string, currencyCode: string): string {
  const num = parseFloat(amount);
  if (currencyCode === "INR") return `₹${num.toLocaleString("en-IN")}`;
  return `${currencyCode} ${num.toFixed(2)}`;
}

export interface ShopifyProduct {
  id: string;
  variantId: string;
  handle: string;
  name: string;
  salePrice: string;
  originalPrice?: string;
  image: string;
}

export async function getProducts(first = 8): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<any>(
    `
    query GetProducts($first: Int!) {
      products(first: $first) {
        edges {
          node {
            id
            title
            handle
            priceRange {
              minVariantPrice { amount currencyCode }
            }
            compareAtPriceRange {
              minVariantPrice { amount currencyCode }
            }
            images(first: 1) {
              edges { node { url altText } }
            }
            variants(first: 1) {
              edges { node { id } }
            }
          }
        }
      }
    }
  `,
    { first },
  );

  return data.products.edges.map(({ node }: any) => {
    const compareAmount = parseFloat(
      node.compareAtPriceRange.minVariantPrice.amount,
    );
    return {
      id: node.id,
      variantId: node.variants.edges[0]?.node.id ?? "",
      handle: node.handle,
      name: node.title,
      salePrice: formatPrice(
        node.priceRange.minVariantPrice.amount,
        node.priceRange.minVariantPrice.currencyCode,
      ),
      originalPrice:
        compareAmount > 0
          ? formatPrice(
              node.compareAtPriceRange.minVariantPrice.amount,
              node.compareAtPriceRange.minVariantPrice.currencyCode,
            )
          : undefined,
      image:
        node.images.edges[0]?.node.url ?? "/placeholder.svg",
    };
  });
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  lines: CartLine[];
  total: string;
}

export interface CartLine {
  lineId: string;
  variantId: string;
  name: string;
  image: string;
  price: string;
  quantity: number;
}

const CART_LINES_FRAGMENT = `
  id
  checkoutUrl
  lines(first: 100) {
    edges {
      node {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            product {
              title
              images(first: 1) { edges { node { url } } }
            }
            price { amount currencyCode }
          }
        }
      }
    }
  }
  estimatedCost {
    totalAmount { amount currencyCode }
  }
`;

function parseCart(raw: any): ShopifyCart {
  return {
    id: raw.id,
    checkoutUrl: raw.checkoutUrl,
    total: formatPrice(
      raw.estimatedCost.totalAmount.amount,
      raw.estimatedCost.totalAmount.currencyCode,
    ),
    lines: raw.lines.edges.map(({ node }: any) => ({
      lineId: node.id,
      variantId: node.merchandise.id,
      name: node.merchandise.product.title,
      image:
        node.merchandise.product.images.edges[0]?.node.url ??
        "/placeholder.svg",
      price: formatPrice(
        node.merchandise.price.amount,
        node.merchandise.price.currencyCode,
      ),
      quantity: node.quantity,
    })),
  };
}

export async function createCart(): Promise<ShopifyCart> {
  const data = await shopifyFetch<any>(`
    mutation { cartCreate { cart { ${CART_LINES_FRAGMENT} } } }
  `);
  return parseCart(data.cartCreate.cart);
}

export async function addLineToCart(
  cartId: string,
  variantId: string,
  quantity = 1,
): Promise<ShopifyCart> {
  const data = await shopifyFetch<any>(
    `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart { ${CART_LINES_FRAGMENT} }
      }
    }
  `,
    { cartId, lines: [{ merchandiseId: variantId, quantity }] },
  );
  return parseCart(data.cartLinesAdd.cart);
}

export async function getProductsByCollection(
  handle: string,
  first = 24,
): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<any>(
    `
    query GetCollectionProducts($handle: String!, $first: Int!) {
      collectionByHandle(handle: $handle) {
        products(first: $first) {
          edges {
            node {
              id title handle
              priceRange { minVariantPrice { amount currencyCode } }
              compareAtPriceRange { minVariantPrice { amount currencyCode } }
              images(first: 1) { edges { node { url altText } } }
              variants(first: 1) { edges { node { id } } }
            }
          }
        }
      }
    }
  `,
    { handle, first },
  );

  if (!data.collectionByHandle) return [];
  return data.collectionByHandle.products.edges.map(({ node }: any) => {
    const compareAmount = parseFloat(
      node.compareAtPriceRange.minVariantPrice.amount,
    );
    return {
      id: node.id,
      variantId: node.variants.edges[0]?.node.id ?? "",
      handle: node.handle,
      name: node.title,
      salePrice: formatPrice(
        node.priceRange.minVariantPrice.amount,
        node.priceRange.minVariantPrice.currencyCode,
      ),
      originalPrice:
        compareAmount > 0
          ? formatPrice(
              node.compareAtPriceRange.minVariantPrice.amount,
              node.compareAtPriceRange.minVariantPrice.currencyCode,
            )
          : undefined,
      image: node.images.edges[0]?.node.url ?? "/placeholder.svg",
    };
  });
}

export async function removeLineFromCart(
  cartId: string,
  lineId: string,
): Promise<ShopifyCart> {
  const data = await shopifyFetch<any>(
    `
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart { ${CART_LINES_FRAGMENT} }
      }
    }
  `,
    { cartId, lineIds: [lineId] },
  );
  return parseCart(data.cartLinesRemove.cart);
}

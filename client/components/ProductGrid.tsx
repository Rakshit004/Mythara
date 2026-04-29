import { useCart } from "../context/CartContext";

export interface Product {
  id: string;
  variantId?: string;
  name: string;
  originalPrice?: string;
  salePrice: string;
  image: string;
}

interface ProductGridProps {
  title: string;
  products: Product[];
  backgroundColor?: string;
  isLoading?: boolean;
}

function ProductSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-200 w-full aspect-square mb-4 rounded" />
      <div className="bg-gray-200 h-5 w-3/4 mb-2 rounded" />
      <div className="bg-gray-200 h-4 w-1/2 rounded" />
    </div>
  );
}

export default function ProductGrid({
  title,
  products,
  backgroundColor = "bg-white",
  isLoading = false,
}: ProductGridProps) {
  const { addToCart } = useCart();

  return (
    <section className={`py-16 px-4 ${backgroundColor}`}>
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold">{title}</h2>
          <a href="#" className="underline font-medium hover:text-gray-600">
            DISCOVER MORE
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))
            : products.map((product) => (
                <div key={product.id} className="product-card group">
                  <div className="overflow-hidden mb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-auto product-image"
                    />
                  </div>
                  <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                  <div className="text-gray-600 mb-3">
                    {product.originalPrice && (
                      <span className="line-through mr-2">
                        {product.originalPrice}
                      </span>
                    )}
                    <span className="font-bold">{product.salePrice}</span>
                  </div>
                  {product.variantId && (
                    <button
                      onClick={() =>
                        addToCart(
                          product.variantId!,
                          product.name,
                          product.image,
                          product.salePrice,
                        )
                      }
                      className="w-full border border-black py-2 text-xs font-bold tracking-widest hover:bg-black hover:text-white transition-colors"
                    >
                      ADD TO CART
                    </button>
                  )}
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}

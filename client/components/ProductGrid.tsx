interface Product {
  id: string;
  name: string;
  originalPrice?: string;
  salePrice: string;
  image: string;
}

interface ProductGridProps {
  title: string;
  products: Product[];
  backgroundColor?: string;
}

export default function ProductGrid({
  title,
  products,
  backgroundColor = "bg-white",
}: ProductGridProps) {
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
          {products.map((product) => (
            <div key={product.id} className="product-card group">
              <a href="#" className="block">
                <div className="overflow-hidden mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-auto product-image"
                  />
                </div>
                <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                <div className="text-gray-600 mb-2">
                  {product.originalPrice && (
                    <span className="line-through mr-2">
                      {product.originalPrice}
                    </span>
                  )}
                  <span className="font-bold">{product.salePrice}</span>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Sample data for the two product sections
export const latestDropProducts: Product[] = [
  {
    id: "1",
    name: "Emerald Earrings",
    originalPrice: "₹6,995",
    salePrice: "₹5,995",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/jewelry1.jpg?width=400",
  },
  {
    id: "2",
    name: "Ruby Earrings",
    originalPrice: "₹6,995",
    salePrice: "₹5,995",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/jewelry2.jpg?width=400",
  },
  {
    id: "3",
    name: "TRAINING KIT JERSEY",
    originalPrice: "₹6,995",
    salePrice: "₹5,995",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/jewelry3.jpg?width=400",
  },
  {
    id: "4",
    name: "LOST INDIGO DENIMS",
    originalPrice: "₹11,995",
    salePrice: "₹9,995",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/jewelry4.jpg?width=400",
  },
];

export const moreFromMytharaProducts: Product[] = [
  {
    id: "5",
    name: "Sapphire Earrings",
    salePrice: "₹4,495",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/jewelry5.jpg?width=400",
  },
  {
    id: "6",
    name: "Pearl Earrings",
    salePrice: "₹3,995",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/jewelry6.jpg?width=400",
  },
  {
    id: "7",
    name: "ORANGE BOX BOX T-SHIRT",
    salePrice: "₹4,495",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/jewelry7.jpg?width=400",
  },
  {
    id: "8",
    name: "BLACK GATOR-AIDE T-SHIRT",
    salePrice: "₹4,995",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/jewelry8.jpg?width=400",
  },
];

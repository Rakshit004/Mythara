import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GoAstroDrawer from "../components/GoAstroDrawer";

interface Product {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  rating: number;
  reviews: number;
  image: string;
  secondaryImage?: string;
  description: string;
}

interface JewelleryCategory {
  id: string;
  name: string;
  title: string;
  description: string;
  bannerImage: string;
  products: Product[];
}

const jewelleryCategories: { [key: string]: JewelleryCategory } = {
  earrings: {
    id: "earrings",
    name: "Earrings",
    title: "EARRINGS COLLECTION",
    description:
      "Elegant earrings that frame your face beautifully, from delicate studs to statement chandelier designs.",
    bannerImage:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/earrings-banner.jpg?width=1200",
    products: [
      {
        id: "emerald-drop-earrings",
        name: "Emerald Drop Earrings",
        price: "₹8,990",
        originalPrice: "₹12,990",
        rating: 4.8,
        reviews: 24,
        image:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/emerald-drop-earrings.jpg?width=400",
        secondaryImage:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/emerald-drop-earrings-alt.jpg?width=400",
        description:
          "Exquisite emerald drop earrings with intricate gold detailing",
      },
      {
        id: "ruby-chandelier-earrings",
        name: "Ruby Chandelier Earrings",
        price: "₹15,990",
        rating: 4.9,
        reviews: 18,
        image:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/ruby-chandelier-earrings.jpg?width=400",
        description:
          "Stunning ruby chandelier earrings perfect for special occasions",
      },
      {
        id: "pearl-stud-earrings",
        name: "Classic Pearl Stud Earrings",
        price: "₹4,990",
        originalPrice: "₹6,990",
        rating: 4.7,
        reviews: 32,
        image:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/pearl-stud-earrings.jpg?width=400",
        description: "Timeless pearl stud earrings for everyday elegance",
      },
      {
        id: "sapphire-hoop-earrings",
        name: "Sapphire Hoop Earrings",
        price: "₹12,990",
        rating: 4.6,
        reviews: 21,
        image:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/sapphire-hoop-earrings.jpg?width=400",
        description: "Blue sapphire hoop earrings with modern design",
      },
      {
        id: "diamond-cluster-earrings",
        name: "Diamond Cluster Earrings",
        price: "₹25,990",
        rating: 5.0,
        reviews: 12,
        image:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/diamond-cluster-earrings.jpg?width=400",
        description: "Brilliant diamond cluster earrings for ultimate luxury",
      },
      {
        id: "gold-geometric-earrings",
        name: "Gold Geometric Earrings",
        price: "₹7,990",
        rating: 4.5,
        reviews: 28,
        image:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/gold-geometric-earrings.jpg?width=400",
        description: "Contemporary gold geometric earrings with clean lines",
      },
    ],
  },
  rings: {
    id: "rings",
    name: "Rings",
    title: "RINGS COLLECTION",
    description:
      "Exquisite rings that tell your story, from engagement rings to everyday statement pieces.",
    bannerImage:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/rings-banner.jpg?width=1200",
    products: [
      {
        id: "emerald-solitaire-ring",
        name: "Emerald Solitaire Ring",
        price: "₹18,990",
        originalPrice: "₹22,990",
        rating: 4.9,
        reviews: 15,
        image:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/emerald-solitaire-ring.jpg?width=400",
        description: "Classic emerald solitaire ring in platinum setting",
      },
      {
        id: "ruby-vintage-ring",
        name: "Ruby Vintage Ring",
        price: "₹16,990",
        rating: 4.8,
        reviews: 19,
        image:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/ruby-vintage-ring.jpg?width=400",
        description: "Vintage-inspired ruby ring with intricate gold work",
      },
      {
        id: "sapphire-engagement-ring",
        name: "Sapphire Engagement Ring",
        price: "₹24,990",
        rating: 5.0,
        reviews: 8,
        image:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/sapphire-engagement-ring.jpg?width=400",
        description: "Stunning sapphire engagement ring with diamond accents",
      },
      {
        id: "pearl-cocktail-ring",
        name: "Pearl Cocktail Ring",
        price: "₹9,990",
        originalPrice: "₹12,990",
        rating: 4.6,
        reviews: 22,
        image:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/pearl-cocktail-ring.jpg?width=400",
        description: "Bold pearl cocktail ring perfect for evening wear",
      },
      {
        id: "diamond-eternity-ring",
        name: "Diamond Eternity Ring",
        price: "₹32,990",
        rating: 4.9,
        reviews: 11,
        image:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/diamond-eternity-ring.jpg?width=400",
        description: "Sparkling diamond eternity ring symbolizing endless love",
      },
      {
        id: "gold-signet-ring",
        name: "Gold Signet Ring",
        price: "₹8,990",
        rating: 4.4,
        reviews: 26,
        image:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/gold-signet-ring.jpg?width=400",
        description: "Classic gold signet ring with personalized engraving",
      },
    ],
  },
  lockets: {
    id: "lockets",
    name: "Lockets",
    title: "LOCKETS COLLECTION",
    description:
      "Meaningful lockets and pendants that keep your treasured memories close to your heart.",
    bannerImage:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/lockets-banner.jpg?width=1200",
    products: [
      {
        id: "emerald-heart-pendant",
        name: "Emerald Heart Pendant",
        price: "₹11,990",
        originalPrice: "₹14,990",
        rating: 4.7,
        reviews: 20,
        image:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/emerald-heart-pendant.jpg?width=400",
        description: "Romantic emerald heart pendant with delicate chain",
      },
      {
        id: "ruby-star-locket",
        name: "Ruby Star Locket",
        price: "₹9,990",
        rating: 4.8,
        reviews: 17,
        image:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/ruby-star-locket.jpg?width=400",
        description: "Star-shaped ruby locket that opens to hold photos",
      },
      {
        id: "sapphire-moon-pendant",
        name: "Sapphire Moon Pendant",
        price: "₹13,990",
        rating: 4.9,
        reviews: 14,
        image:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/sapphire-moon-pendant.jpg?width=400",
        description: "Celestial sapphire moon pendant with crescent design",
      },
      {
        id: "pearl-flower-locket",
        name: "Pearl Flower Locket",
        price: "₹7,990",
        originalPrice: "₹9,990",
        rating: 4.6,
        reviews: 23,
        image:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/pearl-flower-locket.jpg?width=400",
        description: "Delicate pearl flower locket with vintage charm",
      },
      {
        id: "diamond-cross-pendant",
        name: "Diamond Cross Pendant",
        price: "₹19,990",
        rating: 4.8,
        reviews: 12,
        image:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/diamond-cross-pendant.jpg?width=400",
        description:
          "Elegant diamond cross pendant with spiritual significance",
      },
      {
        id: "gold-infinity-pendant",
        name: "Gold Infinity Pendant",
        price: "₹6,990",
        rating: 4.5,
        reviews: 29,
        image:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/gold-infinity-pendant.jpg?width=400",
        description:
          "Minimalist gold infinity pendant representing eternal love",
      },
    ],
  },
};

export default function JewelleryDetail() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [sortBy, setSortBy] = useState("featured");
  const [isGoAstroOpen, setIsGoAstroOpen] = useState(false);

  const category = categoryId ? jewelleryCategories[categoryId] : null;

  useEffect(() => {
    if (!category) {
      // Handle invalid category
    }
  }, [category]);

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header onGoAstroClick={() => setIsGoAstroOpen(true)} />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
          <p className="text-gray-600 mb-8">
            The jewelry category you're looking for doesn't exist.
          </p>
          <Link
            to="/"
            className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition duration-300"
          >
            Back to Home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const openGoAstro = () => setIsGoAstroOpen(true);
  const closeGoAstro = () => setIsGoAstroOpen(false);

  return (
    <div className="min-h-screen bg-white">
      <Header onGoAstroClick={openGoAstro} />

      {/* Category Banner */}
      <div
        className="relative h-60 md:h-96 flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${category.bannerImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {category.title}
          </h1>
          <p className="text-white text-lg md:text-xl max-w-2xl mx-auto">
            {category.description}
          </p>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="bg-gray-100 py-2 px-4">
        <div className="container mx-auto">
          <nav className="flex">
            <Link to="/" className="text-gray-600 hover:text-black">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-600">Jewellery</span>
            <span className="mx-2">/</span>
            <span className="text-gray-800">{category.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Sort and View Options */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm text-gray-600">
            Showing {category.products.length} products
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="featured">Featured</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="newest">Newest</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {category.products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.secondaryImage && (
                  <img
                    src={product.secondaryImage}
                    alt={product.name}
                    className="absolute inset-0 w-full h-80 object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                )}
                {product.originalPrice && (
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                    Sale
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 hover:text-gray-600">
                  {product.name}
                </h3>
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={
                          i < Math.floor(product.rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-gray-600 ml-2">
                    ({product.reviews} Reviews)
                  </span>
                </div>
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-lg font-bold text-gray-900">
                    {product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      {product.originalPrice}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
      <GoAstroDrawer isOpen={isGoAstroOpen} onClose={closeGoAstro} />
    </div>
  );
}

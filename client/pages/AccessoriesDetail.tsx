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

interface AccessoryCategory {
  id: string;
  name: string;
  title: string;
  description: string;
  bannerImage: string;
  products: Product[];
}

const accessoryCategories: { [key: string]: AccessoryCategory } = {
  cufflinks: {
    id: "cufflinks",
    name: "Cufflinks",
    title: "CUFFLINKS COLLECTION",
    description:
      "Sophisticated cufflinks that add elegance and refinement to formal attire.",
    bannerImage:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/cufflinks-banner.jpg?width=1200",
    products: [
      {
        id: "emerald-square-cufflinks",
        name: "Emerald Square Cufflinks",
        price: "₹12,990",
        originalPrice: "₹15,990",
        rating: 4.8,
        reviews: 14,
        image:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/emerald-square-cufflinks.jpg?width=400",
        description: "Classic emerald square cufflinks in gold setting",
      },
      {
        id: "ruby-round-cufflinks",
        name: "Ruby Round Cufflinks",
        price: "₹10,990",
        rating: 4.7,
        reviews: 18,
        image:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/ruby-round-cufflinks.jpg?width=400",
        description: "Elegant ruby round cufflinks for special occasions",
      },
      {
        id: "sapphire-oval-cufflinks",
        name: "Sapphire Oval Cufflinks",
        price: "₹14,990",
        rating: 4.9,
        reviews: 12,
        image:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/sapphire-oval-cufflinks.jpg?width=400",
        description: "Blue sapphire oval cufflinks with contemporary design",
      },
      {
        id: "gold-geometric-cufflinks",
        name: "Gold Geometric Cufflinks",
        price: "₹8,990",
        originalPrice: "₹11,990",
        rating: 4.5,
        reviews: 22,
        image:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/gold-geometric-cufflinks.jpg?width=400",
        description: "Modern geometric gold cufflinks with clean lines",
      },
    ],
  },
  bracelets: {
    id: "bracelets",
    name: "Bracelets",
    title: "BRACELETS COLLECTION",
    description:
      "Stunning bracelets that adorn your wrist with grace and sophistication.",
    bannerImage:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/bracelets-banner.jpg?width=1200",
    products: [
      {
        id: "emerald-tennis-bracelet",
        name: "Emerald Tennis Bracelet",
        price: "₹25,990",
        rating: 4.9,
        reviews: 16,
        image:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/emerald-tennis-bracelet.jpg?width=400",
        description: "Luxurious emerald tennis bracelet with premium stones",
      },
      {
        id: "ruby-charm-bracelet",
        name: "Ruby Charm Bracelet",
        price: "₹18,990",
        originalPrice: "₹22,990",
        rating: 4.7,
        reviews: 21,
        image:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/ruby-charm-bracelet.jpg?width=400",
        description: "Delicate ruby charm bracelet with meaningful symbols",
      },
      {
        id: "sapphire-bangle-set",
        name: "Sapphire Bangle Set",
        price: "₹32,990",
        rating: 4.8,
        reviews: 13,
        image:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/sapphire-bangle-set.jpg?width=400",
        description: "Set of three sapphire bangles in varying sizes",
      },
      {
        id: "pearl-strand-bracelet",
        name: "Pearl Strand Bracelet",
        price: "₹12,990",
        rating: 4.6,
        reviews: 28,
        image:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/pearl-strand-bracelet.jpg?width=400",
        description: "Classic pearl strand bracelet for timeless elegance",
      },
    ],
  },
  brooches: {
    id: "brooches",
    name: "Brooches",
    title: "BROOCHES COLLECTION",
    description:
      "Exquisite brooches that make a statement and showcase your personal style.",
    bannerImage:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/brooches-banner.jpg?width=1200",
    products: [
      {
        id: "emerald-flower-brooch",
        name: "Emerald Flower Brooch",
        price: "₹15,990",
        originalPrice: "₹18,990",
        rating: 4.8,
        reviews: 15,
        image:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/emerald-flower-brooch.jpg?width=400",
        description: "Beautiful emerald flower brooch with intricate petals",
      },
      {
        id: "ruby-butterfly-brooch",
        name: "Ruby Butterfly Brooch",
        price: "₹13,990",
        rating: 4.7,
        reviews: 19,
        image:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/ruby-butterfly-brooch.jpg?width=400",
        description: "Stunning ruby butterfly brooch with wing details",
      },
      {
        id: "sapphire-vintage-brooch",
        name: "Sapphire Vintage Brooch",
        price: "₹19,990",
        rating: 4.9,
        reviews: 11,
        image:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/sapphire-vintage-brooch.jpg?width=400",
        description: "Vintage-inspired sapphire brooch with art deco design",
      },
      {
        id: "pearl-feather-brooch",
        name: "Pearl Feather Brooch",
        price: "₹9,990",
        rating: 4.5,
        reviews: 24,
        image:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/pearl-feather-brooch.jpg?width=400",
        description: "Delicate pearl feather brooch with natural elegance",
      },
    ],
  },
  "tie-pins": {
    id: "tie-pins",
    name: "Tie Pins",
    title: "TIE PINS COLLECTION",
    description:
      "Refined tie pins that add sophistication and character to your formal wear.",
    bannerImage:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/tie-pins-banner.jpg?width=1200",
    products: [
      {
        id: "emerald-classic-tie-pin",
        name: "Emerald Classic Tie Pin",
        price: "₹6,990",
        originalPrice: "₹8,990",
        rating: 4.6,
        reviews: 17,
        image:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/emerald-classic-tie-pin.jpg?width=400",
        description: "Classic emerald tie pin with timeless appeal",
      },
      {
        id: "ruby-vintage-tie-pin",
        name: "Ruby Vintage Tie Pin",
        price: "₹8,990",
        rating: 4.7,
        reviews: 14,
        image:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/ruby-vintage-tie-pin.jpg?width=400",
        description: "Vintage ruby tie pin with ornate detailing",
      },
      {
        id: "sapphire-modern-tie-pin",
        name: "Sapphire Modern Tie Pin",
        price: "₹7,990",
        rating: 4.8,
        reviews: 12,
        image:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/sapphire-modern-tie-pin.jpg?width=400",
        description: "Modern sapphire tie pin with sleek design",
      },
      {
        id: "gold-minimalist-tie-pin",
        name: "Gold Minimalist Tie Pin",
        price: "₹4,990",
        rating: 4.4,
        reviews: 26,
        image:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/gold-minimalist-tie-pin.jpg?width=400",
        description: "Minimalist gold tie pin for contemporary style",
      },
    ],
  },
  "belt-buckles": {
    id: "belt-buckles",
    name: "Belt Buckles",
    title: "BELT BUCKLES COLLECTION",
    description:
      "Distinctive belt buckles that serve as the perfect finishing touch to your ensemble.",
    bannerImage:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/belt-buckles-banner.jpg?width=1200",
    products: [
      {
        id: "emerald-square-buckle",
        name: "Emerald Square Belt Buckle",
        price: "₹11,990",
        rating: 4.7,
        reviews: 13,
        image:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/emerald-square-buckle.jpg?width=400",
        description: "Bold emerald square belt buckle with gold frame",
      },
      {
        id: "ruby-oval-buckle",
        name: "Ruby Oval Belt Buckle",
        price: "₹13,990",
        originalPrice: "₹16,990",
        rating: 4.8,
        reviews: 16,
        image:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/ruby-oval-buckle.jpg?width=400",
        description: "Elegant ruby oval belt buckle for formal occasions",
      },
      {
        id: "sapphire-rectangular-buckle",
        name: "Sapphire Rectangular Buckle",
        price: "₹15,990",
        rating: 4.9,
        reviews: 10,
        image:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/sapphire-rectangular-buckle.jpg?width=400",
        description: "Rectangular sapphire belt buckle with modern appeal",
      },
      {
        id: "gold-engraved-buckle",
        name: "Gold Engraved Belt Buckle",
        price: "₹9,990",
        rating: 4.5,
        reviews: 21,
        image:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/gold-engraved-buckle.jpg?width=400",
        description: "Gold belt buckle with custom engraving options",
      },
    ],
  },
};

export default function AccessoriesDetail() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [sortBy, setSortBy] = useState("featured");
  const [isGoAstroOpen, setIsGoAstroOpen] = useState(false);

  const category = categoryId ? accessoryCategories[categoryId] : null;

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
            The accessory category you're looking for doesn't exist.
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
            <span className="text-gray-600">Accessories</span>
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

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GoAstroDrawer from '../components/GoAstroDrawer';

interface Product {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  rating: number;
  reviews: number;
  image: string;
  secondaryImage?: string;
  category: 'earrings' | 'rings' | 'pendants';
}

interface Collection {
  id: string;
  name: string;
  title: string;
  description: string;
  bannerImage: string;
  products: Product[];
}

const collections: { [key: string]: Collection } = {
  emerald: {
    id: 'emerald',
    name: 'Emerald',
    title: 'EMERALD COLLECTION',
    description: 'Royal elegance meets contemporary design with precious emeralds that symbolize rebirth and love.',
    bannerImage: 'https://cdn.builder.io/o/assets%2F47ddcd4c543e4e54b99a663aa4332592%2F80b42e1f0d1840409e95c5835e5a5b60?alt=media&token=a5ff7dd7-6faf-4827-baee-0c304b32b2b2&apiKey=47ddcd4c543e4e54b99a663aa4332592',
    products: [
      {
        id: 'emerald-earrings-1',
        name: 'Royal Emerald Drop Earrings',
        price: '₹8,990',
        originalPrice: '₹12,990',
        rating: 4.5,
        reviews: 15,
        image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/emerald-earrings-1.jpg?width=400',
        secondaryImage: 'https://cdn.builder.io/api/v1/image/assets/TEMP/emerald-earrings-1-alt.jpg?width=400',
        category: 'earrings'
      },
      {
        id: 'emerald-earrings-2',
        name: 'Emerald Stud Earrings',
        price: '₹6,490',
        rating: 4.8,
        reviews: 23,
        image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/emerald-earrings-2.jpg?width=400',
        category: 'earrings'
      },
      {
        id: 'emerald-ring-1',
        name: 'Emerald Solitaire Ring',
        price: '₹15,990',
        originalPrice: '₹18,990',
        rating: 4.9,
        reviews: 8,
        image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/emerald-ring-1.jpg?width=400',
        category: 'rings'
      },
      {
        id: 'emerald-ring-2',
        name: 'Emerald Cluster Ring',
        price: '₹12,490',
        rating: 4.6,
        reviews: 12,
        image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/emerald-ring-2.jpg?width=400',
        category: 'rings'
      },
      {
        id: 'emerald-pendant-1',
        name: 'Emerald Heart Pendant',
        price: '₹9,990',
        rating: 4.7,
        reviews: 18,
        image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/emerald-pendant-1.jpg?width=400',
        category: 'pendants'
      },
      {
        id: 'emerald-pendant-2',
        name: 'Emerald Teardrop Pendant',
        price: '₹7,990',
        originalPrice: '₹9,990',
        rating: 4.4,
        reviews: 9,
        image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/emerald-pendant-2.jpg?width=400',
        category: 'pendants'
      }
    ]
  },
  ruby: {
    id: 'ruby',
    name: 'Ruby',
    title: 'RUBY COLLECTION',
    description: 'Passionate and bold designs featuring magnificent rubies that embody love, courage, and vitality.',
    bannerImage: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ruby-banner.jpg?width=1200',
    products: [
      {
        id: 'ruby-earrings-1',
        name: 'Ruby Chandelier Earrings',
        price: '₹11,990',
        originalPrice: '₹15,990',
        rating: 4.8,
        reviews: 21,
        image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ruby-earrings-1.jpg?width=400',
        category: 'earrings'
      },
      {
        id: 'ruby-earrings-2',
        name: 'Ruby Hoop Earrings',
        price: '₹8,490',
        rating: 4.6,
        reviews: 14,
        image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ruby-earrings-2.jpg?width=400',
        category: 'earrings'
      },
      {
        id: 'ruby-ring-1',
        name: 'Ruby Engagement Ring',
        price: '₹18,990',
        rating: 4.9,
        reviews: 6,
        image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ruby-ring-1.jpg?width=400',
        category: 'rings'
      },
      {
        id: 'ruby-ring-2',
        name: 'Ruby Vintage Ring',
        price: '₹13,990',
        originalPrice: '₹16,990',
        rating: 4.7,
        reviews: 11,
        image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ruby-ring-2.jpg?width=400',
        category: 'rings'
      },
      {
        id: 'ruby-pendant-1',
        name: 'Ruby Cross Pendant',
        price: '₹10,990',
        rating: 4.5,
        reviews: 16,
        image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ruby-pendant-1.jpg?width=400',
        category: 'pendants'
      },
      {
        id: 'ruby-pendant-2',
        name: 'Ruby Star Pendant',
        price: '₹8,990',
        rating: 4.6,
        reviews: 13,
        image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ruby-pendant-2.jpg?width=400',
        category: 'pendants'
      }
    ]
  },
  sapphire: {
    id: 'sapphire',
    name: 'Sapphire',
    title: 'SAPPHIRE COLLECTION',
    description: 'Timeless beauty with the wisdom of sapphires, representing loyalty, nobility, and divine favor.',
    bannerImage: 'https://cdn.builder.io/api/v1/image/assets/TEMP/sapphire-banner.jpg?width=1200',
    products: [
      {
        id: 'sapphire-earrings-1',
        name: 'Blue Sapphire Drop Earrings',
        price: '₹14,990',
        rating: 4.9,
        reviews: 19,
        image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/sapphire-earrings-1.jpg?width=400',
        category: 'earrings'
      },
      {
        id: 'sapphire-earrings-2',
        name: 'Sapphire Stud Earrings',
        price: '₹9,490',
        originalPrice: '₹11,990',
        rating: 4.7,
        reviews: 25,
        image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/sapphire-earrings-2.jpg?width=400',
        category: 'earrings'
      },
      {
        id: 'sapphire-ring-1',
        name: 'Sapphire Princess Ring',
        price: '₹22,990',
        rating: 4.8,
        reviews: 7,
        image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/sapphire-ring-1.jpg?width=400',
        category: 'rings'
      },
      {
        id: 'sapphire-ring-2',
        name: 'Sapphire Halo Ring',
        price: '₹16,990',
        originalPrice: '₹19,990',
        rating: 4.6,
        reviews: 14,
        image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/sapphire-ring-2.jpg?width=400',
        category: 'rings'
      },
      {
        id: 'sapphire-pendant-1',
        name: 'Sapphire Moon Pendant',
        price: '₹12,990',
        rating: 4.8,
        reviews: 22,
        image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/sapphire-pendant-1.jpg?width=400',
        category: 'pendants'
      },
      {
        id: 'sapphire-pendant-2',
        name: 'Sapphire Flower Pendant',
        price: '₹9,990',
        rating: 4.5,
        reviews: 17,
        image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/sapphire-pendant-2.jpg?width=400',
        category: 'pendants'
      }
    ]
  },
  pearl: {
    id: 'pearl',
    name: 'Pearl',
    title: 'PEARL COLLECTION',
    description: 'Classic elegance with lustrous pearls from the depths, symbolizing purity and wisdom.',
    bannerImage: 'https://cdn.builder.io/api/v1/image/assets/TEMP/pearl-banner.jpg?width=1200',
    products: [
      {
        id: 'pearl-earrings-1',
        name: 'Pearl Drop Earrings',
        price: '₹5,990',
        originalPrice: '₹7,990',
        rating: 4.7,
        reviews: 28,
        image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/pearl-earrings-1.jpg?width=400',
        category: 'earrings'
      },
      {
        id: 'pearl-earrings-2',
        name: 'Pearl Stud Earrings',
        price: '₹3,990',
        rating: 4.8,
        reviews: 35,
        image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/pearl-earrings-2.jpg?width=400',
        category: 'earrings'
      },
      {
        id: 'pearl-ring-1',
        name: 'Pearl Cocktail Ring',
        price: '₹8,990',
        rating: 4.6,
        reviews: 12,
        image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/pearl-ring-1.jpg?width=400',
        category: 'rings'
      },
      {
        id: 'pearl-ring-2',
        name: 'Pearl Statement Ring',
        price: '₹6,990',
        originalPrice: '₹8,990',
        rating: 4.5,
        reviews: 18,
        image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/pearl-ring-2.jpg?width=400',
        category: 'rings'
      },
      {
        id: 'pearl-pendant-1',
        name: 'Pearl Necklace Pendant',
        price: '₹7,990',
        rating: 4.9,
        reviews: 24,
        image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/pearl-pendant-1.jpg?width=400',
        category: 'pendants'
      },
      {
        id: 'pearl-pendant-2',
        name: 'Pearl Baroque Pendant',
        price: '₹5,990',
        rating: 4.4,
        reviews: 16,
        image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/pearl-pendant-2.jpg?width=400',
        category: 'pendants'
      }
    ]
  },
  yellow: {
    id: 'yellow',
    name: 'Yellow Sapphire',
    title: 'YELLOW SAPPHIRE COLLECTION',
    description: 'Radiant yellow sapphires that bring prosperity, wisdom, and positive energy to your life.',
    bannerImage: 'https://cdn.builder.io/api/v1/image/assets/TEMP/yellow-sapphire-banner.jpg?width=1200',
    products: [
      {
        id: 'yellow-earrings-1',
        name: 'Yellow Sapphire Hoops',
        price: '₹13,990',
        rating: 4.8,
        reviews: 17,
        image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/yellow-earrings-1.jpg?width=400',
        category: 'earrings'
      },
      {
        id: 'yellow-earrings-2',
        name: 'Yellow Sapphire Studs',
        price: '₹9,990',
        originalPrice: '₹12,990',
        rating: 4.6,
        reviews: 21,
        image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/yellow-earrings-2.jpg?width=400',
        category: 'earrings'
      },
      {
        id: 'yellow-ring-1',
        name: 'Yellow Sapphire Cocktail Ring',
        price: '₹19,990',
        rating: 4.9,
        reviews: 9,
        image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/yellow-ring-1.jpg?width=400',
        category: 'rings'
      },
      {
        id: 'yellow-ring-2',
        name: 'Yellow Sapphire Band',
        price: '₹14,990',
        rating: 4.7,
        reviews: 13,
        image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/yellow-ring-2.jpg?width=400',
        category: 'rings'
      },
      {
        id: 'yellow-pendant-1',
        name: 'Yellow Sapphire Sun Pendant',
        price: '₹11,990',
        rating: 4.8,
        reviews: 19,
        image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/yellow-pendant-1.jpg?width=400',
        category: 'pendants'
      },
      {
        id: 'yellow-pendant-2',
        name: 'Yellow Sapphire Drop Pendant',
        price: '₹8,990',
        originalPrice: '₹10,990',
        rating: 4.5,
        reviews: 14,
        image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/yellow-pendant-2.jpg?width=400',
        category: 'pendants'
      }
    ]
  },
  'blue-sapphire': {
    id: 'blue-sapphire',
    name: 'Blue Sapphire',
    title: 'BLUE SAPPHIRE COLLECTION',
    description: 'Deep blue sapphires that embody loyalty, nobility, and divine favor with timeless elegance.',
    bannerImage: 'https://cdn.builder.io/api/v1/image/assets/TEMP/blue-sapphire-banner.jpg?width=1200',
    products: [
      {
        id: 'blue-sapphire-earrings-1',
        name: 'Blue Sapphire Chandelier Earrings',
        price: '₹16,990',
        rating: 4.9,
        reviews: 14,
        image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/blue-sapphire-earrings-1.jpg?width=400',
        category: 'earrings'
      },
      {
        id: 'blue-sapphire-earrings-2',
        name: 'Blue Sapphire Drop Earrings',
        price: '₹12,990',
        originalPrice: '₹15,990',
        rating: 4.7,
        reviews: 20,
        image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/blue-sapphire-earrings-2.jpg?width=400',
        category: 'earrings'
      },
      {
        id: 'blue-sapphire-ring-1',
        name: 'Blue Sapphire Royal Ring',
        price: '₹24,990',
        rating: 5.0,
        reviews: 5,
        image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/blue-sapphire-ring-1.jpg?width=400',
        category: 'rings'
      },
      {
        id: 'blue-sapphire-ring-2',
        name: 'Blue Sapphire Vintage Ring',
        price: '₹18,990',
        rating: 4.8,
        reviews: 11,
        image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/blue-sapphire-ring-2.jpg?width=400',
        category: 'rings'
      },
      {
        id: 'blue-sapphire-pendant-1',
        name: 'Blue Sapphire Star Pendant',
        price: '₹13,990',
        rating: 4.6,
        reviews: 18,
        image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/blue-sapphire-pendant-1.jpg?width=400',
        category: 'pendants'
      },
      {
        id: 'blue-sapphire-pendant-2',
        name: 'Blue Sapphire Ocean Pendant',
        price: '₹10,990',
        originalPrice: '₹12,990',
        rating: 4.4,
        reviews: 15,
        image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/blue-sapphire-pendant-2.jpg?width=400',
        category: 'pendants'
      }
    ]
  }
};

export default function CollectionDetail() {
  const { collectionId } = useParams<{ collectionId: string }>();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'earrings' | 'rings' | 'pendants'>('all');
  const [sortBy, setSortBy] = useState('featured');
  const [isGoAstroOpen, setIsGoAstroOpen] = useState(false);

  const collection = collectionId ? collections[collectionId] : null;

  useEffect(() => {
    if (!collection) {
      // Handle invalid collection
    }
  }, [collection]);

  if (!collection) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header onGoAstroClick={() => setIsGoAstroOpen(true)} />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Collection Not Found</h1>
          <p className="text-gray-600 mb-8">The collection you're looking for doesn't exist.</p>
          <Link to="/collections" className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition duration-300">
            Back to Collections
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const filteredProducts = selectedCategory === 'all' 
    ? collection.products 
    : collection.products.filter(product => product.category === selectedCategory);

  const getProductCount = (category: 'earrings' | 'rings' | 'pendants') => {
    return collection.products.filter(product => product.category === category).length;
  };

  const openGoAstro = () => setIsGoAstroOpen(true);
  const closeGoAstro = () => setIsGoAstroOpen(false);

  return (
    <div className="min-h-screen bg-white">
      <Header onGoAstroClick={openGoAstro} />
      
      {/* Collection Banner */}
      <div 
        className="relative h-60 md:h-96 flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${collection.bannerImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {collection.title}
          </h1>
          <p className="text-white text-lg md:text-xl max-w-2xl mx-auto">
            {collection.description}
          </p>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="bg-gray-100 py-2 px-4">
        <div className="container mx-auto">
          <nav className="flex">
            <Link to="/" className="text-gray-600 hover:text-black">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/collections" className="text-gray-600 hover:text-black">Collections</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800">{collection.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white p-6 shadow-md rounded-lg">
              <h3 className="font-bold text-lg mb-6">Categories</h3>
              <div className="space-y-3">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left py-2 px-3 rounded ${
                    selectedCategory === 'all' 
                      ? 'bg-black text-white' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  All Products ({collection.products.length})
                </button>
                <button
                  onClick={() => setSelectedCategory('earrings')}
                  className={`w-full text-left py-2 px-3 rounded ${
                    selectedCategory === 'earrings' 
                      ? 'bg-black text-white' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  Earrings ({getProductCount('earrings')})
                </button>
                <button
                  onClick={() => setSelectedCategory('rings')}
                  className={`w-full text-left py-2 px-3 rounded ${
                    selectedCategory === 'rings' 
                      ? 'bg-black text-white' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  Rings ({getProductCount('rings')})
                </button>
                <button
                  onClick={() => setSelectedCategory('pendants')}
                  className={`w-full text-left py-2 px-3 rounded ${
                    selectedCategory === 'pendants' 
                      ? 'bg-black text-white' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  Pendants ({getProductCount('pendants')})
                </button>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="w-full lg:w-3/4">
            {/* Sort and View Options */}
            <div className="flex justify-between items-center mb-6">
              <div className="text-sm text-gray-600">
                Showing {filteredProducts.length} products
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group">
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
                          <span key={i} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-xs text-gray-600 ml-2">({product.reviews} Reviews)</span>
                    </div>
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-lg font-bold text-gray-900">{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 uppercase mb-3">
                      {product.category}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No products found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
      <GoAstroDrawer isOpen={isGoAstroOpen} onClose={closeGoAstro} />
    </div>
  );
}

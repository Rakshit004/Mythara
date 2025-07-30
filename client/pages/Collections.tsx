import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GoAstroDrawer from '../components/GoAstroDrawer';

interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  href: string;
}

const collections: Collection[] = [
  {
    id: '1',
    name: 'ASTRO: Journey to the Astrological Realm',
    description: 'Celestial designs inspired by cosmic energies and astrological wisdom',
    image: 'https://cdn.builder.io/o/assets%2F47ddcd4c543e4e54b99a663aa4332592%2F383abc00c01a4a66818a6d3d7e884f43?alt=media&token=ec909a40-5912-4d43-a727-bb8dfceb92c9&apiKey=47ddcd4c543e4e54b99a663aa4332592',
    href: '/collections/astro'
  },
  {
    id: '2',
    name: 'Emerald Collection',
    description: 'Royal elegance meets contemporary design with precious emeralds',
    image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/emerald-collection.jpg?width=400',
    href: '/collections/emerald'
  },
  {
    id: '3',
    name: 'Ruby Collection',
    description: 'Passionate and bold designs featuring magnificent rubies',
    image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ruby-collection.jpg?width=400',
    href: '/collections/ruby'
  },
  {
    id: '4',
    name: 'Sapphire Collection',
    description: 'Timeless beauty with the wisdom of sapphires',
    image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/sapphire-collection.jpg?width=400',
    href: '/collections/sapphire'
  },
  {
    id: '5',
    name: 'Pearl Collection',
    description: 'Classic elegance with lustrous pearls from the depths',
    image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/pearl-collection.jpg?width=400',
    href: '/collections/pearl'
  },
  {
    id: '6',
    name: 'Celestial Dreams',
    description: 'Mystical designs inspired by stars and cosmic phenomena',
    image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/celestial-collection.jpg?width=400',
    href: '/collections/celestial'
  }
];

export default function Collections() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Subscribe:', email);
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gray-100 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Collections</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            All collections from MYTHARA - Discover our curated selection of premium jewelry collections
          </p>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center bg-gray-50 rounded-lg overflow-hidden shadow-md">
            <div className="md:w-1/2">
              <img 
                src="https://cdn.builder.io/o/assets%2F47ddcd4c543e4e54b99a663aa4332592%2F383abc00c01a4a66818a6d3d7e884f43?alt=media&token=ec909a40-5912-4d43-a727-bb8dfceb92c9&apiKey=47ddcd4c543e4e54b99a663aa4332592"
                alt="ASTRO Collection" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore ASTRO Collection</h2>
              <p className="text-gray-600 mb-6">
                Journey into the astrological realm with our premium collection of celestial-inspired jewelry 
                that captures the essence of cosmic energy and stellar beauty.
              </p>
              <a 
                href="/collections/astro" 
                className="inline-block bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition duration-300"
              >
                Shop Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* All Collections Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">All Collections</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.map((collection) => (
              <div 
                key={collection.id} 
                className="collection-card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:transform hover:-translate-y-1"
              >
                <a href={collection.href}>
                  <img 
                    src={collection.image} 
                    alt={collection.name} 
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{collection.name}</h3>
                    <p className="text-gray-600">{collection.description}</p>
                  </div>
                </a>
              </div>
            ))}
          </div>
          
          {/* View More Button */}
          <div className="text-center mt-12">
            <button className="bg-white border border-black text-black px-6 py-3 rounded-md hover:bg-black hover:text-white transition duration-300">
              View More Collections
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Tribe</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Get access to special offers, new collection launches, and exclusive jewelry insights.
          </p>
          
          <div className="max-w-md mx-auto flex">
            <input 
              type="email" 
              placeholder="Your email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow px-4 py-3 rounded-l-md text-black focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <button 
              onClick={handleSubscribe}
              className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-r-md transition duration-300"
            >
              Subscribe
            </button>
          </div>
          
          <div className="mt-6 flex justify-center space-x-4">
            <a href="#" className="text-white hover:text-gray-400 transition duration-300">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="#" className="text-white hover:text-gray-400 transition duration-300">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
            <a href="#" className="text-white hover:text-gray-400 transition duration-300">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

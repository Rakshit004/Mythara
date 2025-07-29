import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Subscribe:', email);
    setEmail('');
  };

  return (
    <>
      {/* About Section */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-center">Feel the Luxury of Premium Streetwear with BLUORNG</h2>
          <p className="text-gray-700 mb-6">
            Streetwear is now widely accepted as a popular style that comes from the underground culture, and India is no exception. The once-popular apparel of loose-fitting jeans, graphic t-shirts, and high-top sneakers has evolved into a statement of freedom, luxury, and creativity.
          </p>
          <p className="text-gray-700 mb-6">
            Embodying the essence of premium jewellery, MYTHARA is a rising luxury jewellery brand in India. With the rise of jewellery culture in India, the sense of elegance and fashion comes hand in hand. Heavily influenced by celestial themes, our jewellery focuses on high-quality precious metals and gemstones with exquisite craftsmanship. Shaping the future of Indian jewellery with a unique blend of tradition and contemporary designs.
          </p>
          <div className="text-center">
            <a href="#" className="inline-block bg-black text-white px-6 py-3 font-bold hover:bg-gray-800 transition duration-300">READ MORE</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Column 1 */}
            <div>
              <h3 className="text-xl font-bold mb-4">HELP</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-gray-400">Members Login</a></li>
                <li><a href="#" className="hover:text-gray-400">Place an Exchange/Return Request</a></li>
                <li><a href="#" className="hover:text-gray-400">Exchange/Returns Policy</a></li>
                <li><a href="#" className="hover:text-gray-400">FAQ</a></li>
                <li><a href="#" className="hover:text-gray-400">Terms</a></li>
                <li><a href="#" className="hover:text-gray-400">Shipping</a></li>
              </ul>
            </div>
            
            {/* Column 2 */}
            <div>
              <h3 className="text-xl font-bold mb-4">COMPANY</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-gray-400">Story</a></li>
                <li><a href="#" className="hover:text-gray-400">Our Stores</a></li>
                <li><a href="#" className="hover:text-gray-400">Careers</a></li>
                <li><a href="#" className="hover:text-gray-400">Contact Us</a></li>
                <li><a href="#" className="hover:text-gray-400">Collaborations</a></li>
                <li><a href="#" className="hover:text-gray-400">Blogs</a></li>
              </ul>
            </div>
            
            {/* Column 3 */}
            <div>
              <h3 className="text-xl font-bold mb-4">CONNECT</h3>
              <div className="flex space-x-4 mb-6">
                <a href="#" className="hover:text-gray-400">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" className="hover:text-gray-400">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a href="#" className="hover:text-gray-400">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
              <h3 className="text-xl font-bold mb-4">NEWSLETTER</h3>
              <p className="mb-4">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
              <form onSubmit={handleSubscribe} className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 py-2 w-full text-black"
                  required
                />
                <button type="submit" className="bg-white text-black px-4 py-2">Subscribe</button>
              </form>
            </div>
            
            {/* Column 4 */}
            <div>
              <h3 className="text-xl font-bold mb-4">PAYMENT METHODS</h3>
              <div className="grid grid-cols-3 gap-2 mb-6">
                <div className="bg-white p-2 flex items-center justify-center">
                  <svg className="w-8 h-5" viewBox="0 0 40 24" fill="none">
                    <rect width="40" height="24" rx="4" fill="#1434CB"/>
                    <path d="M16.6 12.6L14.2 8.4H11.8L15.4 15.6H17.8L21.4 8.4H19L16.6 12.6Z" fill="white"/>
                    <path d="M24.8 12.6L27.2 8.4H29.6L26 15.6H23.6L20 8.4H22.4L24.8 12.6Z" fill="white"/>
                  </svg>
                </div>
                <div className="bg-white p-2 flex items-center justify-center">
                  <svg className="w-8 h-5" viewBox="0 0 40 24" fill="none">
                    <rect width="40" height="24" rx="4" fill="#EB001B"/>
                    <rect x="15" width="10" height="24" fill="#FF5F00"/>
                    <circle cx="15" cy="12" r="10" fill="#EB001B"/>
                    <circle cx="25" cy="12" r="10" fill="#F79E1B"/>
                  </svg>
                </div>
                <div className="bg-white p-2 flex items-center justify-center">
                  <svg className="w-8 h-5" viewBox="0 0 40 24" fill="none">
                    <rect width="40" height="24" rx="4" fill="#0070BA"/>
                    <path d="M8 8h6v2H8V8zm0 3h6v2H8v-2zm0 3h4v2H8v-2z" fill="white"/>
                    <path d="M20 8h12v8H20V8z" fill="#253B80"/>
                    <path d="M22 10h8v4h-8v-4z" fill="white"/>
                  </svg>
                </div>
                <div className="bg-white p-2 flex items-center justify-center">
                  <svg className="w-8 h-5" viewBox="0 0 40 24" fill="none">
                    <rect width="40" height="24" rx="4" fill="#006FCF"/>
                    <path d="M8 8h6v2H8V8zm0 3h6v2H8v-2zm0 3h4v2H8v-2z" fill="white"/>
                    <path d="M20 8h12v8H20V8z" fill="white"/>
                  </svg>
                </div>
                <div className="bg-white p-2 flex items-center justify-center">
                  <svg className="w-8 h-5" viewBox="0 0 40 24" fill="none">
                    <rect width="40" height="24" rx="4" fill="#4285F4"/>
                    <path d="M20 12c0-1.1.9-2 2-2h6v-2h-8c-2.2 0-4 1.8-4 4s1.8 4 4 4h8v-2h-6c-1.1 0-2-.9-2-2z" fill="white"/>
                  </svg>
                </div>
                <div className="bg-white p-2 flex items-center justify-center">
                  <svg className="w-8 h-5" viewBox="0 0 40 24" fill="none">
                    <rect width="40" height="24" rx="4" fill="black"/>
                    <path d="M12 8h16v2H12V8zm0 3h16v2H12v-2zm0 3h12v2H12v-2z" fill="white"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p>© 2025 MYTHARA JEWELLERY PRIVATE LIMITED, ALL RIGHTS RESERVED.</p>
              </div>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-gray-400">Privacy Policy</a>
                <a href="#" className="hover:text-gray-400">Terms of Service</a>
                <a href="#" className="hover:text-gray-400">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

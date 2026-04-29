import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, X, ShoppingBag, Heart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

interface HeaderProps {
  onGoAstroClick?: () => void;
}

export default function Header({ onGoAstroClick: _unused }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { count, openCart } = useCart();
  const { count: wishlistCount, openWishlist } = useWishlist();

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = "auto";
  };

  const toggleMobileMenu = () => {
    const next = !isMobileMenuOpen;
    setIsMobileMenuOpen(next);
    document.body.style.overflow = next ? "hidden" : "auto";
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-zinc-900 text-white text-xs py-2 px-4 flex justify-between items-center border-b border-zinc-800">
        <div className="flex space-x-4">
          <span className="text-gray-400 tracking-wider">Free Shipping on Orders Over ₹5000</span>
          <span className="text-gray-400 tracking-wider hidden sm:block">New Drop — Shop Now</span>
        </div>
        <div className="hidden md:flex space-x-4 tracking-wider">
          <a href="#" className="text-gray-400 hover:text-white transition-colors">Log In</a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">Store Locator</a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">Customer Support</a>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-black border-b border-zinc-800">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">

          {/* Mobile Menu Button */}
          <button onClick={toggleMobileMenu} className="md:hidden focus:outline-none text-white">
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/logo2.jpeg"
              alt="MYTARA & CO"
              className="h-28 w-28 object-cover rounded-sm"
              style={{ objectPosition: "center 55%" }}
            />
            <span className="text-white font-bold tracking-[0.15em] text-sm hidden sm:block -ml-3">
              MYTARA & CO
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 mx-auto">

            {/* Collections Dropdown */}
            <div className="dropdown relative">
              <a href="#" className="nav-link text-white hover:text-gray-300">COLLECTIONS</a>
              <div className="dropdown-menu absolute hidden bg-black border border-zinc-700 mt-2 py-4 w-96 z-50">
                <div className="grid grid-cols-1 gap-4 px-4">
                  <div>
                    <h4 className="font-bold mb-2 text-white text-xs tracking-widest">ASTRO COLLECTION</h4>
                    <ul className="grid grid-cols-2 gap-1">
                      {[
                        ["Emerald", "emerald"],
                        ["Ruby", "ruby"],
                        ["Yellow Sapphire", "yellow-sapphire"],
                        ["Sapphire", "sapphire"],
                        ["Blue Sapphire", "blue-sapphire"],
                        ["Pearl", "pearl"],
                      ].map(([label, handle]) => (
                        <li key={handle}>
                          <Link to={`/collections/${handle}`} className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-zinc-800 text-sm">
                            {label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2 text-white text-xs tracking-widest">OTHER COLLECTIONS</h4>
                    <ul className="space-y-1">
                      {[
                        ["Celestial Dreams", "celestial-dreams"],
                        ["Mythical Creatures", "mythical-creatures"],
                      ].map(([label, handle]) => (
                        <li key={handle}>
                          <Link to={`/collections/${handle}`} className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-zinc-800 text-sm">
                            {label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Jewellery Dropdown */}
            <div className="dropdown relative">
              <a href="#" className="nav-link text-white hover:text-gray-300">JEWELLERY</a>
              <div className="dropdown-menu absolute hidden bg-black border border-zinc-700 mt-2 py-4 w-64 z-50">
                {["men", "women", "kids"].map((gender) => (
                  <div key={gender} className="px-4 mb-3">
                    <p className="text-xs tracking-widest text-zinc-500 font-bold mb-1">{gender.toUpperCase()}</p>
                    {["earrings", "rings", "lockets"].map((type) => (
                      <Link
                        key={type}
                        to={`/jewellery/${gender}/${type}`}
                        className="block px-2 py-1.5 text-gray-300 hover:text-white hover:bg-zinc-800 text-sm capitalize"
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Accessories Dropdown */}
            <div className="dropdown relative">
              <a href="#" className="nav-link text-white hover:text-gray-300">ACCESSORIES</a>
              <div className="dropdown-menu absolute hidden bg-black border border-zinc-700 mt-2 py-2 w-48 z-50">
                {[
                  ["Cufflinks", "cufflinks"],
                  ["Bracelets", "bracelets"],
                  ["Brooches", "brooches"],
                  ["Tie Pins", "tie-pins"],
                  ["Belt Buckles", "belt-buckles"],
                ].map(([label, handle]) => (
                  <Link key={handle} to={`/accessories/${handle}`} className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-zinc-800 text-sm">
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Go Astro */}
            <Link to="/go-astro" className="nav-link text-white hover:text-gray-300">GO ASTRO</Link>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-6 text-white">
            <button className="focus:outline-none hover:text-gray-300">
              <Search className="w-5 h-5" />
            </button>
            <a href="#" className="hidden md:block text-sm hover:text-gray-300">LOGIN</a>
            <button onClick={openWishlist} className="relative focus:outline-none hover:text-gray-300" aria-label="Open wishlist">
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-black text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </button>
            <button onClick={openCart} className="relative focus:outline-none hover:text-gray-300" aria-label="Open cart">
              <ShoppingBag className="w-5 h-5" />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-black text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`mobile-menu fixed inset-y-0 right-0 w-64 bg-black border-l border-zinc-800 z-50 p-4 overflow-y-auto ${isMobileMenuOpen ? "open" : ""}`}>
        <div className="flex justify-between items-center mb-8">
          <span className="text-white font-bold tracking-widest text-sm">MENU</span>
          <button onClick={closeMobileMenu} className="focus:outline-none text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <ul className="space-y-4 text-white">
          <li>
            <p className="py-2 font-medium text-zinc-500 text-xs tracking-widest">COLLECTIONS</p>
            <ul className="pl-2 space-y-1">
              {[["Emerald","emerald"],["Ruby","ruby"],["Yellow Sapphire","yellow-sapphire"],["Sapphire","sapphire"],["Blue Sapphire","blue-sapphire"],["Pearl","pearl"],["Celestial Dreams","celestial-dreams"],["Mythical Creatures","mythical-creatures"]].map(([label, handle]) => (
                <li key={handle}><Link to={`/collections/${handle}`} onClick={closeMobileMenu} className="block py-1 text-gray-300 hover:text-white text-sm">{label}</Link></li>
              ))}
            </ul>
          </li>
          <li>
            <p className="py-2 font-medium text-zinc-500 text-xs tracking-widest">JEWELLERY</p>
            {["men", "women", "kids"].map((gender) => (
              <div key={gender} className="pl-2 mb-2">
                <p className="text-zinc-600 text-xs tracking-widest mb-1">{gender.toUpperCase()}</p>
                <ul className="pl-2 space-y-1">
                  {["earrings", "rings", "lockets"].map((type) => (
                    <li key={type}>
                      <Link to={`/jewellery/${gender}/${type}`} onClick={closeMobileMenu} className="block py-1 text-gray-300 hover:text-white text-sm capitalize">
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </li>
          <li>
            <p className="py-2 font-medium text-zinc-500 text-xs tracking-widest">ACCESSORIES</p>
            <ul className="pl-2 space-y-1">
              {[["Cufflinks","cufflinks"],["Bracelets","bracelets"],["Brooches","brooches"],["Tie Pins","tie-pins"],["Belt Buckles","belt-buckles"]].map(([label, handle]) => (
                <li key={handle}><Link to={`/accessories/${handle}`} onClick={closeMobileMenu} className="block py-1 text-gray-300 hover:text-white text-sm">{label}</Link></li>
              ))}
            </ul>
          </li>
          <li>
            <Link to="/go-astro" onClick={closeMobileMenu} className="block py-2 font-bold tracking-widest text-sm">GO ASTRO</Link>
          </li>
          <li>
            <a href="#" className="block py-2 text-gray-300 hover:text-white text-sm">LOGIN</a>
          </li>
        </ul>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={closeMobileMenu} />
      )}
    </>
  );
}

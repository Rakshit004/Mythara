import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, X, ShoppingBag, Heart, ChevronDown, User } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

interface HeaderProps {
  onGoAstroClick?: () => void;
}

const MARQUEE_TEXT =
  "Free Shipping on Orders Over ₹5000  ✶  New Drop — Shop Now  ✶  Certified Gemstones  ✶  Handcrafted in India  ✶  Astrological Heritage  ✶  ";

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
      {/* Scrolling Announcement Bar */}
      <div className="bg-zinc-900 text-white text-xs py-2 overflow-hidden border-b border-zinc-800">
        <div className="marquee-track flex w-max">
          <span className="whitespace-nowrap tracking-wider text-gray-300 pr-0">{MARQUEE_TEXT.repeat(6)}</span>
          <span className="whitespace-nowrap tracking-wider text-gray-300 pr-0" aria-hidden>{MARQUEE_TEXT.repeat(6)}</span>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-black">
        <div className="px-6 py-0 flex items-center justify-between relative">

          {/* Mobile Menu Button */}
          <button onClick={toggleMobileMenu} className="md:hidden focus:outline-none text-white z-10">
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo - Left */}
          <Link to="/" className="flex items-center shrink-0 z-10">
            <img
              src="/logo2.jpeg"
              alt="MYTARA & CO"
              className="h-28 w-28 object-cover"
              style={{ objectPosition: "center 55%" }}
            />
            <span className="text-white font-bold tracking-[0.15em] text-sm hidden sm:block -ml-3">
              MYTARA &amp; CO
            </span>
          </Link>

          {/* Desktop Nav - Centered absolutely */}
          <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">

            {/* Collections Dropdown */}
            <div className="dropdown relative">
              <button className="nav-link flex items-center gap-1 text-white text-xs font-semibold tracking-widest px-4 py-2 hover:text-gray-300 transition-colors">
                COLLECTIONS <ChevronDown className="w-3 h-3 opacity-70" />
              </button>
              <div className="dropdown-menu absolute hidden bg-black border border-zinc-800 mt-1 py-4 w-96 z-50 left-0">
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
                          <Link to={`/collections/${handle}`} className="block px-3 py-2 text-gray-400 hover:text-white hover:bg-zinc-900 text-xs tracking-wide transition-colors">
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
                          <Link to={`/collections/${handle}`} className="block px-3 py-2 text-gray-400 hover:text-white hover:bg-zinc-900 text-xs tracking-wide transition-colors">
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
              <button className="nav-link flex items-center gap-1 text-white text-xs font-semibold tracking-widest px-4 py-2 hover:text-gray-300 transition-colors">
                JEWELLERY <ChevronDown className="w-3 h-3 opacity-70" />
              </button>
              <div className="dropdown-menu absolute hidden bg-black border border-zinc-800 mt-1 py-4 w-56 z-50 left-0">
                {["men", "women", "kids"].map((gender) => (
                  <div key={gender} className="px-4 mb-3">
                    <p className="text-xs tracking-widest text-zinc-500 font-bold mb-1">{gender.toUpperCase()}</p>
                    {["earrings", "rings", "lockets"].map((type) => (
                      <Link
                        key={type}
                        to={`/jewellery/${gender}/${type}`}
                        className="block px-2 py-1.5 text-gray-400 hover:text-white hover:bg-zinc-900 text-xs tracking-wide capitalize transition-colors"
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
              <button className="nav-link flex items-center gap-1 text-white text-xs font-semibold tracking-widest px-4 py-2 hover:text-gray-300 transition-colors">
                ACCESSORIES <ChevronDown className="w-3 h-3 opacity-70" />
              </button>
              <div className="dropdown-menu absolute hidden bg-black border border-zinc-800 mt-1 py-2 w-44 z-50 left-0">
                {[
                  ["Cufflinks", "cufflinks"],
                  ["Bracelets", "bracelets"],
                  ["Brooches", "brooches"],
                  ["Tie Pins", "tie-pins"],
                  ["Belt Buckles", "belt-buckles"],
                ].map(([label, handle]) => (
                  <Link key={handle} to={`/accessories/${handle}`} className="block px-4 py-2 text-gray-400 hover:text-white hover:bg-zinc-900 text-xs tracking-wide transition-colors">
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Go Astro */}
            <Link to="/go-astro" className="nav-link text-white text-xs font-semibold tracking-widest px-4 py-2 hover:text-gray-300 transition-colors">
              GO ASTRO
            </Link>

          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-5 text-white z-10">
            <button className="focus:outline-none hover:text-gray-300 transition-colors" aria-label="Search">
              <Search className="w-5 h-5" />
            </button>
            <button className="hidden md:block focus:outline-none hover:text-gray-300 transition-colors" aria-label="Account">
              <User className="w-5 h-5" />
            </button>
            <button onClick={openWishlist} className="relative focus:outline-none hover:text-gray-300 transition-colors" aria-label="Wishlist">
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-black text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </button>
            <button onClick={openCart} className="relative focus:outline-none hover:text-gray-300 transition-colors" aria-label="Cart">
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
      <div className={`mobile-menu fixed inset-y-0 right-0 w-72 bg-black border-l border-zinc-800 z-50 p-6 overflow-y-auto ${isMobileMenuOpen ? "open" : ""}`}>
        <div className="flex justify-between items-center mb-8">
          <span className="text-white font-bold tracking-widest text-sm">MENU</span>
          <button onClick={closeMobileMenu} className="focus:outline-none text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <ul className="space-y-5 text-white">
          <li>
            <p className="py-1 font-bold text-zinc-500 text-xs tracking-widest">COLLECTIONS</p>
            <ul className="pl-2 space-y-1 mt-1">
              {[["Emerald","emerald"],["Ruby","ruby"],["Yellow Sapphire","yellow-sapphire"],["Sapphire","sapphire"],["Blue Sapphire","blue-sapphire"],["Pearl","pearl"],["Celestial Dreams","celestial-dreams"],["Mythical Creatures","mythical-creatures"]].map(([label, handle]) => (
                <li key={handle}>
                  <Link to={`/collections/${handle}`} onClick={closeMobileMenu} className="block py-1.5 text-gray-400 hover:text-white text-xs tracking-wide transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <p className="py-1 font-bold text-zinc-500 text-xs tracking-widest">JEWELLERY</p>
            {["men", "women", "kids"].map((gender) => (
              <div key={gender} className="pl-2 mb-2 mt-1">
                <p className="text-zinc-600 text-xs tracking-widest mb-1">{gender.toUpperCase()}</p>
                <ul className="pl-2 space-y-1">
                  {["earrings", "rings", "lockets"].map((type) => (
                    <li key={type}>
                      <Link to={`/jewellery/${gender}/${type}`} onClick={closeMobileMenu} className="block py-1.5 text-gray-400 hover:text-white text-xs tracking-wide capitalize transition-colors">
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </li>
          <li>
            <p className="py-1 font-bold text-zinc-500 text-xs tracking-widest">ACCESSORIES</p>
            <ul className="pl-2 space-y-1 mt-1">
              {[["Cufflinks","cufflinks"],["Bracelets","bracelets"],["Brooches","brooches"],["Tie Pins","tie-pins"],["Belt Buckles","belt-buckles"]].map(([label, handle]) => (
                <li key={handle}>
                  <Link to={`/accessories/${handle}`} onClick={closeMobileMenu} className="block py-1.5 text-gray-400 hover:text-white text-xs tracking-wide transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <Link to="/go-astro" onClick={closeMobileMenu} className="block py-2 font-bold tracking-widest text-sm">GO ASTRO</Link>
          </li>
          <li>
            <a href="#" className="block py-2 text-gray-400 hover:text-white text-xs tracking-widest transition-colors">LOGIN</a>
          </li>
        </ul>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-40" onClick={closeMobileMenu} />
      )}
    </>
  );
}

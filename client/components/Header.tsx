import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";

interface HeaderProps {
  onGoAstroClick?: () => void;
}

export default function Header({ onGoAstroClick }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = !isMobileMenuOpen ? "hidden" : "auto";
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-black text-white text-sm py-2 px-4 flex justify-between items-center">
        <div className="flex space-x-4">
          <a href="#" className="hover:text-gray-300">
            Free Shipping on Orders Over ₹5000
          </a>
          <a href="#" className="hover:text-gray-300">
            New Drop - Shop Now
          </a>
        </div>
        <div className="hidden md:flex space-x-4">
          <a href="#" className="hover:text-gray-300">
            Log In
          </a>
          <a href="#" className="hover:text-gray-300">
            Store Locator
          </a>
          <a href="#" className="hover:text-gray-300">
            Customer Support
          </a>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden focus:outline-none"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <Link to="/" className="text-2xl font-bold tracking-tight">
            MYTHARA
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 mx-auto">
            {/* Collections Dropdown */}
            <div className="dropdown relative">
              <Link to="/collections" className="nav-link">
                COLLECTIONS
              </Link>
              <div className="dropdown-menu absolute hidden bg-white shadow-lg rounded mt-2 py-4 w-96 z-50">
                <div className="grid grid-cols-1 gap-4 px-4">
                  <div>
                    <h4 className="font-bold mb-2">
                      ASTRO: Journey to the Astrological Realm
                    </h4>
                    <ul className="grid grid-cols-2 gap-2">
                      <li>
                        <Link
                          to="/collections/emerald"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Emerald
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/collections/ruby"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Ruby
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/collections/yellow"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Yellow
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/collections/sapphire"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Sapphire
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/collections/blue-sapphire"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Blue Sapphire
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/collections/pearl"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Pearl
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Other Collections</h4>
                    <ul className="space-y-2">
                      <li>
                        <Link
                          to="/collections/celestial"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Celestial Dreams
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/collections/mythical"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Mythical Creatures
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="pt-4 border-t">
                    <Link
                      to="/collections"
                      className="block px-4 py-2 text-black font-medium hover:bg-gray-100"
                    >
                      View All Collections →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Jewellery Dropdown */}
            <div className="dropdown relative">
              <a href="#" className="nav-link">
                JEWELLERY
              </a>
              <div className="dropdown-menu absolute hidden bg-white shadow-lg rounded mt-2 py-2 w-48 z-50">
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Earrings
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Rings
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Lockets
                </a>
              </div>
            </div>

            {/* Accessories Dropdown */}
            <div className="dropdown relative">
              <a href="#" className="nav-link">
                ACCESSORIES
              </a>
              <div className="dropdown-menu absolute hidden bg-white shadow-lg rounded mt-2 py-2 w-48 z-50">
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Cufflinks
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Bracelets
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Brooches
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Tie Pins
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Belt Buckles
                </a>
              </div>
            </div>

            {/* Go Astro Link */}
            <div className="relative">
              <button onClick={onGoAstroClick} className="nav-link">
                GO ASTRO
              </button>
            </div>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-6">
            <button className="focus:outline-none">
              <Search className="w-6 h-6" />
            </button>
            <a href="#" className="hidden md:block">
              LOGIN
            </a>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`mobile-menu fixed inset-y-0 right-0 w-64 bg-white shadow-lg z-50 p-4 overflow-y-auto ${isMobileMenuOpen ? "open" : ""}`}
      >
        <div className="flex justify-between items-center mb-8">
          <span className="text-xl font-bold">Menu</span>
          <button onClick={closeMobileMenu} className="focus:outline-none">
            <X className="w-6 h-6" />
          </button>
        </div>

        <ul className="space-y-4">
          <li>
            <a href="#" className="block py-2 font-medium">
              NEW IN
            </a>
          </li>
          <li>
            <a href="#" className="block py-2 font-medium">
              APPAREL
            </a>
            <ul className="pl-4 mt-2 space-y-2">
              <li>
                <a href="#" className="block py-1">
                  Top Wear
                </a>
              </li>
              <li>
                <a href="#" className="block py-1">
                  Bottom Wear
                </a>
              </li>
              <li>
                <a href="#" className="block py-1">
                  Accessories
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#" className="block py-2 font-medium">
              STORES
            </a>
            <ul className="pl-4 mt-2 space-y-2">
              <li>
                <a href="#" className="block py-1">
                  Delhi
                </a>
              </li>
              <li>
                <a href="#" className="block py-1">
                  Mumbai
                </a>
              </li>
              <li>
                <a href="#" className="block py-1">
                  Hyderabad
                </a>
              </li>
              <li>
                <a href="#" className="block py-1">
                  Ahmedabad
                </a>
              </li>
              <li>
                <a href="#" className="block py-1">
                  Gurugram
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#" className="block py-2 font-medium">
              LOGIN
            </a>
          </li>
        </ul>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeMobileMenu}
        />
      )}
    </>
  );
}

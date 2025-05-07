import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Menu, X, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useStore } from "@/contexts/StoreContext";
import { useIsMobile } from "@/hooks/use-mobile";
const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  const {
    state
  } = useStore();
  const cartItemsCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const navLinks = [{
    name: "Home",
    path: "/"
  }, {
    name: "Products",
    path: "/products"
  }, {
    name: "Contact",
    path: "/contact"
  }];
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  return <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="font-bold text-2xl text-brand">Evansco

        </Link>

          {!isMobile && <nav className="flex items-center space-x-8">
              {navLinks.map(link => <Link key={link.path} to={link.path} className={`font-medium transition-colors ${isActive(link.path) ? "text-accent" : "text-gray-600 hover:text-accent"}`}>
                  {link.name}
                </Link>)}
            </nav>}

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" aria-label="Search">
              <Search className="h-5 w-5" />
            </Button>
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" aria-label="Cart">
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-accent text-white">
                    {cartItemsCount}
                  </Badge>}
              </Button>
            </Link>

            {isMobile && <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Menu" className="md:hidden">
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>}
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobile && isMenuOpen && <nav className="mt-4 py-4 border-t border-gray-100 animate-slideUp">
            {navLinks.map(link => <Link key={link.path} to={link.path} className={`block py-2 font-medium ${isActive(link.path) ? "text-accent" : "text-gray-600 hover:text-accent"}`} onClick={() => setIsMenuOpen(false)}>
                {link.name}
              </Link>)}
          </nav>}
      </div>
    </header>;
};
export default Header;
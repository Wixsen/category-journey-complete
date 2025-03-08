
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <h1 className="text-xl sm:text-2xl font-bold text-agri-green">AgriRoad</h1>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className={`nav-link ${isActive('/') ? 'text-agri-green' : ''}`}>
            HOME
          </Link>
          <Link to="/shop" className={`nav-link ${isActive('/shop') ? 'text-agri-green' : ''}`}>
            SHOP
          </Link>
          <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'text-agri-green' : ''}`}>
            CONTACT
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="hidden sm:flex text-gray-700 hover:text-agri-green">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden sm:flex text-gray-700 hover:text-agri-green">
            <ShoppingCart className="h-5 w-5" />
          </Button>
          <Button variant="default" className="bg-agri-green hover:bg-agri-dark-green text-white transition-colors">
            Sign In
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

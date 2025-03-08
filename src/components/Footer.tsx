
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-agri-green">AgriRoad</h3>
            <p className="text-sm text-gray-600">
              Connecting farmers and consumers. Fresh produce directly from the source.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-agri-green transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-agri-green transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-agri-green transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold uppercase text-gray-600 mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><Link to="/shop" className="text-sm text-gray-500 hover:text-agri-green transition-colors">All Products</Link></li>
              <li><Link to="/category/fruits" className="text-sm text-gray-500 hover:text-agri-green transition-colors">Fruits</Link></li>
              <li><Link to="/category/vegetables" className="text-sm text-gray-500 hover:text-agri-green transition-colors">Vegetables</Link></li>
              <li><Link to="/category/herbs" className="text-sm text-gray-500 hover:text-agri-green transition-colors">Herbs</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold uppercase text-gray-600 mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm text-gray-500 hover:text-agri-green transition-colors">About Us</Link></li>
              <li><Link to="/farmers" className="text-sm text-gray-500 hover:text-agri-green transition-colors">Our Farmers</Link></li>
              <li><Link to="/sustainability" className="text-sm text-gray-500 hover:text-agri-green transition-colors">Sustainability</Link></li>
              <li><Link to="/contact" className="text-sm text-gray-500 hover:text-agri-green transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold uppercase text-gray-600 mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link to="/faq" className="text-sm text-gray-500 hover:text-agri-green transition-colors">FAQ</Link></li>
              <li><Link to="/shipping" className="text-sm text-gray-500 hover:text-agri-green transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/privacy" className="text-sm text-gray-500 hover:text-agri-green transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm text-gray-500 hover:text-agri-green transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-100 mt-12 pt-8 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} AgriRoad. All rights reserved. Purely Farmed, Proudly Served.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

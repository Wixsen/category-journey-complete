
import React, { useState } from 'react';
import { Product } from '@/data/categoryData';
import FarmerSelector from './FarmerSelector';
import FarmerProfile from './FarmerProfile';
import ProductFeatures from './ProductFeatures';
import ProductInfo from './product/ProductInfo';
import AddToCartSection from './product/AddToCartSection';
import ProductChatSection from './product/ProductChatSection';
import QRCode from './QRCode';

interface ProductDetailsProps {
  product: Product;
  categoryName: string;
  farmers: string[];
  products: Product[];
  addToCart: (product: Product, quantity: number) => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  categoryName,
  farmers,
  products,
  addToCart
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedFarmer, setSelectedFarmer] = useState(product.farmer);
  const [showFarmerProfile, setShowFarmerProfile] = useState(false);
  const [showFarmerQR, setShowFarmerQR] = useState(false);

  const handleIncreaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };
  
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const toggleFarmerProfile = () => {
    setShowFarmerProfile(!showFarmerProfile);
  };

  const toggleFarmerQR = () => {
    setShowFarmerQR(!showFarmerQR);
  };

  const handleFarmerChange = (farmer: string) => {
    setSelectedFarmer(farmer);
    setShowFarmerProfile(true);
  };

  // Generate a unique QR URL for the farmer
  const farmerQRUrl = `https://agriroad-farmer.netlify.app/profile?name=${encodeURIComponent(selectedFarmer)}&product=${encodeURIComponent(product.name)}`;

  return (
    <div className="animate-fade-up">
      {/* Product Information */}
      <ProductInfo product={product} categoryName={categoryName} />
      
      {/* Farmer Selector */}
      <FarmerSelector 
        selectedFarmer={selectedFarmer}
        farmers={farmers}
        products={products}
        onFarmerChange={handleFarmerChange}
        toggleFarmerProfile={toggleFarmerProfile}
        showFarmerProfile={showFarmerProfile}
      />
      
      {/* Farmer Profile */}
      {showFarmerProfile && (
        <div className="mb-6">
          <FarmerProfile farmerName={selectedFarmer} />
          <div className="mt-4 flex justify-end">
            <button 
              onClick={toggleFarmerQR}
              className="text-sm flex items-center text-agri-green hover:text-agri-dark-green dark:text-agri-light-green dark:hover:text-agri-green"
            >
              {showFarmerQR ? 'Hide QR Code' : 'Show Farmer QR Code'}
            </button>
          </div>
        </div>
      )}
      
      {/* Farmer QR Code */}
      {showFarmerQR && (
        <div className="mb-6">
          <QRCode 
            url={farmerQRUrl}
            title={`Connect with ${selectedFarmer}`}
            description={`Scan to learn more about ${selectedFarmer} and their farming practices for ${product.name}`}
          />
        </div>
      )}
      
      {/* Add to Cart Section */}
      <AddToCartSection 
        product={product}
        quantity={quantity}
        onIncreaseQuantity={handleIncreaseQuantity}
        onDecreaseQuantity={handleDecreaseQuantity}
        onQuantityChange={setQuantity}
        onAddToCart={handleAddToCart}
      />
      
      {/* AI Chat Section */}
      <ProductChatSection 
        productName={product.name}
        categoryName={categoryName}
        farmerName={selectedFarmer}
      />
      
      {/* Product Features */}
      <ProductFeatures />
    </div>
  );
};

export default ProductDetails;


import React, { useState } from 'react';
import { Product } from '@/data/categoryData';
import FarmerSelector from './FarmerSelector';
import FarmerProfile from './FarmerProfile';
import ProductFeatures from './ProductFeatures';
import ProductInfo from './product/ProductInfo';
import AddToCartSection from './product/AddToCartSection';
import ProductChatSection from './product/ProductChatSection';

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

  const handleFarmerChange = (farmer: string) => {
    setSelectedFarmer(farmer);
    setShowFarmerProfile(true);
  };

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

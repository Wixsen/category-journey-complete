
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Leaf } from 'lucide-react';
import { Product } from '@/data/categoryData';
import ProductQuantitySelector from './ProductQuantitySelector';
import FarmerSelector from './FarmerSelector';
import FarmerProfile from './FarmerProfile';
import ProductFeatures from './ProductFeatures';
import ChatWithAI from './ChatWithAI';

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
  const [showChat, setShowChat] = useState(false);
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

  const toggleChat = () => {
    setShowChat(!showChat);
    setShowFarmerProfile(false);
  };
  
  const toggleFarmerProfile = () => {
    setShowFarmerProfile(!showFarmerProfile);
    setShowChat(false);
  };

  const handleFarmerChange = (farmer: string) => {
    setSelectedFarmer(farmer);
    setShowFarmerProfile(true);
  };

  return (
    <div className="animate-fade-up">
      <div className="flex flex-wrap gap-2 mb-4">
        {product.isOrganic && (
          <Badge className="bg-agri-green text-white hover:bg-agri-green">
            <Leaf className="h-3 w-3 mr-1" /> Organic
          </Badge>
        )}
        <Badge className="bg-secondary text-secondary-foreground hover:bg-secondary/80">
          {categoryName}
        </Badge>
      </div>
      
      <h1 className="text-3xl font-bold text-foreground mb-4">{product.name}</h1>
      
      <div className="flex items-center mb-4">
        <span className="text-2xl font-bold text-agri-green">
          ₹{product.price.toFixed(2)}
        </span>
        <span className="text-sm text-muted-foreground ml-2">
          per item
        </span>
      </div>
      
      <p className="text-foreground mb-6">{product.description}</p>
      
      <FarmerSelector 
        selectedFarmer={selectedFarmer}
        farmers={farmers}
        products={products}
        onFarmerChange={handleFarmerChange}
        toggleFarmerProfile={toggleFarmerProfile}
        showFarmerProfile={showFarmerProfile}
      />
      
      {showFarmerProfile && (
        <div className="mb-6">
          <FarmerProfile farmerName={selectedFarmer} />
        </div>
      )}
      
      <div className="border-t border-b border-border py-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-foreground">Availability:</span>
          <span className={`font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
          </span>
        </div>
      </div>
      
      <ProductQuantitySelector 
        quantity={quantity}
        stock={product.stock}
        onIncrease={handleIncreaseQuantity}
        onDecrease={handleDecreaseQuantity}
        onChange={setQuantity}
      />
      
      <Button 
        className="w-full bg-agri-green hover:bg-agri-dark-green text-white py-3"
        onClick={handleAddToCart}
        disabled={product.stock <= 0}
      >
        Add to Cart
      </Button>
      
      <div className="mt-6">
        <Button 
          variant="outline" 
          className="w-full border-agri-green text-agri-green hover:bg-agri-green hover:text-white"
          onClick={toggleChat}
        >
          {showChat ? "Close Chat" : "Chat with AI about this product"}
        </Button>
        
        {showChat && (
          <div className="mt-4 p-4 border border-border rounded-lg bg-card">
            <ChatWithAI 
              productName={product.name} 
              categoryName={categoryName} 
              farmerName={selectedFarmer} 
            />
          </div>
        )}
      </div>
      
      <ProductFeatures />
    </div>
  );
};

export default ProductDetails;

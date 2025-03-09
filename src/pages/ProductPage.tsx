
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { getProductById, getCategoryById, getRecommendedProducts, products } from '@/data/categoryData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronRight, Minus, Plus, Truck, ShieldCheck, Leaf, MapPin } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import ChatWithAI from '@/components/ChatWithAI';
import ProductImageSlider from '@/components/ProductImageSlider';
import FarmerProfile from '@/components/FarmerProfile';

const ProductPage = () => {
  const { categoryId, productId } = useParams<{ categoryId: string; productId: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedFarmer, setSelectedFarmer] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [showFarmerProfile, setShowFarmerProfile] = useState(false);
  
  const product = productId ? getProductById(productId) : undefined;
  const category = categoryId ? getCategoryById(categoryId) : undefined;
  const recommendedProducts = productId && categoryId 
    ? getRecommendedProducts(categoryId, productId) 
    : [];
  
  const farmers = productId && categoryId
    ? [...new Set(products
        .filter(p => p.categoryId === categoryId)
        .map(p => p.farmer))]
    : [];

  useEffect(() => {
    if (product && !selectedFarmer) {
      setSelectedFarmer(product.farmer);
    }
  }, [product]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);
  
  if (!product || !category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Product not found</h1>
            <p className="text-muted-foreground mt-2">The product you're looking for doesn't exist.</p>
            <Link to="/" className="mt-6 inline-block text-agri-green hover:underline">
              Return to home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
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
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center text-sm text-muted-foreground">
          <Link to="/" className="hover:text-agri-green">Home</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link to="/shop" className="hover:text-agri-green">Shop</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link to={`/category/${category.id}`} className="hover:text-agri-green">{category.name}</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-agri-green">{product.name}</span>
        </div>
      </div>
      
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <div className="animate-fade-in">
              <ProductImageSlider mainImage={product.image} productName={product.name} />
            </div>
            
            <div className="animate-fade-up">
              <div className="flex flex-wrap gap-2 mb-4">
                {product.isOrganic && (
                  <Badge className="bg-agri-green text-white hover:bg-agri-green">
                    <Leaf className="h-3 w-3 mr-1" /> Organic
                  </Badge>
                )}
                <Badge className="bg-secondary text-secondary-foreground hover:bg-secondary/80">
                  {category.name}
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
              
              <div className="flex items-center mb-4">
                <MapPin className="h-5 w-5 text-agri-green mr-2" />
                <div className="flex flex-col w-full">
                  <span className="text-foreground mb-2">Select Farmer:</span>
                  <div className="flex gap-2 items-center">
                    <select 
                      value={selectedFarmer}
                      onChange={(e) => handleFarmerChange(e.target.value)}
                      className="p-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-agri-green flex-1"
                    >
                      {farmers.map(farmer => (
                        <option key={farmer} value={farmer}>{farmer} - {
                          products.find(p => p.farmer === farmer)?.location
                        }</option>
                      ))}
                    </select>
                    <Button 
                      variant="outline"
                      onClick={toggleFarmerProfile}
                      className="border-agri-green text-agri-green hover:bg-agri-green hover:text-white"
                    >
                      {showFarmerProfile ? "Hide Profile" : "View Profile"}
                    </Button>
                  </div>
                </div>
              </div>
              
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
              
              <div className="mb-6">
                <label htmlFor="quantity" className="block text-foreground mb-2">
                  Quantity:
                </label>
                <div className="flex">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={handleDecreaseQuantity} 
                    disabled={quantity <= 1}
                    className="border border-input"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <input 
                    type="number" 
                    id="quantity" 
                    value={quantity} 
                    onChange={(e) => setQuantity(Math.min(parseInt(e.target.value) || 1, product.stock))} 
                    className="w-16 text-center border-t border-b border-input focus:outline-none py-2 bg-background text-foreground" 
                    min="1" 
                    max={product.stock}
                  />
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={handleIncreaseQuantity} 
                    disabled={quantity >= product.stock}
                    className="border border-input"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
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
                      categoryName={category.name} 
                      farmerName={selectedFarmer} 
                    />
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div className="flex items-center">
                  <Truck className="h-5 w-5 text-agri-green mr-2" />
                  <span className="text-sm text-muted-foreground">Fast Delivery</span>
                </div>
                <div className="flex items-center">
                  <ShieldCheck className="h-5 w-5 text-agri-green mr-2" />
                  <span className="text-sm text-muted-foreground">Quality Guaranteed</span>
                </div>
                <div className="flex items-center">
                  <Leaf className="h-5 w-5 text-agri-green mr-2" />
                  <span className="text-sm text-muted-foreground">Sustainably Grown</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {recommendedProducts.length > 0 && (
        <section className="py-12 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-foreground">You May Also Like</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {recommendedProducts.map((product) => (
                <ProductCard 
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  categoryId={product.categoryId}
                  isOrganic={product.isOrganic}
                  isFeatured={product.isFeatured}
                />
              ))}
            </div>
          </div>
        </section>
      )}
      
      <Footer />
    </div>
  );
};

export default ProductPage;

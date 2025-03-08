
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { getProductById, getCategoryById, getRecommendedProducts } from '@/data/categoryData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronRight, Minus, Plus, Truck, ShieldCheck, Leaf, MapPin } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

const ProductPage = () => {
  const { categoryId, productId } = useParams<{ categoryId: string; productId: string }>();
  const navigate = useNavigate();
  
  const [quantity, setQuantity] = useState(1);
  
  const product = productId ? getProductById(productId) : undefined;
  const category = categoryId ? getCategoryById(categoryId) : undefined;
  const recommendedProducts = productId && categoryId 
    ? getRecommendedProducts(categoryId, productId) 
    : [];
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);
  
  if (!product || !category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">Product not found</h1>
            <p className="text-gray-600 mt-2">The product you're looking for doesn't exist.</p>
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
    toast({
      title: "Added to cart",
      description: `${quantity} × ${product.name} added to your cart`,
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center text-sm text-gray-600">
          <Link to="/" className="hover:text-agri-green">Home</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link to="/shop" className="hover:text-agri-green">Shop</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link to={`/category/${category.id}`} className="hover:text-agri-green">{category.name}</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-agri-green">{product.name}</span>
        </div>
      </div>
      
      {/* Product Details */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Image */}
            <div className="rounded-lg overflow-hidden border border-gray-100 animate-fade-in">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Product Info */}
            <div className="animate-fade-up">
              <div className="flex flex-wrap gap-2 mb-4">
                {product.isOrganic && (
                  <Badge className="bg-agri-green text-white hover:bg-agri-green">
                    <Leaf className="h-3 w-3 mr-1" /> Organic
                  </Badge>
                )}
                <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                  {category.name}
                </Badge>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <span className="text-2xl font-bold text-agri-green">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-sm text-gray-500 ml-2">
                  per item
                </span>
              </div>
              
              <p className="text-gray-600 mb-6">{product.description}</p>
              
              <div className="flex items-center mb-4">
                <MapPin className="h-5 w-5 text-agri-green mr-2" />
                <span className="text-gray-700">
                  From <span className="font-medium">{product.farmer}</span> in {product.location}
                </span>
              </div>
              
              <div className="border-t border-b border-gray-100 py-4 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-700">Availability:</span>
                  <span className={`font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                  </span>
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="quantity" className="block text-gray-700 mb-2">
                  Quantity:
                </label>
                <div className="flex">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={handleDecreaseQuantity} 
                    disabled={quantity <= 1}
                    className="border border-gray-200"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <input 
                    type="number" 
                    id="quantity" 
                    value={quantity} 
                    onChange={(e) => setQuantity(Math.min(parseInt(e.target.value) || 1, product.stock))} 
                    className="w-16 text-center border-t border-b border-gray-200 focus:outline-none py-2" 
                    min="1" 
                    max={product.stock}
                  />
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={handleIncreaseQuantity} 
                    disabled={quantity >= product.stock}
                    className="border border-gray-200"
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
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div className="flex items-center">
                  <Truck className="h-5 w-5 text-agri-green mr-2" />
                  <span className="text-sm text-gray-600">Fast Delivery</span>
                </div>
                <div className="flex items-center">
                  <ShieldCheck className="h-5 w-5 text-agri-green mr-2" />
                  <span className="text-sm text-gray-600">Quality Guaranteed</span>
                </div>
                <div className="flex items-center">
                  <Leaf className="h-5 w-5 text-agri-green mr-2" />
                  <span className="text-sm text-gray-600">Sustainably Grown</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Recommended Products */}
      {recommendedProducts.length > 0 && (
        <section className="py-12 bg-agri-beige">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
            
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

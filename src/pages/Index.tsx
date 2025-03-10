import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import CategoryCard from '@/components/CategoryCard';
import ProductCard from '@/components/ProductCard';
import ChatWithAI from '@/components/ChatWithAI';
import { categories, getFeaturedProducts, getFarmerFeatures } from '@/data/categoryData';
import { Link } from 'react-router-dom';

const Index = () => {
  const featuredProducts = getFeaturedProducts();
  const farmerFeatures = getFarmerFeatures();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      
      {/* Categories Section */}
      <section id="categories" className="py-8 md:py-16 bg-agri-beige dark:bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <span className="text-sm uppercase text-agri-green dark:text-agri-light-green font-medium tracking-wider">Discover Our Products</span>
            <h2 className="text-2xl md:text-3xl font-bold mt-2 mb-3 md:mb-4 text-foreground">Categories</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm md:text-base">
              "Purely Farmed, Proudly Served."
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-6 animate-fade-in">
            {categories.map((category) => (
              <CategoryCard 
                key={category.id}
                id={category.id}
                name={category.name}
                image={category.image}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className="py-8 md:py-16 bg-white dark:bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <span className="text-sm uppercase text-agri-green dark:text-agri-light-green font-medium tracking-wider">Handpicked For You</span>
            <h2 className="text-2xl md:text-3xl font-bold mt-2 mb-3 md:mb-4 text-foreground">Featured Products</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm md:text-base">
              Discover our selection of premium agricultural products carefully selected for their quality and freshness.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product) => (
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
          
          <div className="text-center mt-6 md:mt-10">
            <Link 
              to="/shop" 
              className="inline-block px-5 py-2 md:px-6 md:py-3 bg-agri-green dark:bg-agri-light-green text-white text-sm md:text-base rounded-md hover:bg-agri-dark-green dark:hover:bg-agri-green transition-colors"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>
      
      {/* Farmer Features */}
      <section className="py-8 md:py-16 bg-agri-beige dark:bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
            {farmerFeatures.map((feature) => (
              <div key={feature.id} className="relative overflow-hidden rounded-lg shadow-md group">
                <img 
                  src={feature.image} 
                  alt={feature.title} 
                  className="w-full h-48 md:h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="absolute bottom-0 left-0 p-4 md:p-6 text-white">
                    <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">{feature.title}</h3>
                    <p className="text-base md:text-lg mb-1">{feature.name}</p>
                    <p className="text-xs md:text-sm text-gray-200">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* AI Chat Assistant - Now a floating button */}
      <ChatWithAI standalone={true} />
      
      <Footer />
    </div>
  );
};

export default Index;

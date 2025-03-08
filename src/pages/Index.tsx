
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import CategoryCard from '@/components/CategoryCard';
import ProductCard from '@/components/ProductCard';
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
      <section id="categories" className="py-16 bg-agri-beige">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-sm uppercase text-agri-green font-medium tracking-wider">Discover Our Products</span>
            <h2 className="text-3xl font-bold mt-2 mb-4">Categories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              "Purely Farmed, Proudly Served."
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-6 animate-fade-in">
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
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-sm uppercase text-agri-green font-medium tracking-wider">Handpicked For You</span>
            <h2 className="text-3xl font-bold mt-2 mb-4">Featured Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our selection of premium agricultural products carefully selected for their quality and freshness.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
          
          <div className="text-center mt-10">
            <Link 
              to="/shop" 
              className="inline-block px-6 py-3 bg-agri-green text-white rounded-md hover:bg-agri-dark-green transition-colors"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>
      
      {/* Farmer Features */}
      <section className="py-16 bg-agri-beige">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {farmerFeatures.map((feature) => (
              <div key={feature.id} className="relative overflow-hidden rounded-lg shadow-md group">
                <img 
                  src={feature.image} 
                  alt={feature.title} 
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-lg mb-1">{feature.name}</p>
                    <p className="text-sm text-gray-200">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;

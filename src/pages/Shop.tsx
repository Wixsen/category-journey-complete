
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import { categories, products } from '@/data/categoryData';

const Shop = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Shop Header */}
      <div className="bg-agri-beige py-10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Shop All Products</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse our complete collection of fresh, sustainably grown agricultural products.
          </p>
        </div>
      </div>
      
      {/* Category Navigation */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap justify-center gap-4">
          <Link 
            to="/shop" 
            className="px-4 py-2 bg-agri-green text-white rounded-md"
          >
            All
          </Link>
          {categories.map((category) => (
            <Link 
              key={category.id}
              to={`/category/${category.id}`} 
              className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
      
      {/* Products Grid */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
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
      
      <Footer />
    </div>
  );
};

export default Shop;

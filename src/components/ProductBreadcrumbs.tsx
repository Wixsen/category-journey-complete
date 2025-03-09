
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Category } from '@/data/categoryData';

interface ProductBreadcrumbsProps {
  categoryId: string;
  categoryName: string;
  productName: string;
}

const ProductBreadcrumbs: React.FC<ProductBreadcrumbsProps> = ({ 
  categoryId, 
  categoryName, 
  productName 
}) => {
  return (
    <div className="flex items-center text-sm text-muted-foreground">
      <Link to="/" className="hover:text-agri-green">Home</Link>
      <ChevronRight className="h-4 w-4 mx-2" />
      <Link to="/shop" className="hover:text-agri-green">Shop</Link>
      <ChevronRight className="h-4 w-4 mx-2" />
      <Link to={`/category/${categoryId}`} className="hover:text-agri-green">{categoryName}</Link>
      <ChevronRight className="h-4 w-4 mx-2" />
      <span className="text-agri-green">{productName}</span>
    </div>
  );
};

export default ProductBreadcrumbs;

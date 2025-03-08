
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  categoryId: string;
  isOrganic?: boolean;
  isFeatured?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  id, 
  name, 
  price, 
  image, 
  categoryId,
  isOrganic = false,
  isFeatured = false
}) => {
  return (
    <Link to={`/product/${categoryId}/${id}`} className="product-card animate-scale-in">
      <div className="relative overflow-hidden">
        <img src={image} alt={name} className="transition-transform" />
        {isOrganic && (
          <Badge className="absolute top-2 left-2 bg-agri-green text-white hover:bg-agri-green">
            Organic
          </Badge>
        )}
        {isFeatured && (
          <Badge className="absolute top-2 right-2 bg-amber-500 text-white hover:bg-amber-500">
            Featured
          </Badge>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-800 mb-1">{name}</h3>
        <p className="text-agri-green font-semibold">${price.toFixed(2)}</p>
      </div>
    </Link>
  );
};

export default ProductCard;

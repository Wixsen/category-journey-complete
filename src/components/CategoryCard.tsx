
import React from 'react';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
  id: string;
  name: string;
  image: string;
  description?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ id, name, image }) => {
  return (
    <Link to={`/category/${id}`} className="category-card animate-scale-in">
      <div className="overflow-hidden">
        <img src={image} alt={name} className="transition-transform" />
      </div>
      <div className="category-title text-foreground">{name}</div>
    </Link>
  );
};

export default CategoryCard;

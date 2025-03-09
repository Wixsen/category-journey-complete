
import React from 'react';
import { Button } from '@/components/ui/button';
import { Product } from '@/data/categoryData';
import ProductQuantitySelector from '@/components/ProductQuantitySelector';

interface AddToCartSectionProps {
  product: Product;
  quantity: number;
  onIncreaseQuantity: () => void;
  onDecreaseQuantity: () => void;
  onQuantityChange: (value: number) => void;
  onAddToCart: () => void;
}

const AddToCartSection: React.FC<AddToCartSectionProps> = ({
  product,
  quantity,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onQuantityChange,
  onAddToCart
}) => {
  return (
    <div className="mb-6">
      <ProductQuantitySelector 
        quantity={quantity}
        stock={product.stock}
        onIncrease={onIncreaseQuantity}
        onDecrease={onDecreaseQuantity}
        onChange={onQuantityChange}
      />
      
      <Button 
        className="w-full bg-agri-green hover:bg-agri-dark-green dark:bg-agri-light-green dark:hover:bg-agri-green text-white py-3 mt-4"
        onClick={onAddToCart}
        disabled={product.stock <= 0}
      >
        Add to Cart
      </Button>
    </div>
  );
};

export default AddToCartSection;

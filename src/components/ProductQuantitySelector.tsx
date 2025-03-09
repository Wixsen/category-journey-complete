
import React from 'react';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';

interface ProductQuantitySelectorProps {
  quantity: number;
  stock: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onChange: (value: number) => void;
}

const ProductQuantitySelector: React.FC<ProductQuantitySelectorProps> = ({
  quantity,
  stock,
  onIncrease,
  onDecrease,
  onChange
}) => {
  return (
    <div className="mb-6">
      <label htmlFor="quantity" className="block text-foreground mb-2">
        Quantity:
      </label>
      <div className="flex">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={onDecrease} 
          disabled={quantity <= 1}
          className="border border-input"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <input 
          type="number" 
          id="quantity" 
          value={quantity} 
          onChange={(e) => onChange(Math.min(parseInt(e.target.value) || 1, stock))} 
          className="w-16 text-center border-t border-b border-input focus:outline-none py-2 bg-background text-foreground" 
          min="1" 
          max={stock}
        />
        <Button 
          variant="outline" 
          size="icon" 
          onClick={onIncrease} 
          disabled={quantity >= stock}
          className="border border-input"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ProductQuantitySelector;

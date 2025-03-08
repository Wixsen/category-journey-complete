
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { products } from '@/data/categoryData';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SearchDialog: React.FC<SearchDialogProps> = ({ open, onOpenChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleProductClick = (categoryId: string, productId: string) => {
    navigate(`/product/${categoryId}/${productId}`);
    onOpenChange(false);
    setSearchQuery('');
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0">
        <div className="p-4 border-b">
          <div className="flex items-center">
            <Search className="h-5 w-5 text-gray-400 mr-2" />
            <Input
              autoFocus
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-none focus-visible:ring-0 flex-1 px-0"
            />
            {searchQuery && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setSearchQuery('')}
                className="text-gray-400"
              >
                <X className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
        
        <div className="max-h-[400px] overflow-y-auto p-4">
          {searchQuery.length > 0 ? (
            filteredProducts.length > 0 ? (
              <div className="space-y-4">
                {filteredProducts.map(product => (
                  <div 
                    key={product.id}
                    className="flex items-center space-x-4 cursor-pointer hover:bg-gray-50 p-2 rounded-md"
                    onClick={() => handleProductClick(product.categoryId, product.id)}
                  >
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div>
                      <h4 className="font-medium">{product.name}</h4>
                      <p className="text-sm text-gray-500 line-clamp-1">{product.description}</p>
                      <p className="text-agri-green font-medium">₹{product.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-8">No products found</p>
            )
          ) : (
            <p className="text-center text-gray-500 py-8">Type to search for products</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;

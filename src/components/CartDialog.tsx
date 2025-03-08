
import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Minus, Plus, X, Trash2 } from 'lucide-react';

interface CartDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CartDialog: React.FC<CartDialogProps> = ({ open, onOpenChange }) => {
  const { items, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const navigate = useNavigate();
  
  const handleCheckout = () => {
    onOpenChange(false);
    navigate('/checkout');
  };
  
  const handleProductClick = (categoryId: string, productId: string) => {
    navigate(`/product/${categoryId}/${productId}`);
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[85vh] flex flex-col">
        <DialogTitle className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            <span>Shopping Cart ({totalItems})</span>
          </div>
          {items.length > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-red-500 hover:text-red-700 flex items-center gap-1"
              onClick={clearCart}
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear</span>
            </Button>
          )}
        </DialogTitle>
        
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 py-8">
            <ShoppingBag className="w-12 h-12 text-gray-300 mb-4" />
            <p className="text-gray-500 mb-4">Your cart is empty</p>
            <Button onClick={() => {
              onOpenChange(false);
              navigate('/shop');
            }}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="overflow-y-auto flex-1">
              {items.map(item => (
                <div key={item.id} className="py-4 border-b last:border-0">
                  <div className="flex gap-4">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-20 h-20 object-cover rounded-md cursor-pointer"
                      onClick={() => handleProductClick(item.categoryId, item.id)}
                    />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 
                          className="font-medium cursor-pointer hover:text-agri-green"
                          onClick={() => handleProductClick(item.categoryId, item.id)}
                        >
                          {item.name}
                        </h4>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6 text-gray-400 hover:text-red-500"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-agri-green font-medium">₹{item.price.toFixed(2)}</p>
                      
                      <div className="flex items-center mt-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-7 w-7 rounded-full"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="mx-3 w-6 text-center">{item.quantity}</span>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-7 w-7 rounded-full"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <div className="ml-auto font-medium">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t mt-auto pt-4">
              <div className="flex justify-between font-bold text-lg mb-4">
                <span>Total:</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
              <Button 
                className="w-full bg-agri-green hover:bg-agri-dark-green" 
                onClick={handleCheckout}
              >
                Checkout
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CartDialog;

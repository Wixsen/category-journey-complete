
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, CreditCard, MapPin, Truck, Check } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeStep < 4) {
      setActiveStep(activeStep + 1);
    } else {
      // Process order
      toast({
        title: "Order placed successfully!",
        description: "Thank you for shopping with AgriRoad.",
      });
      clearCart();
      navigate('/');
    }
  };

  const goBack = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    } else {
      navigate(-1);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="mb-6">Add some items to your cart before checking out.</p>
          <Button onClick={() => navigate('/shop')} className="bg-agri-green hover:bg-agri-dark-green">
            Continue Shopping
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="flex items-center mb-8">
          <Button variant="ghost" onClick={goBack} className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">Checkout</h1>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center relative">
            <div className="absolute left-0 right-0 top-1/2 h-1 bg-gray-200 -z-10"></div>
            {[1, 2, 3, 4].map(step => (
              <div 
                key={step}
                className={`w-10 h-10 rounded-full flex items-center justify-center z-10
                  ${activeStep >= step ? 'bg-agri-green text-white' : 'bg-gray-200 text-gray-500'}`}
              >
                {activeStep > step ? <Check className="h-5 w-5" /> : step}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span className="text-foreground">Cart</span>
            <span className="text-foreground">Shipping</span>
            <span className="text-foreground">Payment</span>
            <span className="text-foreground">Confirm</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-card shadow-sm p-6 rounded-lg border border-border">
              {activeStep === 1 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold mb-4 text-foreground">Order Summary</h2>
                  <div className="space-y-4 max-h-[400px] overflow-y-auto">
                    {items.map(item => (
                      <div key={item.id} className="flex items-center border-b pb-4">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-16 h-16 object-cover rounded mr-4"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-foreground">{item.name}</h3>
                          <p className="text-muted-foreground">Quantity: {item.quantity}</p>
                          <p className="text-agri-green dark:text-agri-light-green">₹{(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeStep === 2 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold mb-4 flex items-center text-foreground">
                    <MapPin className="mr-2 h-5 w-5 text-agri-green dark:text-agri-light-green" />
                    Shipping Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-1">
                        Full Name
                      </label>
                      <Input 
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                        Email
                      </label>
                      <Input 
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter your email"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1">
                        Phone Number
                      </label>
                      <Input 
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="address" className="block text-sm font-medium text-foreground mb-1">
                        Address
                      </label>
                      <Input 
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        placeholder="Enter your address"
                      />
                    </div>
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-foreground mb-1">
                        City
                      </label>
                      <Input 
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        placeholder="Enter your city"
                      />
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-foreground mb-1">
                        State
                      </label>
                      <Input 
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        placeholder="Enter your state"
                      />
                    </div>
                    <div>
                      <label htmlFor="pincode" className="block text-sm font-medium text-foreground mb-1">
                        Pincode
                      </label>
                      <Input 
                        id="pincode"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        required
                        placeholder="Enter your pincode"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeStep === 3 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold mb-4 flex items-center text-foreground">
                    <CreditCard className="mr-2 h-5 w-5 text-agri-green dark:text-agri-light-green" />
                    Payment Information
                  </h2>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-foreground mb-1">
                        Card Number
                      </label>
                      <Input 
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        required
                        placeholder="XXXX XXXX XXXX XXXX"
                      />
                    </div>
                    <div>
                      <label htmlFor="cardName" className="block text-sm font-medium text-foreground mb-1">
                        Name on Card
                      </label>
                      <Input 
                        id="cardName"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleChange}
                        required
                        placeholder="Enter name on card"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiryDate" className="block text-sm font-medium text-foreground mb-1">
                          Expiry Date
                        </label>
                        <Input 
                          id="expiryDate"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleChange}
                          required
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-foreground mb-1">
                          CVV
                        </label>
                        <Input 
                          id="cvv"
                          name="cvv"
                          type="password"
                          value={formData.cvv}
                          onChange={handleChange}
                          required
                          placeholder="XXX"
                          maxLength={3}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeStep === 4 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold mb-4 text-foreground">Order Confirmation</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-foreground">Shipping Address</h3>
                      <p className="text-muted-foreground">
                        {formData.fullName}<br />
                        {formData.address}<br />
                        {formData.city}, {formData.state} {formData.pincode}<br />
                        {formData.phone}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">Payment Method</h3>
                      <p className="text-muted-foreground">
                        Card ending with {formData.cardNumber.slice(-4)}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">Items</h3>
                      <ul className="list-disc list-inside text-muted-foreground">
                        {items.map(item => (
                          <li key={item.id}>
                            {item.name} x {item.quantity} - ₹{(item.price * item.quantity).toFixed(2)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-6">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={goBack}
                >
                  Back
                </Button>
                <Button 
                  type="submit" 
                  className="bg-agri-green hover:bg-agri-dark-green text-white"
                >
                  {activeStep < 4 ? "Continue" : "Place Order"}
                </Button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card shadow-sm p-6 rounded-lg border border-border">
              <h2 className="text-xl font-semibold mb-4 text-foreground">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">₹{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-foreground">₹50.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="text-foreground">₹{(totalPrice * 0.05).toFixed(2)}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold">
                    <span className="text-foreground">Total</span>
                    <span className="text-agri-green dark:text-agri-light-green">
                      ₹{(totalPrice + 50 + totalPrice * 0.05).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Truck className="h-4 w-4 mr-2 text-agri-green dark:text-agri-light-green" />
                  <span>Free shipping on orders above ₹500</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Check className="h-4 w-4 mr-2 text-agri-green dark:text-agri-light-green" />
                  <span>100% organic produce guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;

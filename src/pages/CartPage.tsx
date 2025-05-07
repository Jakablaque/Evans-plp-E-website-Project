
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useStore } from "@/contexts/StoreContext";

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { state, updateQuantity, removeFromCart, clearCart } = useStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      clearCart();
      navigate("/");
      setIsCheckingOut(false);
    }, 2000);
  };

  if (state.cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center animate-fadeIn">
        <div className="max-w-md mx-auto">
          <div className="mb-6 w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
            <ShoppingCart className="h-10 w-10 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="mb-8 text-gray-600">Looks like you haven't added any products to your cart yet.</p>
          <Button onClick={() => navigate("/products")}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fadeIn">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-4">Cart Items ({state.cart.reduce((sum, item) => sum + item.quantity, 0)})</h2>
              
              {state.cart.map((item) => (
                <div key={item.product.id} className="mb-6">
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-24 sm:h-24 rounded-md overflow-hidden mb-4 sm:mb-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 sm:ml-4">
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <div>
                          <h3 className="font-medium text-lg">{item.product.name}</h3>
                          <p className="text-sm text-gray-600 capitalize">{item.product.category}</p>
                        </div>
                        <div className="mt-2 sm:mt-0 text-right">
                          <p className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
                          <p className="text-sm text-gray-500">${item.product.price.toFixed(2)} each</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="mx-3 w-6 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                  {state.cart.indexOf(item) < state.cart.length - 1 && (
                    <Separator className="my-6" />
                  )}
                </div>
              ))}
            </div>
            <div className="px-6 py-4 bg-gray-50 flex justify-between">
              <Button variant="ghost" onClick={() => navigate("/products")}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </Button>
              <Button variant="outline" onClick={clearCart}>
                Clear Cart
              </Button>
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-24 mt-6 lg:mt-0">
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${state.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>${(state.subtotal * 0.08).toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${(state.subtotal + state.subtotal * 0.08).toFixed(2)}</span>
                </div>
              </div>
              
              <Button 
                className="w-full mt-6 bg-brand hover:bg-brand-dark"
                size="lg"
                onClick={handleCheckout}
                disabled={isCheckingOut}
              >
                {isCheckingOut ? "Processing..." : "Checkout"}
              </Button>
              
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  By completing your purchase you agree to our{" "}
                  <a href="#" className="text-accent hover:underline">
                    Terms of Service
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

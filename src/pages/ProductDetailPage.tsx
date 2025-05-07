
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "@/data/products";
import { Button } from "@/components/ui/button";
import { useStore } from "@/contexts/StoreContext";
import { ShoppingCart, Heart, ChevronLeft, Minus, Plus, Star, Truck, Shield, RefreshCw } from "lucide-react";
import { toast } from "sonner";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useStore();
  const [quantity, setQuantity] = useState(1);
  
  const product = getProductById(parseInt(id || "0"));
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-8">The product you are looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate("/products")}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Button>
      </div>
    );
  }

  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`Added ${quantity} ${quantity === 1 ? 'item' : 'items'} to cart`);
  };
  
  const handleAddToWishlist = () => {
    toast.success("Added to wishlist!");
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fadeIn">
      <Button 
        variant="ghost" 
        onClick={() => navigate(-1)} 
        className="mb-6"
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Product Image */}
          <div className="md:w-1/2 p-6">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          
          {/* Product Details */}
          <div className="md:w-1/2 p-6 md:p-8">
            <div className="mb-2 flex items-center">
              <span className="px-2 py-1 bg-brand-light/10 text-brand-light text-xs font-medium rounded capitalize">
                {product.category}
              </span>
              <div className="ml-4 flex items-center text-amber-500 text-sm">
                <Star className="h-4 w-4 fill-current" />
                <span className="ml-1 font-medium">{product.rating}</span>
                <span className="ml-1 text-gray-500 text-xs">(120 reviews)</span>
              </div>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>
            
            <div className="mb-6">
              <span className="text-3xl font-bold text-brand-dark">${product.price.toFixed(2)}</span>
              {product.inStock ? (
                <span className="ml-4 text-emerald-600 text-sm font-medium">In Stock</span>
              ) : (
                <span className="ml-4 text-red-500 text-sm font-medium">Out of Stock</span>
              )}
            </div>
            
            <p className="text-gray-600 mb-8">{product.description}</p>
            
            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="font-medium mb-2 block">Quantity</label>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="mx-4 w-8 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button 
                className="flex-1 sm:flex-none sm:min-w-36 bg-brand hover:bg-brand-light"
                size="lg"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="flex-1 sm:flex-none"
                onClick={handleAddToWishlist}
              >
                <Heart className="mr-2 h-5 w-5" />
                Wishlist
              </Button>
            </div>
            
            {/* Product Features */}
            <div className="mt-8 border-t pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-start">
                  <Truck className="h-5 w-5 text-accent mr-2 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Free Shipping</h4>
                    <p className="text-sm text-gray-500">On orders over $50</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Shield className="h-5 w-5 text-accent mr-2 mt-0.5" />
                  <div>
                    <h4 className="font-medium">2 Year Warranty</h4>
                    <p className="text-sm text-gray-500">Full coverage</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <RefreshCw className="h-5 w-5 text-accent mr-2 mt-0.5" />
                  <div>
                    <h4 className="font-medium">30-Day Returns</h4>
                    <p className="text-sm text-gray-500">Hassle-free returns</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

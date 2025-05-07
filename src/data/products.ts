
import { Product } from "../models/product";

export const products: Product[] = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    description: "Experience crystal-clear sound with these premium wireless headphones featuring active noise cancellation and 30-hour battery life.",
    price: 12999,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "electronics",
    featured: true,
    inStock: true,
    rating: 4.8
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    description: "Track your fitness goals with this advanced smartwatch featuring heart rate monitoring, sleep tracking, and waterproof design.",
    price: 8999,
    image: "https://images.unsplash.com/photo-1617043786394-f977fa12eddf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "electronics",
    featured: true,
    inStock: true,
    rating: 4.6
  },
  {
    id: 3,
    name: "Ergonomic Office Chair",
    description: "Improve your work-from-home setup with this comfortable ergonomic chair featuring lumbar support and adjustable height.",
    price: 19999,
    image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "furniture",
    featured: false,
    inStock: true,
    rating: 4.5
  },
  {
    id: 4,
    name: "Stainless Steel Water Bottle",
    description: "Stay hydrated with this eco-friendly, vacuum-insulated water bottle that keeps drinks cold for 24 hours or hot for 12 hours.",
    price: 2499,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "accessories",
    featured: false,
    inStock: true,
    rating: 4.7
  },
  {
    id: 5,
    name: "Wireless Charging Pad",
    description: "Charge your compatible devices wirelessly with this sleek, fast-charging pad featuring intelligent temperature control.",
    price: 3499,
    image: "https://images.unsplash.com/photo-1633695254087-abb773313cce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "electronics",
    featured: true,
    inStock: true,
    rating: 4.4
  },
  {
    id: 6,
    name: "Bamboo Cutting Board Set",
    description: "Upgrade your kitchen with this sustainable bamboo cutting board set featuring three different sizes for all your food prep needs.",
    price: 4299,
    image: "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "kitchen",
    featured: false,
    inStock: true,
    rating: 4.8
  },
  {
    id: 7,
    name: "Ultra HD 4K Webcam",
    description: "Look your best during video calls with this crystal-clear 4K webcam featuring auto-focus and low-light correction technology.",
    price: 7999,
    image: "https://images.unsplash.com/photo-1649077688670-6190a1cb85d5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "electronics",
    featured: false,
    inStock: true,
    rating: 4.6
  },
  {
    id: 8,
    name: "Premium Yoga Mat",
    description: "Enhance your yoga practice with this eco-friendly, non-slip yoga mat featuring optimal cushioning and easy-to-clean surface.",
    price: 4999,
    image: "https://images.unsplash.com/photo-1517637382994-f02da38c6728?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "fitness",
    featured: true,
    inStock: true,
    rating: 4.9
  }
];

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getAllCategories = (): string[] => {
  return Array.from(new Set(products.map(product => product.category)));
};

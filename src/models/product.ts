
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  featured: boolean;
  inStock: boolean;
  rating: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

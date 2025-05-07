
import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { CartItem, Product } from "../models/product";
import { toast } from "sonner";

type StoreState = {
  cart: CartItem[];
  subtotal: number;
};

type StoreAction =
  | { type: "ADD_TO_CART"; payload: { product: Product; quantity: number } }
  | { type: "REMOVE_FROM_CART"; payload: { productId: number } }
  | { type: "UPDATE_QUANTITY"; payload: { productId: number; quantity: number } }
  | { type: "CLEAR_CART" };

const initialState: StoreState = {
  cart: [],
  subtotal: 0,
};

const calculateSubtotal = (cart: CartItem[]): number => {
  return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
};

const storeReducer = (state: StoreState, action: StoreAction): StoreState => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const { product, quantity } = action.payload;
      const existingItemIndex = state.cart.findIndex(
        (item) => item.product.id === product.id
      );

      let updatedCart: CartItem[];

      if (existingItemIndex >= 0) {
        updatedCart = [...state.cart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + quantity,
        };
        toast.success(`Updated ${product.name} quantity in cart`);
      } else {
        updatedCart = [...state.cart, { product, quantity }];
        toast.success(`Added ${product.name} to cart`);
      }

      return {
        ...state,
        cart: updatedCart,
        subtotal: calculateSubtotal(updatedCart),
      };
    }

    case "REMOVE_FROM_CART": {
      const updatedCart = state.cart.filter(
        (item) => item.product.id !== action.payload.productId
      );
      toast.info("Item removed from cart");
      
      return {
        ...state,
        cart: updatedCart,
        subtotal: calculateSubtotal(updatedCart),
      };
    }

    case "UPDATE_QUANTITY": {
      const { productId, quantity } = action.payload;
      
      if (quantity <= 0) {
        const updatedCart = state.cart.filter(
          (item) => item.product.id !== productId
        );
        toast.info("Item removed from cart");
        
        return {
          ...state,
          cart: updatedCart,
          subtotal: calculateSubtotal(updatedCart),
        };
      }

      const updatedCart = state.cart.map((item) =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      );

      return {
        ...state,
        cart: updatedCart,
        subtotal: calculateSubtotal(updatedCart),
      };
    }

    case "CLEAR_CART":
      toast.success("Cart cleared");
      return {
        ...state,
        cart: [],
        subtotal: 0,
      };

    default:
      return state;
  }
};

type StoreContextType = {
  state: StoreState;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  const addToCart = (product: Product, quantity: number) => {
    dispatch({ type: "ADD_TO_CART", payload: { product, quantity } });
  };

  const removeFromCart = (productId: number) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { productId } });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <StoreContext.Provider
      value={{
        state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};

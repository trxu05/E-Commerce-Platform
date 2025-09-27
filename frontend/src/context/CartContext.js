import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ITEMS':
      return { ...state, items: action.payload, loading: false };
    case 'ADD_ITEM':
      // Check if item already exists
      const existingItem = state.items.find(item => item.product.id === action.payload.product.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.product.id === action.payload.product.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          )
        };
      } else {
        return { ...state, items: [...state.items, action.payload] };
      }
    case 'UPDATE_ITEM':
      return {
        ...state,
        items: state.items.map(item =>
          item.product.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.product.id !== action.payload)
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

// Mock sample products for cart
const sampleProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    description: "Latest iPhone with advanced camera system and A17 Pro chip",
    price: "999.99",
    imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
    stockQuantity: 50,
    category: { name: "Electronics" }
  },
  {
    id: 3,
    name: "MacBook Pro 16\"",
    description: "Powerful laptop for professionals and creators",
    price: "2499.99",
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
    stockQuantity: 20,
    category: { name: "Electronics" }
  },
  {
    id: 5,
    name: "Nike Air Max 270",
    description: "Comfortable running shoes with modern design",
    price: "150.00",
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    stockQuantity: 100,
    category: { name: "Fashion" }
  }
];

const initialState = {
  items: [
    {
      id: 1,
      product: sampleProducts[0],
      quantity: 1,
      userId: 'demo-user'
    },
    {
      id: 2,
      product: sampleProducts[1],
      quantity: 1,
      userId: 'demo-user'
    },
    {
      id: 3,
      product: sampleProducts[2],
      quantity: 2,
      userId: 'demo-user'
    }
  ],
  loading: false,
  error: null,
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Mock cart functions - no backend calls needed
  const addToCart = async (product, quantity = 1) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const cartItem = {
        id: Date.now() + Math.random(), // Simple ID generation
        product: product,
        quantity: quantity,
        userId: 'demo-user'
      };
      
      dispatch({ type: 'ADD_ITEM', payload: cartItem });
    } catch (error) {
      console.error('Failed to add item to cart:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to add item to cart' });
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 200));
      
      if (quantity <= 0) {
        dispatch({ type: 'REMOVE_ITEM', payload: productId });
      } else {
        dispatch({ type: 'UPDATE_ITEM', payload: { productId, quantity } });
      }
    } catch (error) {
      console.error('Failed to update cart item:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update cart item' });
    }
  };

  const removeFromCart = async (productId) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 200));
      
      dispatch({ type: 'REMOVE_ITEM', payload: productId });
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to remove item from cart' });
    }
  };

  const clearCart = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 200));
      
      dispatch({ type: 'CLEAR_CART' });
    } catch (error) {
      console.error('Failed to clear cart:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to clear cart' });
    }
  };

  const getCartTotal = () => {
    return state.items.reduce((total, item) => {
      return total + (parseFloat(item.product.price) * item.quantity);
    }, 0);
  };

  const getCartItemCount = () => {
    return state.items.reduce((count, item) => count + item.quantity, 0);
  };

  const getCartItemByProductId = (productId) => {
    return state.items.find(item => item.product.id === productId);
  };

  const value = {
    ...state,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartItemCount,
    getCartItemByProductId,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
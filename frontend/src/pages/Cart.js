import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiTrash2, FiPlus, FiMinus, FiArrowRight } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const CartContainer = styled.div`
  min-height: 100vh;
  padding: 2rem 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
`;

const PageSubtitle = styled.p`
  font-size: 1.125rem;
  color: #64748b;
`;

const CartContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CartItems = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
`;

const CartItem = styled(motion.div)`
  display: flex;
  gap: 1rem;
  padding: 1.5rem 0;
  border-bottom: 1px solid #f1f5f9;
  
  &:last-child {
    border-bottom: none;
  }
`;

const ItemImage = styled.div`
  width: 100px;
  height: 100px;
  background: #f8fafc;
  border-radius: 0.5rem;
  overflow: hidden;
  flex-shrink: 0;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ItemDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ItemName = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
`;

const ItemPrice = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
`;

const ItemActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #f8fafc;
  border-radius: 0.5rem;
  padding: 0.25rem;
`;

const QuantityButton = styled.button`
  width: 2rem;
  height: 2rem;
  border: none;
  background: white;
  color: #475569;
  border-radius: 0.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    background: #e2e8f0;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Quantity = styled.span`
  min-width: 2rem;
  text-align: center;
  font-weight: 600;
  color: #1e293b;
`;

const RemoveButton = styled.button`
  padding: 0.5rem;
  background: #fef2f2;
  color: #ef4444;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #fee2e2;
  }
`;

const CartSummary = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  height: fit-content;
  position: sticky;
  top: 100px;
`;

const SummaryTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1.5rem;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  color: #64748b;
`;

const SummaryTotal = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
  margin-bottom: 2rem;
`;

const CheckoutButton = styled(Link)`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 1.125rem;
  text-align: center;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #64748b;
  
  svg {
    font-size: 4rem;
    color: #d1d5db;
    margin-bottom: 1rem;
  }
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #374151;
  }
  
  p {
    margin-bottom: 2rem;
  }
`;

const ShopButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #667eea;
  color: white;
  text-decoration: none;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 0.2s ease;
  
  &:hover {
    background: #5a67d8;
    transform: translateY(-1px);
  }
`;

const Cart = () => {
  const { items, updateQuantity, removeFromCart, getCartTotal, loading } = useCart();

  if (loading) {
    return (
      <CartContainer>
        <Container>
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <div className="spinner" style={{ margin: '0 auto 1rem' }}></div>
            <p>Loading cart...</p>
          </div>
        </Container>
      </CartContainer>
    );
  }

  if (items.length === 0) {
    return (
      <CartContainer>
        <Container>
          <EmptyCart>
            <FiShoppingCart />
            <h3>Your cart is empty</h3>
            <p>Looks like you haven't added any items to your cart yet.</p>
            <ShopButton to="/products">
              Start Shopping
            </ShopButton>
          </EmptyCart>
        </Container>
      </CartContainer>
    );
  }

  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <CartContainer>
      <Container>
        <PageHeader>
          <PageTitle>Shopping Cart</PageTitle>
          <PageSubtitle>Review your items before checkout</PageSubtitle>
        </PageHeader>
        
        <CartContent>
          <CartItems>
            {items.map((item) => (
              <CartItem
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <ItemImage>
                  <ProductImage
                    src={item.product.imageUrl || '/api/placeholder/100/100'}
                    alt={item.product.name}
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f1f5f9"/><text x="50" y="50" text-anchor="middle" fill="%2364748b" font-family="Arial" font-size="12">No Image</text></svg>';
                    }}
                  />
                </ItemImage>
                
                <ItemDetails>
                  <ItemName>{item.product.name}</ItemName>
                  <ItemPrice>${item.product.price}</ItemPrice>
                  
                  <ItemActions>
                    <QuantityControls>
                      <QuantityButton
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <FiMinus />
                      </QuantityButton>
                      <Quantity>{item.quantity}</Quantity>
                      <QuantityButton
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        disabled={item.quantity >= item.product.stockQuantity}
                      >
                        <FiPlus />
                      </QuantityButton>
                    </QuantityControls>
                    
                    <RemoveButton
                      onClick={() => removeFromCart(item.product.id)}
                      title="Remove item"
                    >
                      <FiTrash2 />
                    </RemoveButton>
                  </ItemActions>
                </ItemDetails>
              </CartItem>
            ))}
          </CartItems>
          
          <CartSummary>
            <SummaryTitle>Order Summary</SummaryTitle>
            
            <SummaryRow>
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </SummaryRow>
            
            <SummaryRow>
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
            </SummaryRow>
            
            <SummaryRow>
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </SummaryRow>
            
            <SummaryTotal>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </SummaryTotal>
            
            <CheckoutButton to="/checkout">
              Proceed to Checkout
              <FiArrowRight />
            </CheckoutButton>
          </CartSummary>
        </CartContent>
      </Container>
    </CartContainer>
  );
};

export default Cart;

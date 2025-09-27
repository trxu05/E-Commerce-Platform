import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiHeart, FiStar, FiArrowLeft, FiTruck, FiShield } from 'react-icons/fi';
import { useQuery } from 'react-query';
import { productsAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import LoadingSpinner from '../components/LoadingSpinner';

const ProductDetailContainer = styled.div`
  min-height: 100vh;
  padding: 2rem 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #f8fafc;
  color: #475569;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 2rem;
  
  &:hover {
    background: #e2e8f0;
    transform: translateY(-1px);
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-bottom: 4rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  background: #f8fafc;
  border-radius: 1rem;
  overflow: hidden;
  aspect-ratio: 1;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 1rem;
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
  
  .category {
    color: #667eea;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-size: 0.875rem;
    margin-bottom: 1rem;
  }
  
  .price {
    font-size: 2rem;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 1rem;
  }
  
  .description {
    color: #64748b;
    line-height: 1.6;
    margin-bottom: 2rem;
    font-size: 1.125rem;
  }
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Stars = styled.div`
  display: flex;
  gap: 0.25rem;
`;

const Star = styled(FiStar)`
  color: ${props => props.filled ? '#fbbf24' : '#d1d5db'};
  width: 1.25rem;
  height: 1.25rem;
`;

const RatingText = styled.span`
  color: #64748b;
  font-weight: 500;
`;

const StockStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  color: ${props => props.inStock ? '#10b981' : '#ef4444'};
  font-weight: 500;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const AddToCartButton = styled.button`
  flex: 1;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 1.125rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const WishlistButton = styled.button`
  padding: 1rem;
  background: #f8fafc;
  color: #475569;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: #e2e8f0;
    transform: translateY(-1px);
  }
`;

const Features = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
`;

const Feature = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 0.5rem;
  
  svg {
    color: #667eea;
    width: 1.25rem;
    height: 1.25rem;
  }
  
  span {
    color: #475569;
    font-weight: 500;
  }
`;

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, getCartItemByProductId } = useCart();
  
  const { data: product, isLoading, isError } = useQuery(
    ['product', id],
    () => productsAPI.getById(id),
    {
      enabled: !!id,
    }
  );

  if (isLoading) {
    return <LoadingSpinner text="Loading product details..." />;
  }

  if (isError || !product?.data) {
    return (
      <ProductDetailContainer>
        <Container>
          <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <h2>Product not found</h2>
            <p>The product you're looking for doesn't exist or has been removed.</p>
            <button 
              onClick={() => navigate('/products')}
              style={{ 
                marginTop: '1rem',
                padding: '0.75rem 1.5rem',
                background: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer'
              }}
            >
              Back to Products
            </button>
          </div>
        </Container>
      </ProductDetailContainer>
    );
  }

  const productData = product.data;
  const cartItem = getCartItemByProductId(productData.id);
  const isInCart = !!cartItem;
  const isInStock = productData.stockQuantity > 0;

  const handleAddToCart = () => {
    if (isInStock) {
      addToCart(productData.id, 1);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star key={i} filled={i <= rating} />
      );
    }
    return stars;
  };

  return (
    <ProductDetailContainer>
      <Container>
        <BackButton onClick={() => navigate(-1)}>
          <FiArrowLeft />
          Back
        </BackButton>
        
        <ProductGrid>
          <ImageContainer>
            <ProductImage
              src={productData.imageUrl || '/api/placeholder/500/500'}
              alt={productData.name}
              onError={(e) => {
                e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 500 500"><rect width="500" height="500" fill="%23f1f5f9"/><text x="250" y="250" text-anchor="middle" fill="%2364748b" font-family="Arial" font-size="18">No Image</text></svg>';
              }}
            />
          </ImageContainer>
          
          <ProductInfo>
            <div className="category">{productData.category?.name || 'Uncategorized'}</div>
            <h1>{productData.name}</h1>
            
            <Rating>
              <Stars>
                {renderStars(4.5)}
              </Stars>
              <RatingText>({Math.floor(Math.random() * 100) + 10} reviews)</RatingText>
            </Rating>
            
            <div className="price">${productData.price}</div>
            
            <StockStatus inStock={isInStock}>
              {isInStock ? `${productData.stockQuantity} in stock` : 'Out of stock'}
            </StockStatus>
            
            <p className="description">{productData.description}</p>
            
            <ActionButtons>
              <AddToCartButton
                onClick={handleAddToCart}
                disabled={!isInStock || isInCart}
              >
                <FiShoppingCart />
                {isInCart ? 'In Cart' : isInStock ? 'Add to Cart' : 'Out of Stock'}
              </AddToCartButton>
              <WishlistButton>
                <FiHeart />
              </WishlistButton>
            </ActionButtons>
            
            <Features>
              <Feature>
                <FiTruck />
                <span>Free Shipping</span>
              </Feature>
              <Feature>
                <FiShield />
                <span>Secure Payment</span>
              </Feature>
              <Feature>
                <FiShield />
                <span>30-Day Returns</span>
              </Feature>
            </Features>
          </ProductInfo>
        </ProductGrid>
      </Container>
    </ProductDetailContainer>
  );
};

export default ProductDetail;

import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiHeart, FiEye, FiStar } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const CardContainer = styled(motion.div)`
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
  position: relative;
  group: hover;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: #f8fafc;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  ${CardContainer}:hover & {
    transform: scale(1.05);
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  ${CardContainer}:hover & {
    opacity: 1;
  }
`;

const ActionButton = styled.button`
  width: 3rem;
  height: 3rem;
  border: none;
  border-radius: 50%;
  background: white;
  color: #475569;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #667eea;
    color: white;
    transform: scale(1.1);
  }
`;

const Badge = styled.div`
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  background: ${props => props.type === 'sale' ? '#ef4444' : '#10b981'};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  z-index: 1;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const Category = styled.div`
  font-size: 0.75rem;
  color: #667eea;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
`;

const ProductName = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ProductDescription = styled.p`
  font-size: 0.875rem;
  color: #64748b;
  line-height: 1.5;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Stars = styled.div`
  display: flex;
  gap: 0.125rem;
`;

const Star = styled(FiStar)`
  color: ${props => props.filled ? '#fbbf24' : '#d1d5db'};
  width: 1rem;
  height: 1rem;
`;

const RatingText = styled.span`
  font-size: 0.875rem;
  color: #64748b;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const Price = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
`;

const OriginalPrice = styled.span`
  font-size: 1rem;
  color: #94a3b8;
  text-decoration: line-through;
  margin-left: 0.5rem;
`;

const StockStatus = styled.div`
  font-size: 0.75rem;
  color: ${props => props.inStock ? '#10b981' : '#ef4444'};
  font-weight: 500;
`;

const AddToCartButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const ProductCard = ({ product, index = 0 }) => {
  const { addToCart, getCartItemByProductId } = useCart();
  const cartItem = getCartItemByProductId(product.id);
  const isInCart = !!cartItem;
  const isInStock = product.stockQuantity > 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInStock) {
      addToCart(product, 1);
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

  const discount = product.originalPrice ? 
    Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <CardContainer
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Link to={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
          <ImageContainer>
            <ProductImage
              src={product.imageUrl || '/api/placeholder/300/200'}
              alt={product.name}
              onError={(e) => {
                e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><rect width="300" height="200" fill="%23f1f5f9"/><text x="150" y="100" text-anchor="middle" fill="%2364748b" font-family="Arial" font-size="14">No Image</text></svg>';
              }}
            />
            <ImageOverlay>
              <ActionButton title="Quick View">
                <FiEye />
              </ActionButton>
              <ActionButton title="Add to Wishlist">
                <FiHeart />
              </ActionButton>
            </ImageOverlay>
            {discount > 0 && (
              <Badge type="sale">-{discount}%</Badge>
            )}
            {!isInStock && (
              <Badge type="out">Out of Stock</Badge>
            )}
          </ImageContainer>
        </Link>
        
        <CardContent>
          <Category>{product.category?.name || 'Uncategorized'}</Category>
          <Link to={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
            <ProductName>{product.name}</ProductName>
          </Link>
          <ProductDescription>{product.description}</ProductDescription>
          
          <Rating>
            <Stars>
              {renderStars(4.5)}
            </Stars>
            <RatingText>({Math.floor(Math.random() * 100) + 10})</RatingText>
          </Rating>
          
          <PriceContainer>
            <div>
              <Price>${product.price}</Price>
              {product.originalPrice && (
                <OriginalPrice>${product.originalPrice}</OriginalPrice>
              )}
            </div>
            <StockStatus inStock={isInStock}>
              {isInStock ? `${product.stockQuantity} in stock` : 'Out of stock'}
            </StockStatus>
          </PriceContainer>
          
          <AddToCartButton
            onClick={handleAddToCart}
            disabled={!isInStock || isInCart}
          >
            <FiShoppingCart />
            {isInCart ? 'In Cart' : isInStock ? 'Add to Cart' : 'Out of Stock'}
          </AddToCartButton>
        </CardContent>
      </CardContainer>
    </motion.div>
  );
};

export default ProductCard;

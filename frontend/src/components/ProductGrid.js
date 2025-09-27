import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { productsAPI } from '../services/api';
import ProductCard from './ProductCard';
import LoadingSpinner from './LoadingSpinner';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #64748b;
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #374151;
  }
  
  p {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
`;

const ErrorState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #ef4444;
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  
  p {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
`;

const RetryButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #5a67d8;
    transform: translateY(-1px);
  }
`;

const ProductGrid = ({ 
  categoryId, 
  searchQuery, 
  minPrice, 
  maxPrice, 
  sortBy = 'name',
  page = 0,
  size = 12,
  limit,
  showPagination = false 
}) => {
  const { data, isLoading, isError, error, refetch } = useQuery(
    ['products', { categoryId, searchQuery }],
    () => {
      if (searchQuery) {
        return productsAPI.search(searchQuery);
      } else if (categoryId) {
        return productsAPI.getByCategory(categoryId);
      } else {
        return productsAPI.getAll();
      }
    },
    {
      keepPreviousData: true,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <ErrorState>
        <h3>Oops! Something went wrong</h3>
        <p>{error?.message || 'Failed to load products. Please try again.'}</p>
        <RetryButton onClick={() => refetch()}>
          Try Again
        </RetryButton>
      </ErrorState>
    );
  }

  const products = data?.data || [];
  const limitedProducts = limit ? products.slice(0, limit) : products;

  if (limitedProducts.length === 0) {
    return (
      <EmptyState>
        <h3>No products found</h3>
        <p>
          {searchQuery 
            ? `No products found for "${searchQuery}". Try a different search term.`
            : 'No products available at the moment. Please check back later.'
          }
        </p>
      </EmptyState>
    );
  }

  return (
    <GridContainer>
      {limitedProducts.map((product, index) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          index={index}
        />
      ))}
    </GridContainer>
  );
};

export default ProductGrid;

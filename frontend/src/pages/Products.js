import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import ProductGrid from '../components/ProductGrid';
import LoadingSpinner from '../components/LoadingSpinner';

const ProductsContainer = styled.div`
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
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const PageSubtitle = styled.p`
  font-size: 1.125rem;
  color: #64748b;
  max-width: 600px;
  margin: 0 auto;
`;

const Products = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');
  const categoryId = searchParams.get('category');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');

  return (
    <ProductsContainer>
      <Container>
        <PageHeader>
          <PageTitle>
            {searchQuery ? `Search Results for "${searchQuery}"` : 'Our Products'}
          </PageTitle>
          <PageSubtitle>
            {searchQuery 
              ? `Found products matching your search criteria`
              : 'Discover our wide range of high-quality products at unbeatable prices'
            }
          </PageSubtitle>
        </PageHeader>
        
        <ProductGrid
          searchQuery={searchQuery}
          categoryId={categoryId ? parseInt(categoryId) : undefined}
          minPrice={minPrice ? parseFloat(minPrice) : undefined}
          maxPrice={maxPrice ? parseFloat(maxPrice) : undefined}
          showPagination={true}
        />
      </Container>
    </ProductsContainer>
  );
};

export default Products;

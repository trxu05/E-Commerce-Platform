import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useQuery } from 'react-query';
import { categoriesAPI } from '../services/api';
import LoadingSpinner from './LoadingSpinner';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
  }
`;

const CategoryCard = styled(motion.div)`
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }
`;

const CategoryImage = styled.div`
  width: 100%;
  height: 150px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    opacity: 0.3;
  }
`;

const CategoryIcon = styled.div`
  font-size: 3rem;
  color: white;
  z-index: 1;
  position: relative;
`;

const CategoryContent = styled.div`
  padding: 1.5rem;
  text-align: center;
`;

const CategoryName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

const CategoryDescription = styled.p`
  font-size: 0.875rem;
  color: #64748b;
  line-height: 1.5;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CategoryLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #f8fafc;
  color: #667eea;
  text-decoration: none;
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  
  &:hover {
    background: #667eea;
    color: white;
    transform: translateY(-1px);
  }
`;

const CategoryGrid = () => {
  const { data: categories, isLoading, isError } = useQuery(
    'categories',
    () => categoriesAPI.getAll(),
    {
      staleTime: 10 * 60 * 1000, // 10 minutes
    }
  );

  if (isLoading) {
    return <LoadingSpinner text="Loading categories..." />;
  }

  if (isError) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: '#ef4444' }}>
        <h3>Failed to load categories</h3>
        <p>Please try again later.</p>
      </div>
    );
  }

  // Mock categories if API fails
  const mockCategories = [
    {
      id: 1,
      name: 'Electronics',
      description: 'Latest gadgets and electronic devices',
      imageUrl: null
    },
    {
      id: 2,
      name: 'Fashion',
      description: 'Trendy clothing and accessories',
      imageUrl: null
    },
    {
      id: 3,
      name: 'Home & Garden',
      description: 'Everything for your home and garden',
      imageUrl: null
    },
    {
      id: 4,
      name: 'Sports',
      description: 'Sports equipment and fitness gear',
      imageUrl: null
    },
    {
      id: 5,
      name: 'Books',
      description: 'Books, magazines, and educational materials',
      imageUrl: null
    },
    {
      id: 6,
      name: 'Beauty',
      description: 'Beauty products and personal care',
      imageUrl: null
    }
  ];

  const categoriesToShow = categories?.data || mockCategories;

  return (
    <GridContainer>
      {categoriesToShow.map((category, index) => (
        <CategoryCard
          key={category.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
        >
          <CategoryImage>
            <CategoryIcon>
              {getCategoryIcon(category.name)}
            </CategoryIcon>
          </CategoryImage>
          <CategoryContent>
            <CategoryName>{category.name}</CategoryName>
            <CategoryDescription>
              {category.description || 'Explore our amazing collection'}
            </CategoryDescription>
            <CategoryLink to={`/products?category=${category.id}`}>
              Shop Now
            </CategoryLink>
          </CategoryContent>
        </CategoryCard>
      ))}
    </GridContainer>
  );
};

const getCategoryIcon = (categoryName) => {
  const icons = {
    'Electronics': '📱',
    'Fashion': '👗',
    'Home & Garden': '🏠',
    'Sports': '⚽',
    'Books': '📚',
    'Beauty': '💄',
    'Automotive': '🚗',
    'Toys': '🧸',
    'Health': '💊',
    'Food': '🍎'
  };
  return icons[categoryName] || '🛍️';
};

export default CategoryGrid;

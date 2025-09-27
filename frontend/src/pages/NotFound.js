import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiHome, FiArrowLeft } from 'react-icons/fi';

const NotFoundContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const NotFoundContent = styled(motion.div)`
  text-align: center;
  max-width: 500px;
`;

const NotFoundCode = styled.h1`
  font-size: 8rem;
  font-weight: 900;
  color: #667eea;
  margin-bottom: 1rem;
  line-height: 1;
  
  @media (max-width: 768px) {
    font-size: 6rem;
  }
`;

const NotFoundTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const NotFoundText = styled.p`
  font-size: 1.125rem;
  color: #64748b;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const HomeButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  }
`;

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #f8fafc;
  color: #475569;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  
  &:hover {
    background: #e2e8f0;
    transform: translateY(-1px);
  }
`;

const NotFound = () => {
  return (
    <NotFoundContainer>
      <NotFoundContent
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <NotFoundCode>404</NotFoundCode>
        <NotFoundTitle>Page Not Found</NotFoundTitle>
        <NotFoundText>
          Sorry, the page you are looking for doesn't exist or has been moved.
          Let's get you back on track!
        </NotFoundText>
        
        <ButtonGroup>
          <HomeButton to="/">
            <FiHome />
            Go Home
          </HomeButton>
          <BackButton onClick={() => window.history.back()}>
            <FiArrowLeft />
            Go Back
          </BackButton>
        </ButtonGroup>
      </NotFoundContent>
    </NotFoundContainer>
  );
};

export default NotFound;

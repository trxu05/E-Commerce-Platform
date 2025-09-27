import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiShoppingBag, FiTruck, FiShield, FiHeadphones } from 'react-icons/fi';
import ProductGrid from '../components/ProductGrid';
import CategoryGrid from '../components/CategoryGrid';
import Hero from '../components/Hero';
import Features from '../components/Features';

const HomeContainer = styled.div`
  min-height: 100vh;
`;

const Section = styled.section`
  padding: 4rem 0;
  
  &:nth-child(even) {
    background: #f8fafc;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  color: #1e293b;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.125rem;
  color: #64748b;
  text-align: center;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin: 4rem 0;
`;

const StatCard = styled(motion.div)`
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
`;

const StatIcon = styled.div`
  width: 4rem;
  height: 4rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: white;
  font-size: 1.5rem;
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #64748b;
  font-weight: 500;
`;

const Home = () => {
  const stats = [
    {
      icon: <FiShoppingBag />,
      number: '10K+',
      label: 'Products Available'
    },
    {
      icon: <FiTruck />,
      number: '50K+',
      label: 'Orders Delivered'
    },
    {
      icon: <FiShield />,
      number: '99.9%',
      label: 'Customer Satisfaction'
    },
    {
      icon: <FiHeadphones />,
      number: '24/7',
      label: 'Customer Support'
    }
  ];

  return (
    <HomeContainer>
      <Hero />
      
      <Section>
        <Container>
          <SectionTitle>Shop by Category</SectionTitle>
          <SectionSubtitle>
            Discover our wide range of product categories, each carefully curated to meet your needs
          </SectionSubtitle>
          <CategoryGrid />
        </Container>
      </Section>
      
      <Section>
        <Container>
          <SectionTitle>Featured Products</SectionTitle>
          <SectionSubtitle>
            Check out our handpicked selection of trending and popular products
          </SectionSubtitle>
          <ProductGrid limit={8} />
        </Container>
      </Section>
      
      <Section>
        <Container>
          <SectionTitle>Why Choose Us?</SectionTitle>
          <SectionSubtitle>
            We're committed to providing the best shopping experience with these key features
          </SectionSubtitle>
          <Features />
        </Container>
      </Section>
      
      <Section>
        <Container>
          <SectionTitle>Our Impact</SectionTitle>
          <SectionSubtitle>
            Numbers that speak for our commitment to excellence
          </SectionSubtitle>
          <StatsContainer>
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <StatIcon>{stat.icon}</StatIcon>
                <StatNumber>{stat.number}</StatNumber>
                <StatLabel>{stat.label}</StatLabel>
              </StatCard>
            ))}
          </StatsContainer>
        </Container>
      </Section>
    </HomeContainer>
  );
};

export default Home;

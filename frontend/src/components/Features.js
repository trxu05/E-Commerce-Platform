import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiTruck, FiShield, FiHeadphones, FiRefreshCw, FiCreditCard, FiAward } from 'react-icons/fi';

const FeaturesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const FeatureCard = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }
`;

const FeatureIcon = styled.div`
  width: 4rem;
  height: 4rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
  font-size: 1.5rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
  color: #64748b;
  line-height: 1.6;
  font-size: 0.875rem;
`;

const Features = () => {
  const features = [
    {
      icon: <FiTruck />,
      title: 'Free Shipping',
      description: 'Free shipping on orders over $50. Fast and reliable delivery to your doorstep.'
    },
    {
      icon: <FiShield />,
      title: 'Secure Payment',
      description: 'Your payment information is safe and secure with our encrypted checkout process.'
    },
    {
      icon: <FiHeadphones />,
      title: '24/7 Support',
      description: 'Our customer support team is available around the clock to help you with any questions.'
    },
    {
      icon: <FiRefreshCw />,
      title: 'Easy Returns',
      description: 'Not satisfied? Return your purchase within 30 days for a full refund, no questions asked.'
    },
    {
      icon: <FiCreditCard />,
      title: 'Multiple Payment',
      description: 'Pay with credit card, PayPal, or other secure payment methods that suit your needs.'
    },
    {
      icon: <FiAward />,
      title: 'Quality Guarantee',
      description: 'We guarantee the quality of all our products. If you\'re not happy, we\'ll make it right.'
    }
  ];

  return (
    <FeaturesContainer>
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
        >
          <FeatureIcon>{feature.icon}</FeatureIcon>
          <FeatureTitle>{feature.title}</FeatureTitle>
          <FeatureDescription>{feature.description}</FeatureDescription>
        </FeatureCard>
      ))}
    </FeaturesContainer>
  );
};

export default Features;

import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiShoppingCart, FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi';

const FooterContainer = styled.footer`
  background: #1e293b;
  color: white;
  padding: 3rem 0 1rem;
  margin-top: 4rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const FooterSection = styled.div`
  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #f1f5f9;
  }
  
  p {
    color: #94a3b8;
    line-height: 1.6;
    margin-bottom: 1rem;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FooterLink = styled(Link)`
  color: #94a3b8;
  text-decoration: none;
  transition: color 0.2s ease;
  
  &:hover {
    color: #667eea;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  color: #94a3b8;
  
  svg {
    width: 1.25rem;
    height: 1.25rem;
    color: #667eea;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background: #334155;
  color: #94a3b8;
  border-radius: 50%;
  text-decoration: none;
  transition: all 0.2s ease;
  
  &:hover {
    background: #667eea;
    color: white;
    transform: translateY(-2px);
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid #334155;
  padding-top: 1rem;
  text-align: center;
  color: #94a3b8;
  font-size: 0.875rem;
`;

const NewsletterForm = styled.form`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const NewsletterInput = styled.input`
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #334155;
  border-radius: 0.5rem;
  background: #334155;
  color: white;
  font-size: 0.875rem;
  
  &::placeholder {
    color: #94a3b8;
  }
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const NewsletterButton = styled.button`
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

const Footer = () => {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
  };

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>
            <FiShoppingCart style={{ marginRight: '0.5rem' }} />
            E-Shop
          </h3>
          <p>
            Your one-stop destination for quality products at unbeatable prices. 
            We're committed to providing exceptional shopping experiences with 
            fast delivery and excellent customer service.
          </p>
          <SocialLinks>
            <SocialLink href="#" aria-label="Facebook">
              <FiFacebook />
            </SocialLink>
            <SocialLink href="#" aria-label="Twitter">
              <FiTwitter />
            </SocialLink>
            <SocialLink href="#" aria-label="Instagram">
              <FiInstagram />
            </SocialLink>
          </SocialLinks>
        </FooterSection>
        
        <FooterSection>
          <h3>Quick Links</h3>
          <FooterLinks>
            <FooterLink to="/">Home</FooterLink>
            <FooterLink to="/products">Products</FooterLink>
            <FooterLink to="/about">About Us</FooterLink>
            <FooterLink to="/contact">Contact</FooterLink>
            <FooterLink to="/faq">FAQ</FooterLink>
            <FooterLink to="/shipping">Shipping Info</FooterLink>
          </FooterLinks>
        </FooterSection>
        
        <FooterSection>
          <h3>Customer Service</h3>
          <FooterLinks>
            <FooterLink to="/orders">Order History</FooterLink>
            <FooterLink to="/returns">Returns</FooterLink>
            <FooterLink to="/warranty">Warranty</FooterLink>
            <FooterLink to="/support">Support</FooterLink>
            <FooterLink to="/privacy">Privacy Policy</FooterLink>
            <FooterLink to="/terms">Terms of Service</FooterLink>
          </FooterLinks>
        </FooterSection>
        
        <FooterSection>
          <h3>Contact Info</h3>
          <ContactInfo>
            <FiMapPin />
            <span>123 Commerce Street, Business City, BC 12345</span>
          </ContactInfo>
          <ContactInfo>
            <FiPhone />
            <span>+1 (555) 123-4567</span>
          </ContactInfo>
          <ContactInfo>
            <FiMail />
            <span>support@eshop.com</span>
          </ContactInfo>
          
          <h3 style={{ marginTop: '1.5rem' }}>Newsletter</h3>
          <p>Subscribe to get updates on new products and offers!</p>
          <NewsletterForm onSubmit={handleNewsletterSubmit}>
            <NewsletterInput
              type="email"
              placeholder="Enter your email"
              required
            />
            <NewsletterButton type="submit">
              Subscribe
            </NewsletterButton>
          </NewsletterForm>
        </FooterSection>
      </FooterContent>
      
      <FooterBottom>
        <p>&copy; 2024 E-Shop. All rights reserved. | Built with React & Spring Boot</p>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;

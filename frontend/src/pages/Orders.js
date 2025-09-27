import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiPackage, FiTruck, FiCheckCircle, FiClock } from 'react-icons/fi';

const OrdersContainer = styled.div`
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

const OrdersGrid = styled.div`
  display: grid;
  gap: 2rem;
`;

const OrderCard = styled(motion.div)`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #f1f5f9;
`;

const OrderId = styled.div`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
`;

const OrderDate = styled.div`
  color: #64748b;
  font-size: 0.875rem;
`;

const OrderStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  background: ${props => {
    switch(props.status) {
      case 'DELIVERED': return '#dcfce7';
      case 'SHIPPED': return '#dbeafe';
      case 'CONFIRMED': return '#fef3c7';
      case 'PENDING': return '#f3f4f6';
      default: return '#f3f4f6';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'DELIVERED': return '#166534';
      case 'SHIPPED': return '#1e40af';
      case 'CONFIRMED': return '#92400e';
      case 'PENDING': return '#374151';
      default: return '#374151';
    }
  }};
`;

const OrderItems = styled.div`
  margin-bottom: 1.5rem;
`;

const OrderItem = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #f8fafc;
  
  &:last-child {
    border-bottom: none;
  }
`;

const ItemImage = styled.div`
  width: 60px;
  height: 60px;
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
`;

const ItemName = styled.div`
  font-weight: 500;
  color: #1e293b;
  margin-bottom: 0.25rem;
`;

const ItemQuantity = styled.div`
  color: #64748b;
  font-size: 0.875rem;
`;

const ItemPrice = styled.div`
  font-weight: 600;
  color: #1e293b;
`;

const OrderTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
`;

const EmptyState = styled.div`
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

const Orders = () => {
  // Mock orders data
  const orders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'DELIVERED',
      total: 299.99,
      items: [
        {
          id: 1,
          name: 'Wireless Headphones',
          quantity: 1,
          price: 299.99,
          image: '/api/placeholder/60/60'
        }
      ]
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      status: 'SHIPPED',
      total: 149.99,
      items: [
        {
          id: 2,
          name: 'Smart Watch',
          quantity: 1,
          price: 149.99,
          image: '/api/placeholder/60/60'
        }
      ]
    },
    {
      id: 'ORD-003',
      date: '2024-01-05',
      status: 'CONFIRMED',
      total: 89.99,
      items: [
        {
          id: 3,
          name: 'Bluetooth Speaker',
          quantity: 1,
          price: 89.99,
          image: '/api/placeholder/60/60'
        }
      ]
    }
  ];

  const getStatusIcon = (status) => {
    switch(status) {
      case 'DELIVERED': return <FiCheckCircle />;
      case 'SHIPPED': return <FiTruck />;
      case 'CONFIRMED': return <FiPackage />;
      case 'PENDING': return <FiClock />;
      default: return <FiClock />;
    }
  };

  if (orders.length === 0) {
    return (
      <OrdersContainer>
        <Container>
          <EmptyState>
            <FiPackage />
            <h3>No orders yet</h3>
            <p>You haven't placed any orders yet. Start shopping to see your orders here.</p>
          </EmptyState>
        </Container>
      </OrdersContainer>
    );
  }

  return (
    <OrdersContainer>
      <Container>
        <PageHeader>
          <PageTitle>Order History</PageTitle>
          <PageSubtitle>Track your orders and view order details</PageSubtitle>
        </PageHeader>
        
        <OrdersGrid>
          {orders.map((order, index) => (
            <OrderCard
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <OrderHeader>
                <div>
                  <OrderId>Order #{order.id}</OrderId>
                  <OrderDate>{new Date(order.date).toLocaleDateString()}</OrderDate>
                </div>
                <OrderStatus status={order.status}>
                  {getStatusIcon(order.status)}
                  {order.status}
                </OrderStatus>
              </OrderHeader>
              
              <OrderItems>
                {order.items.map((item) => (
                  <OrderItem key={item.id}>
                    <ItemImage>
                      <ProductImage
                        src={item.image}
                        alt={item.name}
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><rect width="60" height="60" fill="%23f1f5f9"/><text x="30" y="30" text-anchor="middle" fill="%2364748b" font-family="Arial" font-size="10">No Image</text></svg>';
                        }}
                      />
                    </ItemImage>
                    <ItemDetails>
                      <ItemName>{item.name}</ItemName>
                      <ItemQuantity>Qty: {item.quantity}</ItemQuantity>
                    </ItemDetails>
                    <ItemPrice>${item.price}</ItemPrice>
                  </OrderItem>
                ))}
              </OrderItems>
              
              <OrderTotal>
                <span>Total</span>
                <span>${order.total}</span>
              </OrderTotal>
            </OrderCard>
          ))}
        </OrdersGrid>
      </Container>
    </OrdersContainer>
  );
};

export default Orders;

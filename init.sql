-- Initialize E-Commerce Database
-- This script runs when the PostgreSQL container starts for the first time

-- Create database if it doesn't exist
SELECT 'CREATE DATABASE ecommerce_db'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'ecommerce_db')\gexec

-- Connect to the database
\c ecommerce_db;

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(500),
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL CHECK (price > 0),
    image_url VARCHAR(255),
    stock_quantity INTEGER NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
    category_id BIGINT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create cart_items table
CREATE TABLE IF NOT EXISTS cart_items (
    id BIGSERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, product_id)
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
    id BIGSERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL CHECK (total_amount > 0),
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED')),
    shipping_address TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10,2) NOT NULL CHECK (unit_price > 0),
    total_price DECIMAL(10,2) NOT NULL CHECK (total_price > 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_name ON products(name);
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);
CREATE INDEX IF NOT EXISTS idx_products_stock ON products(stock_quantity);
CREATE INDEX IF NOT EXISTS idx_cart_items_user_id ON cart_items(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);

-- Insert sample categories
INSERT INTO categories (name, description, image_url) VALUES
('Electronics', 'Electronic devices and gadgets', 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400'),
('Fashion', 'Clothing and accessories', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400'),
('Home & Garden', 'Home improvement and garden supplies', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400'),
('Sports', 'Sports equipment and fitness gear', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400'),
('Books', 'Books, magazines, and educational materials', 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400'),
('Beauty', 'Beauty products and personal care', 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400')
ON CONFLICT (name) DO NOTHING;

-- Insert sample products
INSERT INTO products (name, description, price, image_url, stock_quantity, category_id) VALUES
('iPhone 15 Pro', 'Latest iPhone with advanced camera system and A17 Pro chip', 999.99, 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400', 50, 1),
('Samsung Galaxy S24', 'Premium Android smartphone with AI features', 899.99, 'https://images.unsplash.com/photo-1511707171631-9ad2b117d555?w=400', 30, 1),
('MacBook Pro 16"', 'Powerful laptop for professionals and creators', 2499.99, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400', 20, 1),
('Sony WH-1000XM5', 'Industry-leading noise canceling headphones', 399.99, 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400', 75, 1),
('Nike Air Max 270', 'Comfortable running shoes with modern design', 150.00, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', 100, 2),
('Adidas Ultraboost 22', 'High-performance running shoes', 180.00, 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400', 80, 2),
('Levi''s 501 Jeans', 'Classic straight-fit jeans', 89.99, 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400', 60, 2),
('Patagonia Fleece Jacket', 'Warm and sustainable fleece jacket', 129.99, 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400', 40, 2),
('Dyson V15 Detect', 'Cordless vacuum with laser dust detection', 749.99, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', 25, 3),
('KitchenAid Stand Mixer', 'Professional-grade stand mixer', 329.99, 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', 15, 3),
('Nintendo Switch', 'Hybrid gaming console', 299.99, 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400', 35, 1),
('PlayStation 5', 'Next-generation gaming console', 499.99, 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400', 10, 1),
('The Great Gatsby', 'Classic American novel by F. Scott Fitzgerald', 12.99, 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400', 200, 5),
('Atomic Habits', 'Self-help book by James Clear', 16.99, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', 150, 5),
('L''Oréal Paris Foundation', 'Long-lasting liquid foundation', 24.99, 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400', 80, 6),
('Nike Basketball', 'Official size and weight basketball', 29.99, 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400', 50, 4),
('Yoga Mat Premium', 'Non-slip yoga mat for all skill levels', 39.99, 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400', 90, 4),
('Garden Tool Set', 'Complete set of gardening tools', 79.99, 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400', 30, 3)
ON CONFLICT DO NOTHING;

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update the updated_at column
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cart_items_updated_at BEFORE UPDATE ON cart_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Grant permissions
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO ecommerce_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO ecommerce_user;

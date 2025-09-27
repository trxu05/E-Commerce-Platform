package com.ecommerce.config;

import com.ecommerce.entity.Category;
import com.ecommerce.entity.Product;
import com.ecommerce.repository.CategoryRepository;
import com.ecommerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public void run(String... args) throws Exception {
        // Create categories
        List<Category> categories = Arrays.asList(
            new Category("Electronics", "Electronic devices and gadgets", "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400"),
            new Category("Fashion", "Clothing and accessories", "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400"),
            new Category("Home & Garden", "Home improvement and garden supplies", "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400"),
            new Category("Sports", "Sports equipment and fitness gear", "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400"),
            new Category("Books", "Books, magazines, and educational materials", "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400"),
            new Category("Beauty", "Beauty products and personal care", "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400")
        );

        categoryRepository.saveAll(categories);

        // Create products
        List<Product> products = Arrays.asList(
            new Product("iPhone 15 Pro", "Latest iPhone with advanced camera system and A17 Pro chip", 
                new BigDecimal("999.99"), "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400", 50, categories.get(0)),
            new Product("Samsung Galaxy S24", "Premium Android smartphone with AI features", 
                new BigDecimal("899.99"), "https://images.unsplash.com/photo-1511707171631-9ad2b117d555?w=400", 30, categories.get(0)),
            new Product("MacBook Pro 16\"", "Powerful laptop for professionals and creators", 
                new BigDecimal("2499.99"), "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400", 20, categories.get(0)),
            new Product("Sony WH-1000XM5", "Industry-leading noise canceling headphones", 
                new BigDecimal("399.99"), "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400", 75, categories.get(0)),
            new Product("Nike Air Max 270", "Comfortable running shoes with modern design", 
                new BigDecimal("150.00"), "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400", 100, categories.get(1)),
            new Product("Adidas Ultraboost 22", "High-performance running shoes", 
                new BigDecimal("180.00"), "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400", 80, categories.get(1)),
            new Product("Levi's 501 Jeans", "Classic straight-fit jeans", 
                new BigDecimal("89.99"), "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400", 60, categories.get(1)),
            new Product("Patagonia Fleece Jacket", "Warm and sustainable fleece jacket", 
                new BigDecimal("129.99"), "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400", 40, categories.get(1)),
            new Product("Dyson V15 Detect", "Cordless vacuum with laser dust detection", 
                new BigDecimal("749.99"), "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400", 25, categories.get(2)),
            new Product("KitchenAid Stand Mixer", "Professional-grade stand mixer", 
                new BigDecimal("329.99"), "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400", 15, categories.get(2))
        );

        productRepository.saveAll(products);
    }
}

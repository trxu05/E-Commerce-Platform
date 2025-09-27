package com.ecommerce.service;

import com.ecommerce.entity.Category;
import com.ecommerce.entity.Product;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class InMemoryProductService {
    
    private final List<Product> products = new ArrayList<>();
    private final List<Category> categories = new ArrayList<>();
    
    public InMemoryProductService() {
        initializeData();
    }
    
    private void initializeData() {
        // Create categories
        Category electronics = new Category("Electronics", "Electronic devices and gadgets", "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400");
        Category fashion = new Category("Fashion", "Clothing and accessories", "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400");
        Category home = new Category("Home & Garden", "Home improvement and garden supplies", "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400");
        Category sports = new Category("Sports", "Sports equipment and fitness gear", "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400");
        Category books = new Category("Books", "Books, magazines, and educational materials", "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400");
        Category beauty = new Category("Beauty", "Beauty products and personal care", "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400");
        
        categories.add(electronics);
        categories.add(fashion);
        categories.add(home);
        categories.add(sports);
        categories.add(books);
        categories.add(beauty);
        
        // Create products
        products.add(new Product("iPhone 15 Pro", "Latest iPhone with advanced camera system and A17 Pro chip", 
                new BigDecimal("999.99"), "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400", 50, electronics));
        products.add(new Product("Samsung Galaxy S24", "Premium Android smartphone with AI features", 
                new BigDecimal("899.99"), "https://images.unsplash.com/photo-1511707171631-9ad2b117d555?w=400", 30, electronics));
        products.add(new Product("MacBook Pro 16\"", "Powerful laptop for professionals and creators", 
                new BigDecimal("2499.99"), "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400", 20, electronics));
        products.add(new Product("Sony WH-1000XM5", "Industry-leading noise canceling headphones", 
                new BigDecimal("399.99"), "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400", 75, electronics));
        products.add(new Product("Nike Air Max 270", "Comfortable running shoes with modern design", 
                new BigDecimal("150.00"), "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400", 100, fashion));
        products.add(new Product("Adidas Ultraboost 22", "High-performance running shoes", 
                new BigDecimal("180.00"), "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400", 80, fashion));
        products.add(new Product("Levi's 501 Jeans", "Classic straight-fit jeans", 
                new BigDecimal("89.99"), "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400", 60, fashion));
        products.add(new Product("Patagonia Fleece Jacket", "Warm and sustainable fleece jacket", 
                new BigDecimal("129.99"), "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400", 40, fashion));
        products.add(new Product("Dyson V15 Detect", "Cordless vacuum with laser dust detection", 
                new BigDecimal("749.99"), "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400", 25, home));
        products.add(new Product("KitchenAid Stand Mixer", "Professional-grade stand mixer", 
                new BigDecimal("329.99"), "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400", 15, home));
        
        // Set IDs for products
        for (int i = 0; i < products.size(); i++) {
            products.get(i).setId((long) (i + 1));
        }
        
        // Set IDs for categories
        for (int i = 0; i < categories.size(); i++) {
            categories.get(i).setId((long) (i + 1));
        }
    }
    
    public List<Product> getAllProducts() {
        return new ArrayList<>(products);
    }
    
    public Optional<Product> getProductById(Long id) {
        return products.stream()
                .filter(product -> product.getId().equals(id))
                .findFirst();
    }
    
    public List<Product> getProductsByCategory(Long categoryId) {
        return products.stream()
                .filter(product -> product.getCategory().getId().equals(categoryId))
                .collect(Collectors.toList());
    }
    
    public List<Product> searchProducts(String searchTerm) {
        return products.stream()
                .filter(product -> product.getName().toLowerCase().contains(searchTerm.toLowerCase()) ||
                                 product.getDescription().toLowerCase().contains(searchTerm.toLowerCase()))
                .collect(Collectors.toList());
    }
    
    public List<Category> getAllCategories() {
        return new ArrayList<>(categories);
    }
    
    public Optional<Category> getCategoryById(Long id) {
        return categories.stream()
                .filter(category -> category.getId().equals(id))
                .findFirst();
    }
}

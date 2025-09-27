package com.ecommerce.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class SimpleMockController {

    // Simple data classes without JPA annotations
    public static class SimpleProduct {
        private Long id;
        private String name;
        private String description;
        private BigDecimal price;
        private String imageUrl;
        private Integer stockQuantity;
        private SimpleCategory category;

        // Constructors
        public SimpleProduct() {}
        
        public SimpleProduct(Long id, String name, String description, BigDecimal price, 
                           String imageUrl, Integer stockQuantity, SimpleCategory category) {
            this.id = id;
            this.name = name;
            this.description = description;
            this.price = price;
            this.imageUrl = imageUrl;
            this.stockQuantity = stockQuantity;
            this.category = category;
        }

        // Getters and Setters
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        public BigDecimal getPrice() { return price; }
        public void setPrice(BigDecimal price) { this.price = price; }
        public String getImageUrl() { return imageUrl; }
        public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
        public Integer getStockQuantity() { return stockQuantity; }
        public void setStockQuantity(Integer stockQuantity) { this.stockQuantity = stockQuantity; }
        public SimpleCategory getCategory() { return category; }
        public void setCategory(SimpleCategory category) { this.category = category; }
    }

    public static class SimpleCategory {
        private Long id;
        private String name;
        private String description;
        private String imageUrl;

        // Constructors
        public SimpleCategory() {}
        
        public SimpleCategory(Long id, String name, String description, String imageUrl) {
            this.id = id;
            this.name = name;
            this.description = description;
            this.imageUrl = imageUrl;
        }

        // Getters and Setters
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        public String getImageUrl() { return imageUrl; }
        public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    }

    public static class SimpleCartItem {
        private Long id;
        private String userId;
        private SimpleProduct product;
        private Integer quantity;

        // Constructors
        public SimpleCartItem() {}
        
        public SimpleCartItem(Long id, String userId, SimpleProduct product, Integer quantity) {
            this.id = id;
            this.userId = userId;
            this.product = product;
            this.quantity = quantity;
        }

        // Getters and Setters
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getUserId() { return userId; }
        public void setUserId(String userId) { this.userId = userId; }
        public SimpleProduct getProduct() { return product; }
        public void setProduct(SimpleProduct product) { this.product = product; }
        public Integer getQuantity() { return quantity; }
        public void setQuantity(Integer quantity) { this.quantity = quantity; }
    }

    // In-memory storage
    private final Map<String, List<SimpleCartItem>> userCarts = new ConcurrentHashMap<>();
    private long nextCartItemId = 1;

    @GetMapping("/products")
    public List<SimpleProduct> getAllProducts() {
        return getMockProducts();
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<SimpleProduct> getProductById(@PathVariable Long id) {
        return getMockProducts().stream()
                .filter(product -> product.getId().equals(id))
                .findFirst()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/products/search")
    public List<SimpleProduct> searchProducts(@RequestParam String q) {
        return getMockProducts().stream()
                .filter(product -> product.getName().toLowerCase().contains(q.toLowerCase()) ||
                                 product.getDescription().toLowerCase().contains(q.toLowerCase()))
                .toList();
    }

    @GetMapping("/products/category/{categoryId}")
    public List<SimpleProduct> getProductsByCategory(@PathVariable Long categoryId) {
        return getMockProducts().stream()
                .filter(product -> product.getCategory().getId().equals(categoryId))
                .toList();
    }

    @GetMapping("/products/available")
    public List<SimpleProduct> getAvailableProducts() {
        return getMockProducts();
    }

    @GetMapping("/categories")
    public List<SimpleCategory> getAllCategories() {
        return getMockCategories();
    }

    @GetMapping("/categories/{id}")
    public ResponseEntity<SimpleCategory> getCategoryById(@PathVariable Long id) {
        return getMockCategories().stream()
                .filter(category -> category.getId().equals(id))
                .findFirst()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Cart endpoints
    @GetMapping("/cart/{userId}")
    public List<SimpleCartItem> getCartItems(@PathVariable String userId) {
        return userCarts.getOrDefault(userId, new ArrayList<>());
    }

    @PostMapping("/cart/{userId}/add")
    public ResponseEntity<String> addToCart(
            @PathVariable String userId,
            @RequestParam Long productId,
            @RequestParam(defaultValue = "1") Integer quantity) {
        
        List<SimpleProduct> products = getMockProducts();
        Optional<SimpleProduct> productOpt = products.stream()
                .filter(p -> p.getId().equals(productId))
                .findFirst();
        
        if (productOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Product not found");
        }
        
        SimpleProduct product = productOpt.get();
        List<SimpleCartItem> cart = userCarts.computeIfAbsent(userId, k -> new ArrayList<>());
        
        // Check if item already exists in cart
        Optional<SimpleCartItem> existingItem = cart.stream()
                .filter(item -> item.getProduct().getId().equals(productId))
                .findFirst();
        
        if (existingItem.isPresent()) {
            existingItem.get().setQuantity(existingItem.get().getQuantity() + quantity);
        } else {
            SimpleCartItem cartItem = new SimpleCartItem();
            cartItem.setId(nextCartItemId++);
            cartItem.setProduct(product);
            cartItem.setQuantity(quantity);
            cartItem.setUserId(userId);
            cart.add(cartItem);
        }
        
        return ResponseEntity.ok("Item added to cart");
    }

    @PutMapping("/cart/{userId}/update")
    public ResponseEntity<String> updateCartItem(
            @PathVariable String userId,
            @RequestParam Long productId,
            @RequestParam Integer quantity) {
        
        List<SimpleCartItem> cart = userCarts.get(userId);
        if (cart == null) {
            return ResponseEntity.badRequest().body("Cart not found");
        }
        
        Optional<SimpleCartItem> item = cart.stream()
                .filter(cartItem -> cartItem.getProduct().getId().equals(productId))
                .findFirst();
        
        if (item.isPresent()) {
            if (quantity <= 0) {
                cart.remove(item.get());
            } else {
                item.get().setQuantity(quantity);
            }
            return ResponseEntity.ok("Cart updated");
        }
        
        return ResponseEntity.badRequest().body("Item not found in cart");
    }

    @DeleteMapping("/cart/{userId}/remove")
    public ResponseEntity<String> removeFromCart(
            @PathVariable String userId,
            @RequestParam Long productId) {
        
        List<SimpleCartItem> cart = userCarts.get(userId);
        if (cart == null) {
            return ResponseEntity.badRequest().body("Cart not found");
        }
        
        cart.removeIf(item -> item.getProduct().getId().equals(productId));
        return ResponseEntity.ok("Item removed from cart");
    }

    @DeleteMapping("/cart/{userId}/clear")
    public ResponseEntity<String> clearCart(@PathVariable String userId) {
        userCarts.remove(userId);
        return ResponseEntity.ok("Cart cleared");
    }

    @GetMapping("/cart/{userId}/total")
    public ResponseEntity<BigDecimal> getCartTotal(@PathVariable String userId) {
        List<SimpleCartItem> cart = userCarts.getOrDefault(userId, new ArrayList<>());
        BigDecimal total = cart.stream()
                .map(item -> item.getProduct().getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        return ResponseEntity.ok(total);
    }

    @GetMapping("/cart/{userId}/count")
    public ResponseEntity<Integer> getCartCount(@PathVariable String userId) {
        List<SimpleCartItem> cart = userCarts.getOrDefault(userId, new ArrayList<>());
        int count = cart.stream()
                .mapToInt(SimpleCartItem::getQuantity)
                .sum();
        return ResponseEntity.ok(count);
    }

    private List<SimpleCategory> getMockCategories() {
        SimpleCategory electronics = new SimpleCategory(1L, "Electronics", "Electronic devices and gadgets", "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400");
        SimpleCategory fashion = new SimpleCategory(2L, "Fashion", "Clothing and accessories", "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400");
        SimpleCategory home = new SimpleCategory(3L, "Home & Garden", "Home improvement and garden supplies", "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400");
        SimpleCategory sports = new SimpleCategory(4L, "Sports", "Sports equipment and fitness gear", "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400");
        SimpleCategory books = new SimpleCategory(5L, "Books", "Books, magazines, and educational materials", "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400");
        SimpleCategory beauty = new SimpleCategory(6L, "Beauty", "Beauty products and personal care", "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400");

        return Arrays.asList(electronics, fashion, home, sports, books, beauty);
    }

    private List<SimpleProduct> getMockProducts() {
        List<SimpleCategory> categories = getMockCategories();
        
        SimpleProduct product1 = new SimpleProduct(1L, "iPhone 15 Pro", "Latest iPhone with advanced camera system and A17 Pro chip", 
                new BigDecimal("999.99"), "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400", 50, categories.get(0));
        
        SimpleProduct product2 = new SimpleProduct(2L, "Samsung Galaxy S24", "Premium Android smartphone with AI features", 
                new BigDecimal("899.99"), "https://images.unsplash.com/photo-1511707171631-9ad2b117d555?w=400", 30, categories.get(0));
        
        SimpleProduct product3 = new SimpleProduct(3L, "MacBook Pro 16\"", "Powerful laptop for professionals and creators", 
                new BigDecimal("2499.99"), "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400", 20, categories.get(0));
        
        SimpleProduct product4 = new SimpleProduct(4L, "Sony WH-1000XM5", "Industry-leading noise canceling headphones", 
                new BigDecimal("399.99"), "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400", 75, categories.get(0));
        
        SimpleProduct product5 = new SimpleProduct(5L, "Nike Air Max 270", "Comfortable running shoes with modern design", 
                new BigDecimal("150.00"), "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400", 100, categories.get(1));
        
        SimpleProduct product6 = new SimpleProduct(6L, "Adidas Ultraboost 22", "High-performance running shoes", 
                new BigDecimal("180.00"), "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400", 80, categories.get(1));
        
        SimpleProduct product7 = new SimpleProduct(7L, "Levi's 501 Jeans", "Classic straight-fit jeans", 
                new BigDecimal("89.99"), "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400", 60, categories.get(1));
        
        SimpleProduct product8 = new SimpleProduct(8L, "Patagonia Fleece Jacket", "Warm and sustainable fleece jacket", 
                new BigDecimal("129.99"), "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400", 40, categories.get(1));
        
        SimpleProduct product9 = new SimpleProduct(9L, "Dyson V15 Detect", "Cordless vacuum with laser dust detection", 
                new BigDecimal("749.99"), "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400", 25, categories.get(2));
        
        SimpleProduct product10 = new SimpleProduct(10L, "KitchenAid Stand Mixer", "Professional-grade stand mixer", 
                new BigDecimal("329.99"), "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400", 15, categories.get(2));

        return Arrays.asList(product1, product2, product3, product4, product5, product6, product7, product8, product9, product10);
    }
}

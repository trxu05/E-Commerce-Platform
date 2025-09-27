package com.ecommerce.controller;

import com.ecommerce.entity.Category;
import com.ecommerce.entity.Product;
import com.ecommerce.entity.CartItem;
import com.ecommerce.entity.Order;
import com.ecommerce.entity.OrderItem;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

// @RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class MockDataController {

    // In-memory storage for cart and orders
    private final Map<String, List<CartItem>> userCarts = new ConcurrentHashMap<>();
    private final Map<String, List<Order>> userOrders = new ConcurrentHashMap<>();
    private long nextOrderId = 1;

    @GetMapping("/products")
    public List<Product> getAllProducts() {
        return getMockProducts();
    }

    @GetMapping("/products/{id}")
    public Product getProductById(@PathVariable Long id) {
        return getMockProducts().stream()
                .filter(product -> product.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    @GetMapping("/products/search")
    public List<Product> searchProducts(@RequestParam String q) {
        return getMockProducts().stream()
                .filter(product -> product.getName().toLowerCase().contains(q.toLowerCase()) ||
                                 product.getDescription().toLowerCase().contains(q.toLowerCase()))
                .toList();
    }

    @GetMapping("/products/category/{categoryId}")
    public List<Product> getProductsByCategory(@PathVariable Long categoryId) {
        return getMockProducts().stream()
                .filter(product -> product.getCategory().getId().equals(categoryId))
                .toList();
    }

    @GetMapping("/products/available")
    public List<Product> getAvailableProducts() {
        return getMockProducts();
    }

    @GetMapping("/categories")
    public List<Category> getAllCategories() {
        return getMockCategories();
    }

    @GetMapping("/categories/{id}")
    public Category getCategoryById(@PathVariable Long id) {
        return getMockCategories().stream()
                .filter(category -> category.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    private List<Category> getMockCategories() {
        Category electronics = new Category("Electronics", "Electronic devices and gadgets", "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400");
        electronics.setId(1L);
        
        Category fashion = new Category("Fashion", "Clothing and accessories", "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400");
        fashion.setId(2L);
        
        Category home = new Category("Home & Garden", "Home improvement and garden supplies", "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400");
        home.setId(3L);
        
        Category sports = new Category("Sports", "Sports equipment and fitness gear", "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400");
        sports.setId(4L);
        
        Category books = new Category("Books", "Books, magazines, and educational materials", "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400");
        books.setId(5L);
        
        Category beauty = new Category("Beauty", "Beauty products and personal care", "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400");
        beauty.setId(6L);

        return Arrays.asList(electronics, fashion, home, sports, books, beauty);
    }

    private List<Product> getMockProducts() {
        List<Category> categories = getMockCategories();
        
        Product product1 = new Product("iPhone 15 Pro", "Latest iPhone with advanced camera system and A17 Pro chip", 
                new BigDecimal("999.99"), "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400", 50, categories.get(0));
        product1.setId(1L);
        
        Product product2 = new Product("Samsung Galaxy S24", "Premium Android smartphone with AI features", 
                new BigDecimal("899.99"), "https://images.unsplash.com/photo-1511707171631-9ad2b117d555?w=400", 30, categories.get(0));
        product2.setId(2L);
        
        Product product3 = new Product("MacBook Pro 16\"", "Powerful laptop for professionals and creators", 
                new BigDecimal("2499.99"), "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400", 20, categories.get(0));
        product3.setId(3L);
        
        Product product4 = new Product("Sony WH-1000XM5", "Industry-leading noise canceling headphones", 
                new BigDecimal("399.99"), "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400", 75, categories.get(0));
        product4.setId(4L);
        
        Product product5 = new Product("Nike Air Max 270", "Comfortable running shoes with modern design", 
                new BigDecimal("150.00"), "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400", 100, categories.get(1));
        product5.setId(5L);
        
        Product product6 = new Product("Adidas Ultraboost 22", "High-performance running shoes", 
                new BigDecimal("180.00"), "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400", 80, categories.get(1));
        product6.setId(6L);
        
        Product product7 = new Product("Levi's 501 Jeans", "Classic straight-fit jeans", 
                new BigDecimal("89.99"), "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400", 60, categories.get(1));
        product7.setId(7L);
        
        Product product8 = new Product("Patagonia Fleece Jacket", "Warm and sustainable fleece jacket", 
                new BigDecimal("129.99"), "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400", 40, categories.get(1));
        product8.setId(8L);
        
        Product product9 = new Product("Dyson V15 Detect", "Cordless vacuum with laser dust detection", 
                new BigDecimal("749.99"), "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400", 25, categories.get(2));
        product9.setId(9L);
        
        Product product10 = new Product("KitchenAid Stand Mixer", "Professional-grade stand mixer", 
                new BigDecimal("329.99"), "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400", 15, categories.get(2));
        product10.setId(10L);

        return Arrays.asList(product1, product2, product3, product4, product5, product6, product7, product8, product9, product10);
    }

    // Cart endpoints
    @GetMapping("/cart/{userId}")
    public List<CartItem> getCartItems(@PathVariable String userId) {
        return userCarts.getOrDefault(userId, new ArrayList<>());
    }

    @PostMapping("/cart/{userId}/add")
    public ResponseEntity<String> addToCart(
            @PathVariable String userId,
            @RequestParam Long productId,
            @RequestParam(defaultValue = "1") Integer quantity) {
        
        List<Product> products = getMockProducts();
        Optional<Product> productOpt = products.stream()
                .filter(p -> p.getId().equals(productId))
                .findFirst();
        
        if (productOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Product not found");
        }
        
        Product product = productOpt.get();
        List<CartItem> cart = userCarts.computeIfAbsent(userId, k -> new ArrayList<>());
        
        // Check if item already exists in cart
        Optional<CartItem> existingItem = cart.stream()
                .filter(item -> item.getProduct().getId().equals(productId))
                .findFirst();
        
        if (existingItem.isPresent()) {
            existingItem.get().setQuantity(existingItem.get().getQuantity() + quantity);
        } else {
            CartItem cartItem = new CartItem();
            cartItem.setId((long) cart.size() + 1);
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
        
        List<CartItem> cart = userCarts.get(userId);
        if (cart == null) {
            return ResponseEntity.badRequest().body("Cart not found");
        }
        
        Optional<CartItem> item = cart.stream()
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
        
        List<CartItem> cart = userCarts.get(userId);
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
        List<CartItem> cart = userCarts.getOrDefault(userId, new ArrayList<>());
        BigDecimal total = cart.stream()
                .map(item -> item.getProduct().getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        return ResponseEntity.ok(total);
    }

    @GetMapping("/cart/{userId}/count")
    public ResponseEntity<Integer> getCartCount(@PathVariable String userId) {
        List<CartItem> cart = userCarts.getOrDefault(userId, new ArrayList<>());
        int count = cart.stream()
                .mapToInt(CartItem::getQuantity)
                .sum();
        return ResponseEntity.ok(count);
    }

    // Order endpoints
    @PostMapping("/orders/{userId}")
    public ResponseEntity<Order> createOrder(
            @PathVariable String userId,
            @RequestParam String shippingAddress) {
        
        List<CartItem> cart = userCarts.get(userId);
        if (cart == null || cart.isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }
        
        Order order = new Order();
        order.setId(nextOrderId++);
        order.setUserId(userId);
        order.setStatus(Order.OrderStatus.PENDING);
        order.setShippingAddress(shippingAddress);
        order.setCreatedAt(LocalDateTime.now());
        
        List<OrderItem> orderItems = new ArrayList<>();
        BigDecimal totalAmount = BigDecimal.ZERO;
        
        for (CartItem cartItem : cart) {
            OrderItem orderItem = new OrderItem();
            orderItem.setId((long) orderItems.size() + 1);
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setUnitPrice(cartItem.getProduct().getPrice());
            orderItem.setOrder(order);
            orderItems.add(orderItem);
            
            totalAmount = totalAmount.add(
                cartItem.getProduct().getPrice().multiply(BigDecimal.valueOf(cartItem.getQuantity()))
            );
        }
        
        order.setOrderItems(orderItems);
        order.setTotalAmount(totalAmount);
        
        userOrders.computeIfAbsent(userId, k -> new ArrayList<>()).add(order);
        userCarts.remove(userId); // Clear cart after order
        
        return ResponseEntity.ok(order);
    }

    @GetMapping("/orders/{userId}")
    public List<Order> getUserOrders(@PathVariable String userId) {
        return userOrders.getOrDefault(userId, new ArrayList<>());
    }

    @GetMapping("/orders/order/{orderId}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long orderId) {
        return userOrders.values().stream()
                .flatMap(List::stream)
                .filter(order -> order.getId().equals(orderId))
                .findFirst()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}

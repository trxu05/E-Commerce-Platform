package com.ecommerce.controller;

import com.ecommerce.entity.CartItem;
import com.ecommerce.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/cart")
@CrossOrigin(origins = "*")
public class CartController {
    
    @Autowired
    private CartService cartService;
    
    @GetMapping("/{userId}")
    public ResponseEntity<List<CartItem>> getCartItems(@PathVariable String userId) {
        List<CartItem> cartItems = cartService.getCartItems(userId);
        return ResponseEntity.ok(cartItems);
    }
    
    @PostMapping("/{userId}/add")
    public ResponseEntity<CartItem> addToCart(
            @PathVariable String userId,
            @RequestParam Long productId,
            @RequestParam(defaultValue = "1") Integer quantity) {
        CartItem cartItem = cartService.addToCart(userId, productId, quantity);
        return ResponseEntity.ok(cartItem);
    }
    
    @PutMapping("/{userId}/update")
    public ResponseEntity<CartItem> updateCartItemQuantity(
            @PathVariable String userId,
            @RequestParam Long productId,
            @RequestParam Integer quantity) {
        CartItem cartItem = cartService.updateCartItemQuantity(userId, productId, quantity);
        return ResponseEntity.ok(cartItem);
    }
    
    @DeleteMapping("/{userId}/remove")
    public ResponseEntity<Void> removeFromCart(
            @PathVariable String userId,
            @RequestParam Long productId) {
        cartService.removeFromCart(userId, productId);
        return ResponseEntity.noContent().build();
    }
    
    @DeleteMapping("/{userId}/clear")
    public ResponseEntity<Void> clearCart(@PathVariable String userId) {
        cartService.clearCart(userId);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/{userId}/total")
    public ResponseEntity<BigDecimal> getCartTotal(@PathVariable String userId) {
        BigDecimal total = cartService.calculateCartTotal(userId);
        return ResponseEntity.ok(total);
    }
    
    @GetMapping("/{userId}/count")
    public ResponseEntity<Long> getCartItemCount(@PathVariable String userId) {
        Long count = cartService.getCartItemCount(userId);
        return ResponseEntity.ok(count);
    }
}

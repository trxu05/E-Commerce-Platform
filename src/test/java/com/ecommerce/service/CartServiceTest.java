package com.ecommerce.service;

import com.ecommerce.entity.CartItem;
import com.ecommerce.entity.Product;
import com.ecommerce.entity.Category;
import com.ecommerce.repository.CartItemRepository;
import com.ecommerce.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CartServiceTest {

    @Mock
    private CartItemRepository cartItemRepository;

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private CartService cartService;

    private Product product;
    private Category category;
    private CartItem cartItem;

    @BeforeEach
    void setUp() {
        category = new Category("Electronics", "Electronic devices", "electronics.jpg");
        category.setId(1L);
        
        product = new Product("iPhone 15", "Latest iPhone", new BigDecimal("999.99"), 
                            "iphone15.jpg", 10, category);
        product.setId(1L);
        
        cartItem = new CartItem("user123", product, 2);
        cartItem.setId(1L);
    }

    @Test
    void testGetCartItems() {
        // Given
        List<CartItem> cartItems = Arrays.asList(cartItem);
        when(cartItemRepository.findByUserId("user123")).thenReturn(cartItems);

        // When
        List<CartItem> result = cartService.getCartItems("user123");

        // Then
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("user123", result.get(0).getUserId());
        verify(cartItemRepository).findByUserId("user123");
    }

    @Test
    void testAddToCartNewItem() {
        // Given
        when(productRepository.findById(1L)).thenReturn(Optional.of(product));
        when(cartItemRepository.findByUserIdAndProductId("user123", 1L)).thenReturn(Optional.empty());
        when(cartItemRepository.save(any(CartItem.class))).thenReturn(cartItem);

        // When
        CartItem result = cartService.addToCart("user123", 1L, 2);

        // Then
        assertNotNull(result);
        verify(productRepository).findById(1L);
        verify(cartItemRepository).findByUserIdAndProductId("user123", 1L);
        verify(cartItemRepository).save(any(CartItem.class));
    }

    @Test
    void testAddToCartExistingItem() {
        // Given
        when(productRepository.findById(1L)).thenReturn(Optional.of(product));
        when(cartItemRepository.findByUserIdAndProductId("user123", 1L)).thenReturn(Optional.of(cartItem));
        when(cartItemRepository.save(any(CartItem.class))).thenReturn(cartItem);

        // When
        CartItem result = cartService.addToCart("user123", 1L, 2);

        // Then
        assertNotNull(result);
        verify(cartItemRepository).save(cartItem);
    }

    @Test
    void testAddToCartProductNotFound() {
        // Given
        when(productRepository.findById(1L)).thenReturn(Optional.empty());

        // When & Then
        assertThrows(RuntimeException.class, () -> cartService.addToCart("user123", 1L, 2));
        verify(productRepository).findById(1L);
        verify(cartItemRepository, never()).save(any(CartItem.class));
    }

    @Test
    void testAddToCartInsufficientStock() {
        // Given
        product.setStockQuantity(1);
        when(productRepository.findById(1L)).thenReturn(Optional.of(product));

        // When & Then
        assertThrows(RuntimeException.class, () -> cartService.addToCart("user123", 1L, 2));
        verify(productRepository).findById(1L);
    }

    @Test
    void testUpdateCartItemQuantity() {
        // Given
        when(cartItemRepository.findByUserIdAndProductId("user123", 1L)).thenReturn(Optional.of(cartItem));
        when(cartItemRepository.save(any(CartItem.class))).thenReturn(cartItem);

        // When
        CartItem result = cartService.updateCartItemQuantity("user123", 1L, 3);

        // Then
        assertNotNull(result);
        verify(cartItemRepository).findByUserIdAndProductId("user123", 1L);
        verify(cartItemRepository).save(cartItem);
    }

    @Test
    void testUpdateCartItemQuantityZero() {
        // Given
        when(cartItemRepository.findByUserIdAndProductId("user123", 1L)).thenReturn(Optional.of(cartItem));

        // When
        CartItem result = cartService.updateCartItemQuantity("user123", 1L, 0);

        // Then
        assertNull(result);
        verify(cartItemRepository).delete(cartItem);
    }

    @Test
    void testUpdateCartItemQuantityNotFound() {
        // Given
        when(cartItemRepository.findByUserIdAndProductId("user123", 1L)).thenReturn(Optional.empty());

        // When & Then
        assertThrows(RuntimeException.class, () -> cartService.updateCartItemQuantity("user123", 1L, 3));
        verify(cartItemRepository).findByUserIdAndProductId("user123", 1L);
    }

    @Test
    void testRemoveFromCart() {
        // When
        cartService.removeFromCart("user123", 1L);

        // Then
        verify(cartItemRepository).deleteByUserIdAndProductId("user123", 1L);
    }

    @Test
    void testClearCart() {
        // When
        cartService.clearCart("user123");

        // Then
        verify(cartItemRepository).deleteByUserId("user123");
    }

    @Test
    void testCalculateCartTotal() {
        // Given
        List<CartItem> cartItems = Arrays.asList(cartItem);
        when(cartItemRepository.findByUserId("user123")).thenReturn(cartItems);

        // When
        BigDecimal total = cartService.calculateCartTotal("user123");

        // Then
        assertEquals(new BigDecimal("1999.98"), total); // 999.99 * 2
        verify(cartItemRepository).findByUserId("user123");
    }

    @Test
    void testGetCartItemCount() {
        // Given
        when(cartItemRepository.countByUserId("user123")).thenReturn(5L);

        // When
        Long count = cartService.getCartItemCount("user123");

        // Then
        assertEquals(5L, count);
        verify(cartItemRepository).countByUserId("user123");
    }
}

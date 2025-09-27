package com.ecommerce.controller;

import com.ecommerce.entity.Category;
import com.ecommerce.entity.Product;
import com.ecommerce.service.InMemoryProductService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProductControllerTest {

    @Mock
    private InMemoryProductService productService;

    @InjectMocks
    private ProductController productController;

    private Product product;
    private Category category;

    @BeforeEach
    void setUp() {
        category = new Category("Electronics", "Electronic devices", "electronics.jpg");
        category.setId(1L);
        
        product = new Product("iPhone 15", "Latest iPhone", new BigDecimal("999.99"), 
                            "iphone15.jpg", 10, category);
        product.setId(1L);
    }

    @Test
    void testGetAllProducts() {
        // Given
        List<Product> products = Arrays.asList(product);
        when(productService.getAllProducts()).thenReturn(products);

        // When
        ResponseEntity<List<Product>> response = productController.getAllProducts();

        // Then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(1, response.getBody().size());
        verify(productService).getAllProducts();
    }

    @Test
    void testGetProductById() {
        // Given
        when(productService.getProductById(1L)).thenReturn(Optional.of(product));

        // When
        ResponseEntity<Product> response = productController.getProductById(1L);

        // Then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("iPhone 15", response.getBody().getName());
        verify(productService).getProductById(1L);
    }

    @Test
    void testGetProductByIdNotFound() {
        // Given
        when(productService.getProductById(1L)).thenReturn(Optional.empty());

        // When
        ResponseEntity<Product> response = productController.getProductById(1L);

        // Then
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        verify(productService).getProductById(1L);
    }

    @Test
    void testGetProductsByCategory() {
        // Given
        List<Product> products = Arrays.asList(product);
        when(productService.getProductsByCategory(1L)).thenReturn(products);

        // When
        ResponseEntity<List<Product>> response = productController.getProductsByCategory(1L);

        // Then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(1, response.getBody().size());
        verify(productService).getProductsByCategory(1L);
    }

    @Test
    void testSearchProducts() {
        // Given
        List<Product> products = Arrays.asList(product);
        when(productService.searchProducts("iPhone")).thenReturn(products);

        // When
        ResponseEntity<List<Product>> response = productController.searchProducts("iPhone");

        // Then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(1, response.getBody().size());
        verify(productService).searchProducts("iPhone");
    }

    @Test
    void testGetAvailableProducts() {
        // Given
        List<Product> products = Arrays.asList(product);
        when(productService.getAllProducts()).thenReturn(products);

        // When
        ResponseEntity<List<Product>> response = productController.getAvailableProducts();

        // Then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(1, response.getBody().size());
        verify(productService).getAllProducts();
    }
}

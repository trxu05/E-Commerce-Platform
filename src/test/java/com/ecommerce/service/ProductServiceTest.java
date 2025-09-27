package com.ecommerce.service;

import com.ecommerce.entity.Category;
import com.ecommerce.entity.Product;
import com.ecommerce.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService;

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
        Page<Product> productPage = new PageImpl<>(products);
        when(productRepository.findAll(any(Pageable.class))).thenReturn(productPage);

        // When
        Page<Product> result = productService.getAllProducts(0, 10, "name");

        // Then
        assertNotNull(result);
        assertEquals(1, result.getContent().size());
        assertEquals("iPhone 15", result.getContent().get(0).getName());
        verify(productRepository).findAll(any(Pageable.class));
    }

    @Test
    void testGetProductById() {
        // Given
        when(productRepository.findById(1L)).thenReturn(Optional.of(product));

        // When
        Optional<Product> result = productService.getProductById(1L);

        // Then
        assertTrue(result.isPresent());
        assertEquals("iPhone 15", result.get().getName());
        verify(productRepository).findById(1L);
    }

    @Test
    void testGetProductByIdNotFound() {
        // Given
        when(productRepository.findById(1L)).thenReturn(Optional.empty());

        // When
        Optional<Product> result = productService.getProductById(1L);

        // Then
        assertFalse(result.isPresent());
        verify(productRepository).findById(1L);
    }

    @Test
    void testGetProductsByCategory() {
        // Given
        List<Product> products = Arrays.asList(product);
        Page<Product> productPage = new PageImpl<>(products);
        when(productRepository.findByCategoryId(eq(1L), any(Pageable.class))).thenReturn(productPage);

        // When
        Page<Product> result = productService.getProductsByCategory(1L, 0, 10);

        // Then
        assertNotNull(result);
        assertEquals(1, result.getContent().size());
        verify(productRepository).findByCategoryId(eq(1L), any(Pageable.class));
    }

    @Test
    void testSearchProducts() {
        // Given
        List<Product> products = Arrays.asList(product);
        Page<Product> productPage = new PageImpl<>(products);
        when(productRepository.findByNameOrDescriptionContaining(eq("iPhone"), any(Pageable.class)))
                .thenReturn(productPage);

        // When
        Page<Product> result = productService.searchProducts("iPhone", 0, 10);

        // Then
        assertNotNull(result);
        assertEquals(1, result.getContent().size());
        verify(productRepository).findByNameOrDescriptionContaining(eq("iPhone"), any(Pageable.class));
    }

    @Test
    void testCreateProduct() {
        // Given
        when(productRepository.save(any(Product.class))).thenReturn(product);

        // When
        Product result = productService.createProduct(product);

        // Then
        assertNotNull(result);
        assertEquals("iPhone 15", result.getName());
        verify(productRepository).save(product);
    }

    @Test
    void testUpdateProduct() {
        // Given
        Product updatedProduct = new Product("iPhone 15 Pro", "Latest iPhone Pro", 
                                          new BigDecimal("1199.99"), "iphone15pro.jpg", 5, category);
        when(productRepository.findById(1L)).thenReturn(Optional.of(product));
        when(productRepository.save(any(Product.class))).thenReturn(updatedProduct);

        // When
        Product result = productService.updateProduct(1L, updatedProduct);

        // Then
        assertNotNull(result);
        verify(productRepository).findById(1L);
        verify(productRepository).save(any(Product.class));
    }

    @Test
    void testUpdateProductNotFound() {
        // Given
        when(productRepository.findById(1L)).thenReturn(Optional.empty());

        // When & Then
        assertThrows(RuntimeException.class, () -> productService.updateProduct(1L, product));
        verify(productRepository).findById(1L);
        verify(productRepository, never()).save(any(Product.class));
    }

    @Test
    void testDeleteProduct() {
        // When
        productService.deleteProduct(1L);

        // Then
        verify(productRepository).deleteById(1L);
    }

    @Test
    void testGetLowStockProducts() {
        // Given
        List<Product> lowStockProducts = Arrays.asList(product);
        when(productRepository.findLowStockProducts(5)).thenReturn(lowStockProducts);

        // When
        List<Product> result = productService.getLowStockProducts(5);

        // Then
        assertNotNull(result);
        assertEquals(1, result.size());
        verify(productRepository).findLowStockProducts(5);
    }

    @Test
    void testGetCheapestProducts() {
        // Given
        List<Product> cheapestProducts = Arrays.asList(product);
        when(productRepository.findCheapestProducts()).thenReturn(cheapestProducts);

        // When
        List<Product> result = productService.getCheapestProducts();

        // Then
        assertNotNull(result);
        assertEquals(1, result.size());
        verify(productRepository).findCheapestProducts();
    }
}

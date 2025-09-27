package com.ecommerce.controller;

import com.ecommerce.entity.Order;
import com.ecommerce.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "*")
public class OrderController {
    
    @Autowired
    private OrderService orderService;
    
    @PostMapping("/{userId}")
    public ResponseEntity<Order> createOrder(
            @PathVariable String userId,
            @RequestParam String shippingAddress) {
        Order order = orderService.createOrder(userId, shippingAddress);
        return ResponseEntity.ok(order);
    }
    
    @GetMapping("/{userId}")
    public ResponseEntity<Page<Order>> getUserOrders(
            @PathVariable String userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<Order> orders = orderService.getUserOrders(userId, page, size);
        return ResponseEntity.ok(orders);
    }
    
    @GetMapping("/order/{orderId}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long orderId) {
        Order order = orderService.getOrderById(orderId);
        return ResponseEntity.ok(order);
    }
    
    @PutMapping("/{orderId}/status")
    public ResponseEntity<Order> updateOrderStatus(
            @PathVariable Long orderId,
            @RequestParam Order.OrderStatus status) {
        Order order = orderService.updateOrderStatus(orderId, status);
        return ResponseEntity.ok(order);
    }
    
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Order>> getOrdersByStatus(@PathVariable Order.OrderStatus status) {
        List<Order> orders = orderService.getOrdersByStatus(status);
        return ResponseEntity.ok(orders);
    }
    
    @GetMapping("/high-value")
    public ResponseEntity<List<Order>> getHighValueOrders(@RequestParam BigDecimal minAmount) {
        List<Order> orders = orderService.getHighValueOrders(minAmount);
        return ResponseEntity.ok(orders);
    }
    
    @GetMapping("/{userId}/count")
    public ResponseEntity<Long> getUserOrderCount(@PathVariable String userId) {
        Long count = orderService.getUserOrderCount(userId);
        return ResponseEntity.ok(count);
    }
    
    @GetMapping("/{userId}/total-spent")
    public ResponseEntity<BigDecimal> getUserTotalSpent(@PathVariable String userId) {
        BigDecimal total = orderService.getUserTotalSpent(userId);
        return ResponseEntity.ok(total);
    }
}

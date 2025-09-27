package com.ecommerce.repository;

import com.ecommerce.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    
    List<CartItem> findByUserId(String userId);
    
    Optional<CartItem> findByUserIdAndProductId(String userId, Long productId);
    
    @Query("SELECT ci FROM CartItem ci WHERE ci.userId = :userId AND ci.product.id = :productId")
    Optional<CartItem> findByUserIdAndProduct(@Param("userId") String userId, @Param("productId") Long productId);
    
    @Modifying
    @Query("DELETE FROM CartItem ci WHERE ci.userId = :userId")
    void deleteByUserId(@Param("userId") String userId);
    
    @Modifying
    @Query("DELETE FROM CartItem ci WHERE ci.userId = :userId AND ci.product.id = :productId")
    void deleteByUserIdAndProductId(@Param("userId") String userId, @Param("productId") Long productId);
    
    @Query("SELECT COUNT(ci) FROM CartItem ci WHERE ci.userId = :userId")
    Long countByUserId(@Param("userId") String userId);
}

package com.lzconsorcio2.test2.repository;

import com.lzconsorcio2.test2.model.Compra;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
//import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface CompraRepository extends JpaRepository<Compra, Integer> {
    
    // Buscar compras por user_id
    @Query("SELECT c FROM Compra c WHERE c.user_id = ?1")
    List<Compra> findByUserId(Integer user_id);

    // Buscar compras por rango de fechas
    @Query("SELECT c FROM Compra c WHERE c.created_at BETWEEN ?1 AND ?2")
    List<Compra> findByCreatedAtBetween(LocalDateTime startDate, LocalDateTime endDate);

    // Buscar compras por total mayor que
    @Query("SELECT c FROM Compra c WHERE c.total > ?1")
    List<Compra> findByTotalGreaterThan(Double total);

    // Buscar compras por total menor que
    @Query("SELECT c FROM Compra c WHERE c.total < ?1")
    List<Compra> findByTotalLessThan(Double total);

    // Buscar compras por total entre rango
    @Query("SELECT c FROM Compra c WHERE c.total BETWEEN ?1 AND ?2")
    List<Compra> findByTotalBetween(Double minTotal, Double maxTotal);

    // Obtener compras ordenadas por fecha descendente
    @Query("SELECT c FROM Compra c ORDER BY c.created_at DESC")
    List<Compra> findAllByOrderByCreatedAtDesc();

    // Obtener compras de un usuario ordenadas por fecha descendente
    @Query("SELECT c FROM Compra c WHERE c.user_id = ?1 ORDER BY c.created_at DESC")
    List<Compra> findByUserIdOrderByCreatedAtDesc(Integer user_id);
    
    // Contar compras por usuario
    @Query("SELECT COUNT(c) FROM Compra c WHERE c.user_id = :user_id")
    Long countComprasByUserId(@Param("user_id") Integer user_id);
    
    // Obtener suma total de compras por usuario
    @Query("SELECT SUM(c.total) FROM Compra c WHERE c.user_id = :user_id")
    Double sumTotalByUserId(@Param("user_id") Integer user_id);
    
    // Obtener compras del día actual
    @Query("SELECT c FROM Compra c WHERE DATE(c.created_at) = CURRENT_DATE")
    List<Compra> findComprasToday();
    
    // Obtener compras del mes actual
    @Query("SELECT c FROM Compra c WHERE MONTH(c.created_at) = MONTH(CURRENT_DATE) AND YEAR(c.created_at) = YEAR(CURRENT_DATE)")
    List<Compra> findComprasThisMonth();
    
    
    // Verificar si existe compra por id
    boolean existsById(Integer id);
}

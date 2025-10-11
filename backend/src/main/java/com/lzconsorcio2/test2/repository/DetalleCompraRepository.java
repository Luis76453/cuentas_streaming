package com.lzconsorcio2.test2.repository;

import com.lzconsorcio2.test2.model.DetalleCompra;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DetalleCompraRepository extends JpaRepository<DetalleCompra, Integer> {
    
    @Query("SELECT d FROM DetalleCompra d WHERE d.compra_id = ?1")
    List<DetalleCompra> findByCompraId(Integer compraId);

    // Buscar detalles por cuenta_id
    @Query("SELECT d FROM DetalleCompra d WHERE d.cuenta_id = ?1")
    List<DetalleCompra> findByCuentaId(Integer cuentaId);

    // Buscar detalles por quantity
    @Query("SELECT d FROM DetalleCompra d WHERE d.quantity = ?1")
    List<DetalleCompra> findByQuantity(Integer quantity);

    // Buscar detalles por precio unitario mayor que
    @Query("SELECT d FROM DetalleCompra d WHERE d.precio_unitario > ?1")
    List<DetalleCompra> findByPrecioUnitarioGreaterThan(Double precio);

    // Buscar detalles por subtotal mayor que
    @Query("SELECT d FROM DetalleCompra d WHERE d.subtotal > ?1")
    List<DetalleCompra> findBySubtotalGreaterThan(Double subtotal);
    
    // Obtener suma de subtotales por compra
    @Query("SELECT SUM(d.subtotal) FROM DetalleCompra d WHERE d.compra_id = :compraId")
    Double sumSubtotalByCompraId(@Param("compraId") Integer compraId);
    
    // Contar items por compra
    @Query("SELECT COUNT(d) FROM DetalleCompra d WHERE d.compra_id = :compraId")
    Long countItemsByCompraId(@Param("compraId") Integer compraId);
    
    // Obtener cantidad total por compra
    @Query("SELECT SUM(d.quantity) FROM DetalleCompra d WHERE d.compra_id = :compraId")
    Long sumQuantityByCompraId(@Param("compraId") Integer compraId);

    @Query("SELECT SUM(d.quantity) FROM DetalleCompra d")
    Long countTotalItemsSold();

    @Query("DELETE FROM DetalleCompra d WHERE d.compra_id = ?1 AND d.cuenta_id = ?2")
    @Modifying
    @Transactional
    void deleteByCompraIdAndCuentaId(Integer compraId, Integer cuentaId);

    @Query("DELETE FROM DetalleCompra d WHERE d.compra_id = ?1")
    @Modifying
    @Transactional
    void deleteByCompraId(Integer compraId);

    // Verificar si existe detalle por compra y cuenta
    @Query("SELECT CASE WHEN COUNT(d) > 0 THEN true ELSE false END FROM DetalleCompra d WHERE d.compra_id = ?1 AND d.cuenta_id = ?2")
    boolean existsByCompraIdAndCuentaId(Integer compraId, Integer cuentaId);
}

package com.lzconsorcio2.test2.service;

import com.lzconsorcio2.test2.model.Compra;
import com.lzconsorcio2.test2.repository.CompraRepository;
import org.springframework.stereotype.Service;
import com.lzconsorcio2.test2.dto.PurchaseRequestDTO;
import com.lzconsorcio2.test2.model.DetalleCompra;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import com.lzconsorcio2.test2.service.DetalleCompraService;
//import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CompraService {
    
    private final CompraRepository compraRepository;
    private final DetalleCompraService detalleCompraService;
    
    public CompraService(CompraRepository compraRepository,  DetalleCompraService detalleCompraService) {
        this.compraRepository = compraRepository;
        this.detalleCompraService = detalleCompraService;
    }
    
    // Obtener todas las compras
    public List<Compra> getAllCompras() {
        return compraRepository.findAll();
    }
    
    @Transactional
    public Compra createPurchaseWithDetails(Integer userId, List<PurchaseRequestDTO.CartItemDTO> items, Double total) {
        // Crear la compra
        Compra compra = new Compra();
        compra.setUser_id(userId);
        compra.setTotal(total);
        compra.setCreated_at(LocalDateTime.now());
        
        Compra savedCompra = registrarCompra(compra);
        
        // Crear los detalles
        for (PurchaseRequestDTO.CartItemDTO item : items) {
            DetalleCompra detalle = new DetalleCompra();
            detalle.setCompra_id(savedCompra.getId_compra());
            detalle.setCuenta_id(item.getCuenta_id());
            detalle.setQuantity(item.getQuantity());
            detalle.setPrecio_unitario(item.getPrecio_unitario());
            detalle.setSubtotal(item.getPrecio_unitario() * item.getQuantity());
            
            detalleCompraService.registrarDetalle(detalle);
        }
        
        return savedCompra;
    }
    
    // Obtener compra por id
    public Optional<Compra> getCompraById(Integer id) {
        return compraRepository.findById(id);
    }
    
    // Crear/registrar compra
    public Compra registrarCompra(Compra compra) {
        return compraRepository.save(compra);
    }
    
    // Actualizar compra
    public Compra updateCompra(Integer id, Compra compra) {
        if (compraRepository.existsById(id)) {
            compra.setId_compra(id);
            return compraRepository.save(compra);
        }
        return null;
    }
    
    // Eliminar compra por id
    public void deleteCompra(Integer id) {
        compraRepository.deleteById(id);
    }
    
    // Verificar si existe compra por id
    public boolean existsById(Integer id) {
        return compraRepository.existsById(id);
    }
    
    // Obtener compras por usuario
    public List<Compra> getComprasByUserId(Integer user_id) {
        return compraRepository.findByUserId(user_id);
    }
    
    // Obtener compras por usuario ordenadas por fecha descendente
    public List<Compra> getComprasByUserIdOrderByDate(Integer user_id) {
        return compraRepository.findByUserIdOrderByCreatedAtDesc(user_id);
    }
    
    // Obtener compras por rango de fechas
    public List<Compra> getComprasByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return compraRepository.findByCreatedAtBetween(startDate, endDate);
    }
    
    // Obtener compras por total mayor que
    public List<Compra> getComprasGreaterThan(Double total) {
        return compraRepository.findByTotalGreaterThan(total);
    }
    
    // Obtener compras por total menor que
    public List<Compra> getComprasLessThan(Double total) {
        return compraRepository.findByTotalLessThan(total);
    }
    
    // Obtener compras por rango de total
    public List<Compra> getComprasByTotalRange(Double minTotal, Double maxTotal) {
        return compraRepository.findByTotalBetween(minTotal, maxTotal);
    }
    
    // Obtener todas las compras ordenadas por fecha descendente
    public List<Compra> getAllComprasOrderByDate() {
        return compraRepository.findAllByOrderByCreatedAtDesc();
    }
    
    // Contar compras por usuario
    public Long countComprasByUserId(Integer user_id) {
        return compraRepository.countComprasByUserId(user_id);
    }
    
    // Obtener suma total de compras por usuario
    public Double getSumTotalByUserId(Integer user_id) {
         Double sum = compraRepository.sumTotalByUserId(user_id);
         return sum != null ? sum : 0.0;
    }
    
    // Obtener compras del día actual
    public List<Compra> getComprasToday() {
        return compraRepository.findComprasToday();
    }
    
    // Obtener compras del mes actual
    public List<Compra> getComprasThisMonth() {
        return compraRepository.findComprasThisMonth();
    }
}
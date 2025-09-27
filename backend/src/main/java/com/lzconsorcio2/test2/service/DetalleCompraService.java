package com.lzconsorcio2.test2.service;

import com.lzconsorcio2.test2.model.DetalleCompra;
import com.lzconsorcio2.test2.repository.DetalleCompraRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class DetalleCompraService {
    
    private final DetalleCompraRepository detalleCompraRepository;
    
    public DetalleCompraService(DetalleCompraRepository detalleCompraRepository) {
        this.detalleCompraRepository = detalleCompraRepository;
    }
    
    // Obtener todos los detalles
    public List<DetalleCompra> getAllDetalles() {
        return detalleCompraRepository.findAll();
    }
    
    // Obtener detalle por id
    public Optional<DetalleCompra> getDetalleById(Integer id) {
        return detalleCompraRepository.findById(id);
    }
    
    // Crear detalle
    public DetalleCompra registrarDetalle(DetalleCompra detalle) {
        // Calcular subtotal si no esta definido
        if (detalle.getSubtotal() == null) {
            Double subtotal = detalle.getPrecio_unitario() * detalle.getQuantity();
            detalle.setSubtotal(subtotal);
        }
        return detalleCompraRepository.save(detalle);
    }
    
    // Crear multiples detalles
    @Transactional
    public List<DetalleCompra> registrarDetalles(List<DetalleCompra> detalles) {
        // Calcular subtotales para cada detalle
        detalles.forEach(detalle -> {
            if (detalle.getSubtotal() == null) {
                Double subtotal = detalle.getPrecio_unitario() * detalle.getQuantity();
                detalle.setSubtotal(subtotal);
            }
        });
        return detalleCompraRepository.saveAll(detalles);
    }
    
    // Actualizar detalle
    public DetalleCompra updateDetalle(Integer id, DetalleCompra detalle) {
        if (detalleCompraRepository.existsById(id)) {
            detalle.setId_detalle(id);
            // Recalcular subtotal
            if (detalle.getPrecio_unitario() != null && detalle.getQuantity() != null) {
                Double subtotal = detalle.getPrecio_unitario() * detalle.getQuantity();
                detalle.setSubtotal(subtotal);
            }
            return detalleCompraRepository.save(detalle);
        }
        return null;
    }
    
    // Eliminar detalle por id
    public void deleteDetalle(Integer id) {
        detalleCompraRepository.deleteById(id);
    }
    
    // Eliminar detalles por compra
    @Transactional
    public void deleteDetallesByCompraId(Integer compraId) {
        detalleCompraRepository.deleteByCompraId(compraId);
    }
    
    // Verificar si existe detalle por id
    public boolean existsById(Integer id) {
        return detalleCompraRepository.existsById(id);
    }
    
    // Obtener detalles por compra
    public List<DetalleCompra> getDetallesByCompraId(Integer compraId) {
        return detalleCompraRepository.findByCompraId(compraId);
    }
    
    // Obtener detalles por cuenta
    public List<DetalleCompra> getDetallesByCuentaId(Integer cuentaId) {
        return detalleCompraRepository.findByCuentaId(cuentaId);
    }
    
    // Obtener suma de subtotales por compra
    public Double getSumSubtotalByCompraId(Integer compraId) {
        Double sum = detalleCompraRepository.sumSubtotalByCompraId(compraId);
        return sum != null ? sum : 0.0;
    }
    
    // Contar items por compra
    public Long countItemsByCompraId(Integer compraId) {
        return detalleCompraRepository.countItemsByCompraId(compraId);
    }
    
    // Obtener cantidad total por compra
    public Long getSumQuantityByCompraId(Integer compraId) {
        Long sum = detalleCompraRepository.sumQuantityByCompraId(compraId);
        return sum != null ? sum : 0L;
    }
    
    // Verificar si existe detalle por compra y cuenta
    public boolean existsByCompraIdAndCuentaId(Integer compraId, Integer cuentaId) {
        return detalleCompraRepository.existsByCompraIdAndCuentaId(compraId, cuentaId);
    }
}
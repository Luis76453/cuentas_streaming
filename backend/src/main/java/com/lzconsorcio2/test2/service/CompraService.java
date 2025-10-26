package com.lzconsorcio2.test2.service;

import com.lzconsorcio2.test2.model.Compra;
import com.lzconsorcio2.test2.model.DetalleCompra;
import com.lzconsorcio2.test2.model.Transaccion;
import com.lzconsorcio2.test2.repository.CompraRepository;
import com.lzconsorcio2.test2.repository.DetalleCompraRepository;
import com.lzconsorcio2.test2.dto.PurchaseRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class CompraService {

    private final CompraRepository compraRepository;
    private final DetalleCompraRepository detalleCompraRepository;
    private final DetalleCompraService detalleCompraService;
    private final TransaccionService transaccionService;

    @Autowired
    public CompraService(
            CompraRepository compraRepository,
            DetalleCompraService detalleCompraService,
            DetalleCompraRepository detalleCompraRepository,
            TransaccionService transaccionService) {
        this.compraRepository = compraRepository;
        this.detalleCompraService = detalleCompraService;
        this.detalleCompraRepository = detalleCompraRepository;
        this.transaccionService = transaccionService;
    }

    public List<Compra> getAllCompras() {
        return compraRepository.findAll();
    }

    @Transactional
    public Compra createPurchaseWithDetails(Integer userId, List<PurchaseRequestDTO.CartItemDTO> items, Double total) {
        Compra compra = new Compra();
        compra.setUser_id(userId);
        compra.setTotal(total);
        compra.setCreated_at(LocalDateTime.now());
        Compra savedCompra = registrarCompra(compra);

        for (PurchaseRequestDTO.CartItemDTO item : items) {
            DetalleCompra detalle = new DetalleCompra();
            detalle.setCompra_id(savedCompra.getId_compra());
            detalle.setCuenta_id(item.getCuenta_id());
            detalle.setQuantity(item.getQuantity());
            detalle.setPrecio_unitario(item.getPrecio_unitario());
            detalle.setSubtotal(item.getPrecio_unitario() * item.getQuantity());
            detalleCompraService.registrarDetalle(detalle);
        }

        Transaccion transaccion = new Transaccion();
        transaccion.setCompra_id(savedCompra.getId_compra());
        transaccion.setEstado("COMPLETADA");
        transaccion.setCreated_at(LocalDateTime.now());
        transaccionService.registrarTransaccion(transaccion);

        return savedCompra;
    }

    public Optional<Compra> getCompraById(Integer id) {
        return compraRepository.findById(id);
    }

    public Compra registrarCompra(Compra compra) {
        return compraRepository.save(compra);
    }

    public Compra updateCompra(Integer id, Compra compra) {
        if (compraRepository.existsById(id)) {
            compra.setId_compra(id);
            return compraRepository.save(compra);
        }
        return null;
    }

    public void deleteCompra(Integer id) {
        compraRepository.deleteById(id);
    }

    public boolean existsById(Integer id) {
        return compraRepository.existsById(id);
    }

    public List<Compra> getComprasByUserId(Integer user_id) {
        return compraRepository.findByUserId(user_id);
    }

    public List<Compra> getComprasByUserIdOrderByDate(Integer user_id) {
        return compraRepository.findByUserIdOrderByCreatedAtDesc(user_id);
    }

    public List<Compra> getComprasByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return compraRepository.findByCreatedAtBetween(startDate, endDate);
    }

    public List<Compra> getComprasGreaterThan(Double total) {
        return compraRepository.findByTotalGreaterThan(total);
    }

    public List<Compra> getComprasLessThan(Double total) {
        return compraRepository.findByTotalLessThan(total);
    }

    public List<Compra> getComprasByTotalRange(Double minTotal, Double maxTotal) {
        return compraRepository.findByTotalBetween(minTotal, maxTotal);
    }

    public List<Compra> getAllComprasOrderByDate() {
        return compraRepository.findAllByOrderByCreatedAtDesc();
    }

    public Long countComprasByUserId(Integer user_id) {
        return compraRepository.countComprasByUserId(user_id);
    }

    public Double getSumTotalByUserId(Integer user_id) {
        Double sum = compraRepository.sumTotalByUserId(user_id);
        return sum != null ? sum : 0.0;
    }

    public List<Compra> getComprasToday() {
        return compraRepository.findComprasToday();
    }

    public List<Compra> getComprasThisMonth() {
        return compraRepository.findComprasThisMonth();
    }

    public Map<String, Object> getPurchaseStatistics() {
        Map<String, Object> stats = new HashMap<>();
        Double totalRevenue = Optional.ofNullable(compraRepository.findTotalRevenue()).orElse(0.0);
        stats.put("totalRevenue", totalRevenue);
        Long totalItemsSold = Optional.ofNullable(detalleCompraRepository.countTotalItemsSold()).orElse(0L);
        stats.put("accountsSold", totalItemsSold);
        LocalDateTime lastMonth = LocalDateTime.now().minusMonths(1);
        Double revenueLastMonth = Optional.ofNullable(compraRepository.findTotalRevenueSince(lastMonth)).orElse(0.0);
        stats.put("revenueChangePercentage", 20.1);
        stats.put("accountsSoldChangePercentage", 180.1);
        return stats;
    }
}

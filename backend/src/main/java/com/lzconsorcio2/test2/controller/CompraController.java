
package com.lzconsorcio2.test2.controller;

import com.lzconsorcio2.test2.model.Compra;
import com.lzconsorcio2.test2.model.DetalleCompra;
import com.lzconsorcio2.test2.service.CompraService;
import com.lzconsorcio2.test2.service.DetalleCompraService;
import com.lzconsorcio2.test2.dto.PurchaseRequestDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class CompraController {

    private final CompraService compraService;
    private final DetalleCompraService detalleCompraService;

    public CompraController(CompraService compraService, DetalleCompraService detalleCompraService) {
        this.compraService = compraService;
        this.detalleCompraService = detalleCompraService;
    }

    // Obtener todas las compras
    @GetMapping("/purchases")
    public List<Compra> getAllCompras() {
        return compraService.getAllCompras();
    }

    // Obtener compra por id
    @GetMapping("/purchases/{id}")
    public ResponseEntity<Compra> getCompraById(@PathVariable Integer id) {
        Optional<Compra> compra = compraService.getCompraById(id);
        return compra.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // Obtener compras por usuario
    @GetMapping("/purchases/user/{userId}")
    public List<Compra> getComprasByUserId(@PathVariable Integer user_id) {
        return compraService.getComprasByUserId(user_id);
    }

    // Obtener compras por usuario ordenadas por fecha
    @GetMapping("/purchases/user/{userId}/ordered")
    public List<Compra> getComprasByUserIdOrderByDate(@PathVariable Integer user_id) {
        return compraService.getComprasByUserIdOrderByDate(user_id);
    }

    // Obtener todas las compras ordenadas por fecha
    @GetMapping("/purchases/ordered")
    public List<Compra> getAllComprasOrderByDate() {
        return compraService.getAllComprasOrderByDate();
    }

    // Obtener compras por rango de fechas
    @GetMapping("/purchases/date-range")
    public List<Compra> getComprasByDateRange(
            @RequestParam String startDate,
            @RequestParam String endDate) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime start = LocalDateTime.parse(startDate + " 00:00:00", formatter);
        LocalDateTime end = LocalDateTime.parse(endDate + " 23:59:59", formatter);
        return compraService.getComprasByDateRange(start, end);
    }

    // Obtener compras por total mayor que
    @GetMapping("/purchases/total/greater/{total}")
    public List<Compra> getComprasGreaterThan(@PathVariable Double total) {
        return compraService.getComprasGreaterThan(total);
    }

    // Obtener compras por total menor que
    @GetMapping("/purchases/total/less/{total}")
    public List<Compra> getComprasLessThan(@PathVariable Double total) {
        return compraService.getComprasLessThan(total);
    }

    // Obtener compras por rango de total
    @GetMapping("/purchases/total/range")
    public List<Compra> getComprasByTotalRange(
            @RequestParam Double minTotal,
            @RequestParam Double maxTotal) {
        return compraService.getComprasByTotalRange(minTotal, maxTotal);
    }

    // Obtener compras del día
    @GetMapping("/purchases/today")
    public List<Compra> getComprasToday() {
        return compraService.getComprasToday();
    }

    // Obtener compras del mes
    @GetMapping("/purchases/this-month")
    public List<Compra> getComprasThisMonth() {
        return compraService.getComprasThisMonth();
    }

    // Endpoint para estadísticas de ventas
    @GetMapping("/purchases/stats")
    public ResponseEntity<Map<String, Object>> getPurchaseStats() {
        Map<String, Object> stats = compraService.getPurchaseStatistics();
        return ResponseEntity.ok(stats);
    }

    @PostMapping("/purchases")
    @Transactional
    public ResponseEntity<Compra> registrarCompra(@RequestBody PurchaseRequestDTO request) {
        Compra compra = compraService.createPurchaseWithDetails(
        request.getUser_id(),
        request.getItems(),
        request.getTotal()
        );
    return ResponseEntity.ok(compra);
    }

    // Actualizar compra por id
    @PutMapping("/purchases/{id}")
    public ResponseEntity<Compra> updateCompra(@PathVariable Integer id, @RequestBody Compra compra) {
        Compra compraActualizada = compraService.updateCompra(id, compra);
        if (compraActualizada != null) {
            return ResponseEntity.ok(compraActualizada);
        }
        return ResponseEntity.notFound().build();
    }

    // Eliminar compra
    @DeleteMapping("/purchases/{id}")
    public ResponseEntity<Void> deleteCompra(@PathVariable Integer id) {
        if (compraService.existsById(id)) {
            compraService.deleteCompra(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Contar compras por usuario
    @GetMapping("/purchases/count/user/{userId}")
    public ResponseEntity<Long> countComprasByUserId(@PathVariable Integer user_id) {
        Long count = compraService.countComprasByUserId(user_id);
        return ResponseEntity.ok(count);
    }

    // Obtener suma total por usuario
    @GetMapping("/purchases/sum/user/{userId}")
    public ResponseEntity<Double> getSumTotalByUserId(@PathVariable Integer user_id) {
        Double sum = compraService.getSumTotalByUserId(user_id);
        return ResponseEntity.ok(sum);
    }

    // Obtener detalles de una compra
    @GetMapping("/purchases/{id}/details")
    public ResponseEntity<List<DetalleCompra>> getCompraDetails(@PathVariable Integer id) {
        if (!compraService.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        List<DetalleCompra> detalles = detalleCompraService.getDetallesByCompraId(id);
        return ResponseEntity.ok(detalles);
    }

    // Verificar si existe compra por id
    @GetMapping("/purchases/exists/{id}")
    public ResponseEntity<Boolean> existsById(@PathVariable Integer id) {
        boolean exists = compraService.existsById(id);
        return ResponseEntity.ok(exists);
    }
}

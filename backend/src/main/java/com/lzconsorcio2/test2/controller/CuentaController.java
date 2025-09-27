

package com.lzconsorcio2.test2.controller;
import com.lzconsorcio2.test2.model.Cuenta;
import com.lzconsorcio2.test2.service.CuentaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class CuentaController {

    private final CuentaService cuentaService;

    public CuentaController(CuentaService cuentaService) {
        this.cuentaService = cuentaService;
    }

    @GetMapping("/accounts")
    public List<Cuenta> getAllCuentas() {
        return cuentaService.getAllCuentas();
    }
    
    
    // obtener por id
    @GetMapping("/accounts/{id}")
    public ResponseEntity<Cuenta> getCuentaById(@PathVariable Integer id) {
        Optional<Cuenta> cuenta = cuentaService.getCuentaById(id);
        return cuenta.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
    
    //obtener por servicio
    @GetMapping("/accounts/servicio/{servicio}")
    public List<Cuenta> getCuentasByServicio(@PathVariable String servicio) {
        return cuentaService.getCuentasByServicio(servicio);
    }
    //obtener por plan 
    @GetMapping("/accounts/plan/{plan}")
    public List<Cuenta> getCuentasByPlan(@PathVariable String plan) {
        return cuentaService.getCuentasByPlan(plan);
    }
    
    //crear cuenta
    @PostMapping("/accounts")
    public Cuenta registrarCuenta(@RequestBody Cuenta cuenta) {
        return cuentaService.registrarCuenta(cuenta);
    }
   
    //actualizar cuenta por id
    
    @PutMapping("/accounts/{id}")
    public ResponseEntity<Cuenta> updateCuenta(@PathVariable Integer id, @RequestBody Cuenta cuenta) {
        Cuenta cuentaActualizada = cuentaService.updateCuenta(id, cuenta);
        if (cuentaActualizada != null) {
            return ResponseEntity.ok(cuentaActualizada);
        }
        return ResponseEntity.notFound().build();
    }
    
    @DeleteMapping("/accounts/{id}")
    public ResponseEntity<Void> deleteCuenta(@PathVariable Integer id) {
        if (cuentaService.existsById(id)) {
            cuentaService.deleteCuenta(id);
            return ResponseEntity.ok().build();
        }
        else{
            return ResponseEntity.notFound().build();
        }
       
    }
    
    
}

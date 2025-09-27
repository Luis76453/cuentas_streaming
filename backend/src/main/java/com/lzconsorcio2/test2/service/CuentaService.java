

package com.lzconsorcio2.test2.service;

import com.lzconsorcio2.test2.model.Cuenta;
import com.lzconsorcio2.test2.repository.CuentaRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CuentaService {
    private final CuentaRepository cuentaRepository;

    public CuentaService(CuentaRepository cuentaRepository) {
        this.cuentaRepository = cuentaRepository;
    }

    
    //obtener todo 
    public List<Cuenta> getAllCuentas() {
        return cuentaRepository.findAll();
    }
    //obtener por id 
    public Optional<Cuenta> getCuentaById(Integer id) {
        return cuentaRepository.findById(id);
    }
    //crear cuenta
    public Cuenta registrarCuenta(Cuenta cuenta){
        return cuentaRepository.save(cuenta);
    }
    
    //actualizar
    public Cuenta updateCuenta(Integer id, Cuenta datosActualizados) {
        Optional<Cuenta> cuentaExistente = cuentaRepository.findById(id);
    
    if (cuentaExistente.isPresent()) {
        Cuenta cuenta = cuentaExistente.get();
        
        // Solo actualizar campos que no sean null
        if (datosActualizados.getPlan() != null && !datosActualizados.getPlan().trim().isEmpty()) {
            cuenta.setPlan(datosActualizados.getPlan());
        }
        
        if (datosActualizados.getServicio() != null && !datosActualizados.getServicio().trim().isEmpty()) {
            cuenta.setServicio(datosActualizados.getServicio());
        }
        
        if (datosActualizados.getPrecio() != null) {
            cuenta.setPrecio(datosActualizados.getPrecio());
        }
        
        if (datosActualizados.getCalidad() != null && !datosActualizados.getCalidad().trim().isEmpty()) {
            cuenta.setCalidad(datosActualizados.getCalidad());
        }
        
        if (datosActualizados.getPantallas() != null) {
            cuenta.setPantallas(datosActualizados.getPantallas());
        }
        
        if (datosActualizados.getDuracion() != null && !datosActualizados.getDuracion().trim().isEmpty()) {
            cuenta.setDuracion(datosActualizados.getDuracion());
        }
        
        return cuentaRepository.save(cuenta);
    }
        return null;
    }
    
    //eliminar por id
    public void deleteCuenta(Integer id) {
        cuentaRepository.deleteById(id);
    }
    //ver si existe por el id
    public boolean existsById(Integer id) {
        return cuentaRepository.existsById(id);
    }
    //obtener cuentas por servicio
    public List<Cuenta> getCuentasByServicio(String servicio) {
        return cuentaRepository.findByServicio(servicio);
    }
    //obtener cuentas por plan
    public List<Cuenta> getCuentasByPlan(String plan) {
        return cuentaRepository.findByPlan(plan);
    }
    //obtener cuentas por servicio y plan
    public List<Cuenta> getCuentasByServicioAndPlan(String servicio, String plan) {
        return cuentaRepository.findByServicioAndPlan(servicio, plan);
    }
    //obtener todos los servicios
    public List<String> getAllServicios() {
        return cuentaRepository.findAllDistinctServicios();
    }
}

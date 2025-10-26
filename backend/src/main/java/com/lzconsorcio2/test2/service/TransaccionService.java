package com.lzconsorcio2.test2.service;

import com.lzconsorcio2.test2.model.Transaccion;
import com.lzconsorcio2.test2.repository.TransaccionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class TransaccionService {

    private final TransaccionRepository transaccionRepository;

    @Autowired
    public TransaccionService(TransaccionRepository transaccionRepository) {
        this.transaccionRepository = transaccionRepository;
    }

    // Registrar una nueva transacción
    public Transaccion registrarTransaccion(Transaccion transaccion) {
        return transaccionRepository.save(transaccion);
    }

    // Obtener todas las transacciones
    public List<Transaccion> getAllTransacciones() {
        return transaccionRepository.findAll();
    }

    // Obtener transacción por id
    public Optional<Transaccion> getTransaccionById(Integer id) {
        return transaccionRepository.findById(id);
    }

    // Eliminar transacción por id
    public void deleteTransaccion(Integer id) {
        transaccionRepository.deleteById(id);
    }

    // Verificar si existe transacción por id
    public boolean existsById(Integer id) {
        return transaccionRepository.existsById(id);
    }
}



package com.lzconsorcio2.test2.repository;

import com.lzconsorcio2.test2.model.Cuenta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

public interface CuentaRepository extends JpaRepository<Cuenta, Integer> {
    

    List<Cuenta> findByServicio(String servicio);
    
    List<Cuenta> findByPlan(String plan);
    
    List<Cuenta> findByServicioAndPlan(String servicio, String plan);
    
    
    
    @Query("SELECT DISTINCT c.servicio FROM Cuenta c")
    List<String> findAllDistinctServicios();
}

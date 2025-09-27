

package com.lzconsorcio2.test2.model;

import jakarta.persistence.*;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Cuenta") // nombre de la tabla en MySQL
public class Cuenta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    
   
    private Integer id_cuenta;

   
    private String plan;
    
    
    private String servicio;
    
   
    private Double precio;
    
    
    private String calidad;
    
   
    private Integer pantallas;
    
    
    private String duracion;
}


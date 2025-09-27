package com.lzconsorcio2.test2.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Detalle_Compra")
public class DetalleCompra {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_detalle;
    
    @Column(name = "compra_id", nullable = false)
    private Integer compra_id;
    
    @Column(name = "cuenta_id", nullable = false)
    private Integer cuenta_id;
    
    @Column(nullable = false)
    private Integer quantity;
    
    @Column(name = "precio_unitario", nullable = false)
    private Double precio_unitario;
    
    @Column(nullable = false)
    private Double subtotal;
    
    // fk para compra 
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "compra_id", insertable = false, updatable = false)
    private Compra compra;
    
    // fk para cuenta 
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cuenta_id", insertable = false, updatable = false)
    private Cuenta cuenta;
}
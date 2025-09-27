package com.lzconsorcio2.test2.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.List;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Compra")
public class Compra {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_compra;
    
    @Column(name = "user_id", nullable = false)
    private Integer user_id;
    
    
    private Double total;
    
    @Column(name = "created_at")
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime created_at;
    
    // Relación con Usuario FK
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private Usuario usuario;
    
    // Relación con DetalleCompra
    @OneToMany(mappedBy = "compra", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<DetalleCompra> items;
    
    @PrePersist
    protected void onCreate() {
        created_at = LocalDateTime.now();
    }
}
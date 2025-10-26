package com.lzconsorcio2.test2.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Transaccion")
public class Transaccion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_transaccion;

    // Foreign key hacia Compra (por convención similar)
    @Column(name = "compra_id", nullable = false)
    private Integer compra_id;

    private String estado;

    @Column(name = "created_at")
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime created_at;

    // Relación con Compra
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "compra_id", insertable = false, updatable = false)
    private Compra compra;

    @PrePersist
    protected void onCreate() {
        created_at = LocalDateTime.now();
    }
}

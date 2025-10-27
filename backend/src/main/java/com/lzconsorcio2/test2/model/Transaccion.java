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

    @Column(name = "compra_id", nullable = false)
    private Integer compra_id;

    @Column(name = "user_id", nullable = false)
    private Integer user_id;

    @Column(name = "account_info", columnDefinition = "JSON")
    private String account_info; // JSON se puede manejar como String

    @Column(nullable = false)
    private Double amount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status = Status.Pendiente; // Valor por defecto

    @Column(name = "transaction_date")
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime transaction_date;

    @Column(name = "updated_at")
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime updated_at;

    // Relación con Compra
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "compra_id", insertable = false, updatable = false)
    private Compra compra;

    // Relación con Usuario
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private Usuario usuario;

    @PrePersist
    protected void onCreate() {
        transaction_date = LocalDateTime.now();
        updated_at = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updated_at = LocalDateTime.now();
    }

    public enum Status {
        Completado,
        Pendiente,
        Fallido
    }
}

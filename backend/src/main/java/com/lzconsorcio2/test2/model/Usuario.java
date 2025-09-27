

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
@Table(name = "Usuario") // nombre de la tabla en MySQL
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_usuario;
    
  
    private String name;
    
    
    private String email;
    
   
    private String password;
                                                                                        
    @Column(name = "isAdmin")
    
    private Boolean isAdmin;
    
    
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime created_at;
    
    
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime updated_at;
    
    @PrePersist
    protected void onCreate() {
        created_at = LocalDateTime.now();
        updated_at = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updated_at = LocalDateTime.now();
    }
    
    

}

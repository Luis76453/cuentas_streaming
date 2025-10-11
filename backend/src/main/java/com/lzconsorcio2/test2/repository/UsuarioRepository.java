

package com.lzconsorcio2.test2.repository;
import com.lzconsorcio2.test2.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.time.LocalDateTime;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

    // Buscar por email
    Optional<Usuario> findByEmail(String email);

    // Buscar por nombre
    List<Usuario> findByName(String name);

    // Buscar por nombre conteniendo texto (búsqueda parcial)
    List<Usuario> findByNameContainingIgnoreCase(String name);

    // Buscar usuarios administradores
    List<Usuario> findByIsAdmin(Boolean isAdmin);

    // Verificar si existe un usuario por email
    boolean existsByEmail(String email);

    // Buscar usuarios por email y password (para login)
    Optional<Usuario> findByEmailAndPassword(String email, String password);

    // Obtener todos los emails distintos
    @Query("SELECT DISTINCT u.email FROM Usuario u")
    List<String> findAllDistinctEmails();

    // Contar usuarios creados desde una fecha
    @Query("SELECT COUNT(u) FROM Usuario u WHERE u.created_at >= :startDate")
    long countByCreatedAtAfter(@Param("startDate") LocalDateTime startDate);
}

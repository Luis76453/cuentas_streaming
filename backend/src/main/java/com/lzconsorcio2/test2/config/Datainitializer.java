

package com.lzconsorcio2.test2.config;
import com.lzconsorcio2.test2.model.Usuario;
import com.lzconsorcio2.test2.repository.UsuarioRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;


@Component
public class DataInitializer {
    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);

    @Autowired
    private UsuarioRepository usuarioRepository;

    @EventListener(ApplicationReadyEvent.class)
    public void initializeDefaultData() {
        log.info("🚀 === INICIANDO CARGA DE DATOS POR DEFECTO ===");
        
        try {
            // Verificar conexión a BD
            log.info("🔍 Verificando conexión a la base de datos...");
            long totalUsers = usuarioRepository.count();
            log.info("📊 Usuarios actuales en la BD: {}", totalUsers);
            
            createDefaultAdmin();
            
            // Verificar resultado final
            long finalCount = usuarioRepository.count();
            log.info("📊 Total usuarios después de inicialización: {}", finalCount);
            
            log.info("✅ === DATOS POR DEFECTO CARGADOS EXITOSAMENTE ===");
            
        } catch (Exception e) {
            log.error("❌ === ERROR AL CARGAR DATOS POR DEFECTO ===");
            log.error("Error: {}", e.getMessage());
            e.printStackTrace();
        }
    }

    private void createDefaultAdmin() {
        String adminEmail = "admin@gmail.com";
        String adminPassword = "admin";
        
        log.info("🔍 Buscando admin con email: {}", adminEmail);
        
        boolean exists = usuarioRepository.existsByEmail(adminEmail);
        log.info("¿Existe admin? {}", exists);
        
        if (!exists) {
            log.info("👨‍💼 Creando nuevo administrador...");
            
            Usuario admin = new Usuario();
            admin.setName("Administrador");
            admin.setEmail(adminEmail);
            admin.setPassword(adminPassword); 
            admin.setIsAdmin(true);
            // No necesitas setear created_at y updated_at porque @PrePersist lo hace automáticamente
            
            log.info("💾 Guardando admin en la base de datos...");
            Usuario savedAdmin = usuarioRepository.save(admin);
            
            log.info("✅ ADMIN CREADO EXITOSAMENTE:");
            log.info("   - ID: {}", savedAdmin.getId_usuario()); // Usando el getter correcto
            log.info("   - Name: {}", savedAdmin.getName());
            log.info("   - Email: {}", savedAdmin.getEmail());
            log.info("   - Password: {}", savedAdmin.getPassword());
            log.info("   - IsAdmin: {}", savedAdmin.getIsAdmin());
            log.info("   - Created: {}", savedAdmin.getCreated_at());
            
        } else {
            log.info("ℹ️ Admin ya existe en la base de datos: {}", adminEmail);
            
            // Mostrar info del admin existente
            usuarioRepository.findByEmail(adminEmail).ifPresent(admin -> {
                log.info("📋 Datos del admin existente:");
                log.info("   - ID: {}", admin.getId_usuario());
                log.info("   - Name: {}", admin.getName());
                log.info("   - Email: {}", admin.getEmail());
                log.info("   - IsAdmin: {}", admin.getIsAdmin());
            });
        }
    }
}

package com.lzconsorcio2.test2.controller;

import com.lzconsorcio2.test2.model.Usuario;
import com.lzconsorcio2.test2.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import java.util.Map;


@RestController
@RequestMapping("/api")
public class UsuarioController {
    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    // Obtener todos los usuarios
    @GetMapping("/users")
    public List<Usuario> getAllUsuarios() {
        return usuarioService.getAllUsuarios();
    }

    // Obtener usuario por id
    @GetMapping("/users/{id}")
    public ResponseEntity<Usuario> getUsuarioById(@PathVariable Integer id) {
        Optional<Usuario> usuario = usuarioService.getUsuarioById(id);
        return usuario.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // Obtener usuario por email
    @GetMapping("/users/email/{email}")
    public ResponseEntity<Usuario> getUsuarioByEmail(@PathVariable String email) {
        Optional<Usuario> usuario = usuarioService.getUsuarioByEmail(email);
        return usuario.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // Obtener usuarios por nombre
    @GetMapping("/users/name/{name}")
    public List<Usuario> getUsuariosByName(@PathVariable String name) {
        return usuarioService.getUsuariosByName(name);
    }

    // Búsqueda parcial por nombre
    @GetMapping("/users/search/{name}")
    public List<Usuario> getUsuariosByNameContaining(@PathVariable String name) {
        return usuarioService.getUsuariosByNameContaining(name);
    }

    // Obtener usuarios administradores
    @GetMapping("/users/admin")
    public List<Usuario> getUsuariosAdmin() {
        return usuarioService.getUsuariosAdmin();
    }

    // Obtener usuarios no administradores
    @GetMapping("/users/no-admin")
    public List<Usuario> getUsuariosNoAdmin() {
        return usuarioService.getUsuariosNoAdmin();
    }

    // Obtener estadísticas de usuarios
    @GetMapping("/users/statistics")
    public ResponseEntity<Map<String, Object>> getUserStats() {
        Map<String, Object> stats = usuarioService.getUserStats();
        return ResponseEntity.ok(stats);
    }


    // Crear usuario
    @PostMapping("/users")
    public ResponseEntity<Usuario> registrarUsuario(@RequestBody Usuario usuario) {
        // Verificar si el email ya existe
        if (usuarioService.existsByEmail(usuario.getEmail())) {
            return ResponseEntity.badRequest().build(); // Email ya existe
        }
        Usuario nuevoUsuario = usuarioService.registrarUsuario(usuario);
        return ResponseEntity.ok(nuevoUsuario);
    }
    
    // crear usuario desde admin 
    @PostMapping("/users/register")
    public ResponseEntity<Usuario> registrarUsuarioPublic(@RequestBody Usuario usuario) {
        // Verificar si el email ya existe
        if (usuarioService.existsByEmail(usuario.getEmail())) {
            return ResponseEntity.badRequest().build();
        }
        Usuario nuevoUsuario = usuarioService.registrarUsuario(usuario);
        return ResponseEntity.ok(nuevoUsuario);
    }

    // Actualizar usuario por id
    @PutMapping("/users/{id}")
    public ResponseEntity<Usuario> updateUsuario(@PathVariable Integer id, @RequestBody Usuario usuario) {
        // Verificar si el email ya existe en otro usuario
        Optional<Usuario> usuarioExistente = usuarioService.getUsuarioByEmail(usuario.getEmail());
        if (usuarioExistente.isPresent() && !usuarioExistente.get().getId_usuario().equals(id)) {
            return ResponseEntity.badRequest().build(); // Email ya existe en otro usuario
        }

        Usuario usuarioActualizado = usuarioService.updateUsuario(id, usuario);
        if (usuarioActualizado != null) {
            return ResponseEntity.ok(usuarioActualizado);
        }
        return ResponseEntity.notFound().build();
    }

    // Eliminar usuario
    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUsuario(@PathVariable Integer id) {
        if (usuarioService.existsById(id)) {
            usuarioService.deleteUsuario(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Login endpoint
    @PostMapping("/users/login")
    public ResponseEntity<Usuario> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");
        
        Optional<Usuario> usuario = usuarioService.login(email, password);
        return usuario.map(ResponseEntity::ok).orElse(ResponseEntity.status(401).build());
    }

    // Verificar si existe email
    @GetMapping("/users/exists/email/{email}")
    public ResponseEntity<Boolean> existsByEmail(@PathVariable String email) {
        boolean exists = usuarioService.existsByEmail(email);
        return ResponseEntity.ok(exists);
    }

    // Obtener todos los emails
    @GetMapping("/users/emails")
    public List<String> getAllEmails() {
        return usuarioService.getAllEmails();
    }

}

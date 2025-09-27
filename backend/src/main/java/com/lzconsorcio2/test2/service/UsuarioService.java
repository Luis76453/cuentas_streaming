
package com.lzconsorcio2.test2.service;

import com.lzconsorcio2.test2.model.Usuario;
import com.lzconsorcio2.test2.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;


@Service
public class UsuarioService {
        
    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    // Obtener todos los usuarios
    public List<Usuario> getAllUsuarios() {
        return usuarioRepository.findAll();
    }

    // Obtener usuario por id
    public Optional<Usuario> getUsuarioById(Integer id) {
        return usuarioRepository.findById(id);
    }

    // Crear/registrar usuario
    public Usuario registrarUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    // Actualizar usuario
    public Usuario updateUsuario(Integer id, Usuario usuarioActualizado) {
        Optional<Usuario> usuarioExistente = usuarioRepository.findById(id);
    
        if (usuarioExistente.isPresent()) {
            Usuario usuario = usuarioExistente.get();

            // Solo actualizar campos que no sean null
            if (usuarioActualizado.getName() != null) {
                usuario.setName(usuarioActualizado.getName());
            }
            if (usuarioActualizado.getEmail() != null) {
                usuario.setEmail(usuarioActualizado.getEmail());
            }
            // Solo actualizar password si viene con valor
            if (usuarioActualizado.getPassword() != null && !usuarioActualizado.getPassword().trim().isEmpty()) {
                usuario.setPassword(usuarioActualizado.getPassword());
            }
            if (usuarioActualizado.getIsAdmin() != null) {
                usuario.setIsAdmin(usuarioActualizado.getIsAdmin());
            }

            return usuarioRepository.save(usuario);
        }
        return null;
    }

    // Eliminar usuario por id
    public void deleteUsuario(Integer id) {
        usuarioRepository.deleteById(id);
    }

    // Verificar si existe usuario por id
    public boolean existsById(Integer id) {
        return usuarioRepository.existsById(id);
    }

    // Obtener usuario por email
    public Optional<Usuario> getUsuarioByEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }

    // Obtener usuarios por nombre
    public List<Usuario> getUsuariosByName(String name) {
        return usuarioRepository.findByName(name);
    }

    // Búsqueda parcial por nombre
    public List<Usuario> getUsuariosByNameContaining(String name) {
        return usuarioRepository.findByNameContainingIgnoreCase(name);
    }

    // Obtener usuarios administradores
    public List<Usuario> getUsuariosAdmin() {
        return usuarioRepository.findByIsAdmin(true);
    }

    // Obtener usuarios no administradores
    public List<Usuario> getUsuariosNoAdmin() {
        return usuarioRepository.findByIsAdmin(false);
    }

    // Verificar si existe email
    public boolean existsByEmail(String email) {
        return usuarioRepository.existsByEmail(email);
    }

    // Login - verificar email y password
    public Optional<Usuario> login(String email, String password) {
        return usuarioRepository.findByEmailAndPassword(email, password);
    }

    // Obtener todos los emails distintos
    public List<String> getAllEmails() {
        return usuarioRepository.findAllDistinctEmails();
    }
}


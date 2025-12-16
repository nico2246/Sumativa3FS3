package com.fullstack3.demo.repository;

import com.fullstack3.demo.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    // Login simulado por correo + contraseña
    Optional<Usuario> findByCorreoAndContrasena(String correo, String contrasena);

    // Útiles para validaciones
    Optional<Usuario> findByCorreo(String correo);
    boolean existsByCorreo(String correo);
}
package com.fullstack3.demo.service;

import com.fullstack3.demo.model.Usuario;

import java.util.List;
import java.util.Optional;

public interface UsuarioService {

    List<Usuario> getAllUsuarios();

    Optional<Usuario> getUsuarioById(Long idUsuario);

    Usuario createUsuario(Usuario usuario);

    Optional<Usuario> updateUsuario(Long idUsuario, Usuario usuarioActualizado);

    void deleteUsuario(Long idUsuario);

    // Login simulado (por correo + contraseña)
    Optional<Usuario> loginUsuario(String correo, String contrasena);
}
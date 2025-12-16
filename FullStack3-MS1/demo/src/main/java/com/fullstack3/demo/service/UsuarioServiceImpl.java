package com.fullstack3.demo.service;

import com.fullstack3.demo.model.Usuario;
import com.fullstack3.demo.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UsuarioServiceImpl implements UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioServiceImpl(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Usuario> getAllUsuarios() {
        return usuarioRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Usuario> getUsuarioById(Long idUsuario) {
        return usuarioRepository.findById(idUsuario);
    }

    @Override
    public Usuario createUsuario(Usuario usuario) {
        // Evitar correos duplicados (simple)
        if (usuario.getCorreo() != null && usuarioRepository.existsByCorreo(usuario.getCorreo())) {
            throw new IllegalArgumentException("El correo ya está registrado.");
        }
        return usuarioRepository.save(usuario);
    }

    @Override
    public Optional<Usuario> updateUsuario(Long idUsuario, Usuario usuarioActualizado) {
        return usuarioRepository.findById(idUsuario).map(existing -> {
            // Actualiza campos básicos (educativo)
            existing.setNombre(usuarioActualizado.getNombre());
            existing.setCorreo(usuarioActualizado.getCorreo());
            existing.setContrasena(usuarioActualizado.getContrasena());
            existing.setRol(usuarioActualizado.getRol());
            return usuarioRepository.save(existing);
        });
    }

    @Override
    public void deleteUsuario(Long idUsuario) {
        usuarioRepository.deleteById(idUsuario);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Usuario> loginUsuario(String correo, String contrasena) {
        return usuarioRepository.findByCorreoAndContrasena(correo, contrasena);
    }
}

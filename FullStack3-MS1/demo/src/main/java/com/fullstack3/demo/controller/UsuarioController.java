package com.fullstack3.demo.controller;

import com.fullstack3.demo.model.Usuario;
import com.fullstack3.demo.service.UsuarioService;
import com.fullstack3.demo.dto.LoginRequest;
import com.fullstack3.demo.exception.UserNotFoundException;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "http://localhost:4200")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    // GET /usuarios
    @GetMapping
    public ResponseEntity<List<Usuario>> getAll() {
        return ResponseEntity.ok(usuarioService.getAllUsuarios());
    }

    // GET /usuarios/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> getById(@PathVariable Long id) {
        Usuario usuario = usuarioService.getUsuarioById(id)
                .orElseThrow(() -> new UserNotFoundException("Usuario con ID " + id + " no existe"));
        return ResponseEntity.ok(usuario);
    }

    // POST /usuarios
    @PostMapping
    public ResponseEntity<Usuario> create(@Valid @RequestBody Usuario usuario) {
        Usuario created = usuarioService.createUsuario(usuario);
        return ResponseEntity.created(URI.create("/usuarios/" + created.getIdUsuario()))
                .body(created);
    }

    // PUT /usuarios/{id}
    @PutMapping("/{id}")
    public ResponseEntity<Usuario> update(@PathVariable Long id, @Valid @RequestBody Usuario usuario) {
        Usuario updated = usuarioService.updateUsuario(id, usuario)
                .orElseThrow(() -> new UserNotFoundException("Usuario con ID " + id + " no existe"));
        return ResponseEntity.ok(updated);
    }

    // DELETE /usuarios/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (usuarioService.getUsuarioById(id).isEmpty()) {
            throw new UserNotFoundException("Usuario con ID " + id + " no existe");
        }
        usuarioService.deleteUsuario(id);
        return ResponseEntity.noContent().build();
    }

    // POST /usuarios/login
    @PostMapping("/login")
    public ResponseEntity<String> login(@Valid @RequestBody LoginRequest request) {
        boolean ok = usuarioService.loginUsuario(request.getCorreo(), request.getContrasena()).isPresent();
        if (ok) {
            return ResponseEntity.ok("Login exitoso.");
        }
        return ResponseEntity.status(401).body("Credenciales incorrectas.");
    }
}

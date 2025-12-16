package com.fullstack3.demo.controller;

import com.fullstack3.demo.model.AsignacionAnalisis;
import com.fullstack3.demo.service.AsignacionAnalisisService;
import com.fullstack3.demo.exception.AsignacionNotFoundException;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/asignaciones")
@CrossOrigin(origins = "http://localhost:4200")
public class AsignacionAnalisisController {

    private final AsignacionAnalisisService asignacionService;

    public AsignacionAnalisisController(AsignacionAnalisisService asignacionService) {
        this.asignacionService = asignacionService;
    }

    // GET /asignaciones
    @GetMapping
    public ResponseEntity<List<AsignacionAnalisis>> getAll() {
        return ResponseEntity.ok(asignacionService.getAll());
    }

    // GET /asignaciones/{id}
    @GetMapping("/{id}")
    public ResponseEntity<AsignacionAnalisis> getById(@PathVariable Long id) {
        AsignacionAnalisis asignacion = asignacionService.getById(id)
                .orElseThrow(() -> new AsignacionNotFoundException("Asignación con ID " + id + " no existe"));
        return ResponseEntity.ok(asignacion);
    }

    // GET /asignaciones/laboratorio/{idLab}
    @GetMapping("/laboratorio/{idLab}")
    public ResponseEntity<List<AsignacionAnalisis>> getByLaboratorio(@PathVariable Long idLab) {
        return ResponseEntity.ok(asignacionService.getByLaboratorioId(idLab));
    }

    // POST /asignaciones
    @PostMapping
    public ResponseEntity<AsignacionAnalisis> create(@Valid @RequestBody AsignacionAnalisis asignacion) {
        AsignacionAnalisis created = asignacionService.create(asignacion);
        return ResponseEntity
                .created(URI.create("/asignaciones/" + created.getIdAsignacion()))
                .body(created);
    }

    // PUT /asignaciones/{id}
    @PutMapping("/{id}")
    public ResponseEntity<AsignacionAnalisis> update(@PathVariable Long id,
                                                     @Valid @RequestBody AsignacionAnalisis asignacion) {
        AsignacionAnalisis updated = asignacionService.update(id, asignacion)
                .orElseThrow(() -> new AsignacionNotFoundException("Asignación con ID " + id + " no existe"));
        return ResponseEntity.ok(updated);
    }

    // DELETE /asignaciones/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (asignacionService.getById(id).isEmpty()) {
            throw new AsignacionNotFoundException("Asignación con ID " + id + " no existe");
        }
        asignacionService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

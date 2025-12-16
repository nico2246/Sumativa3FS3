package com.fullstack3.demo.controller;

import com.fullstack3.demo.model.Laboratorio;
import com.fullstack3.demo.service.LaboratorioService;
import com.fullstack3.demo.exception.LaboratorioNotFoundException;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/laboratorios")
@CrossOrigin(origins = "http://localhost:4200")
public class LaboratorioController {

    private final LaboratorioService laboratorioService;

    public LaboratorioController(LaboratorioService laboratorioService) {
        this.laboratorioService = laboratorioService;
    }

    // GET /laboratorios
    @GetMapping
    public ResponseEntity<List<Laboratorio>> getAll() {
        return ResponseEntity.ok(laboratorioService.getAll());
    }

    // GET /laboratorios/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Laboratorio> getById(@PathVariable Long id) {
        Laboratorio lab = laboratorioService.getById(id)
                .orElseThrow(() -> new LaboratorioNotFoundException("Laboratorio con ID " + id + " no existe"));
        return ResponseEntity.ok(lab);
    }

    // POST /laboratorios
    @PostMapping
    public ResponseEntity<Laboratorio> create(@Valid @RequestBody Laboratorio laboratorio) {
        Laboratorio created = laboratorioService.create(laboratorio);
        return ResponseEntity
                .created(URI.create("/laboratorios/" + created.getIdLab()))
                .body(created);
    }

    // PUT /laboratorios/{id}
    @PutMapping("/{id}")
    public ResponseEntity<Laboratorio> update(@PathVariable Long id, @Valid @RequestBody Laboratorio laboratorio) {
        Laboratorio updated = laboratorioService.update(id, laboratorio)
                .orElseThrow(() -> new LaboratorioNotFoundException("Laboratorio con ID " + id + " no existe"));
        return ResponseEntity.ok(updated);
    }

    // DELETE /laboratorios/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (laboratorioService.getById(id).isEmpty()) {
            throw new LaboratorioNotFoundException("Laboratorio con ID " + id + " no existe");
        }
        laboratorioService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

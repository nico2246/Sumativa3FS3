package com.fullstack3.demo.controller;

import com.fullstack3.demo.dto.ResultadoAnalisisRequest;
import com.fullstack3.demo.dto.ResultadoAnalisisResponse;
import com.fullstack3.demo.service.ResultadoAnalisisService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/resultados")
@CrossOrigin(origins = "http://localhost:4200")
public class ResultadoAnalisisController {

    private final ResultadoAnalisisService service;

    public ResultadoAnalisisController(ResultadoAnalisisService service) {
        this.service = service;
    }

    // GET /resultados
    @GetMapping
    public ResponseEntity<List<ResultadoAnalisisResponse>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    // GET /resultados/{id}
    @GetMapping("/{id}")
    public ResponseEntity<ResultadoAnalisisResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    // GET /resultados/asignacion/{idAsignacion}
    @GetMapping("/asignacion/{idAsignacion}")
    public ResponseEntity<ResultadoAnalisisResponse> getByAsignacion(@PathVariable Long idAsignacion) {
        return ResponseEntity.ok(service.getByAsignacion(idAsignacion));
    }

    // GET /resultados/laboratorio/{idLab}
    @GetMapping("/laboratorio/{idLab}")
    public ResponseEntity<List<ResultadoAnalisisResponse>> getByLaboratorio(@PathVariable Long idLab) {
        return ResponseEntity.ok(service.getByLaboratorio(idLab));
    }

    // POST /resultados
    @PostMapping
    public ResponseEntity<ResultadoAnalisisResponse> create(@Valid @RequestBody ResultadoAnalisisRequest request) {
        ResultadoAnalisisResponse created = service.create(request);
        return ResponseEntity.created(URI.create("/resultados/" + created.getIdResultado()))
                .body(created);
    }

    // PUT /resultados/{id}
    @PutMapping("/{id}")
    public ResponseEntity<ResultadoAnalisisResponse> update(@PathVariable Long id,
                                                           @Valid @RequestBody ResultadoAnalisisRequest request) {
        return ResponseEntity.ok(service.update(id, request));
    }

    // DELETE /resultados/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}

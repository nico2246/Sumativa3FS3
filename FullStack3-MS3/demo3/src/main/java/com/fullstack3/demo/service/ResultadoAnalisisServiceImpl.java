package com.fullstack3.demo.service;

import com.fullstack3.demo.dto.ResultadoAnalisisRequest;
import com.fullstack3.demo.dto.ResultadoAnalisisResponse;
import com.fullstack3.demo.exception.ResultadoAlreadyExistsException;
import com.fullstack3.demo.exception.ResultadoNotFoundException;
import com.fullstack3.demo.model.ResultadoAnalisis;
import com.fullstack3.demo.repository.ResultadoAnalisisRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@Transactional
public class ResultadoAnalisisServiceImpl implements ResultadoAnalisisService {

    private final ResultadoAnalisisRepository repository;

    public ResultadoAnalisisServiceImpl(ResultadoAnalisisRepository repository) {
        this.repository = repository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<ResultadoAnalisisResponse> getAll() {
        return repository.findAll().stream().map(this::toResponse).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public ResultadoAnalisisResponse getById(Long idResultado) {
        ResultadoAnalisis r = repository.findById(idResultado)
            .orElseThrow(() -> new ResultadoNotFoundException("Resultado con ID " + idResultado + " no existe"));
        return toResponse(r);
    }

    @Override
    @Transactional(readOnly = true)
    public ResultadoAnalisisResponse getByAsignacion(Long idAsignacion) {
        ResultadoAnalisis r = repository.findByIdAsignacion(idAsignacion)
            .orElseThrow(() -> new ResultadoNotFoundException("No existe resultado para la asignación " + idAsignacion));
        return toResponse(r);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ResultadoAnalisisResponse> getByLaboratorio(Long idLab) {
        return repository.findByLaboratorioId(idLab).stream().map(this::toResponse).toList();
    }

    @Override
    public ResultadoAnalisisResponse create(ResultadoAnalisisRequest request) {
        // Regla: 1 resultado por asignación
        if (repository.existsByIdAsignacion(request.getIdAsignacion())) {
            throw new ResultadoAlreadyExistsException("Ya existe resultado para la asignación " + request.getIdAsignacion());
        }

        ResultadoAnalisis entity = new ResultadoAnalisis();
        entity.setIdAsignacion(request.getIdAsignacion());
        entity.setFechaResultado(request.getFechaResultado() != null ? request.getFechaResultado() : LocalDate.now());
        entity.setResultadoCualitativo(request.getResultadoCualitativo());
        entity.setResultadoCuantitativo(request.getResultadoCuantitativo());
        entity.setUnidad(request.getUnidad());
        entity.setObservacion(request.getObservacion());

        ResultadoAnalisis saved = repository.save(entity);
        return toResponse(saved);
    }

    @Override
    public ResultadoAnalisisResponse update(Long idResultado, ResultadoAnalisisRequest request) {
        ResultadoAnalisis existing = repository.findById(idResultado)
            .orElseThrow(() -> new ResultadoNotFoundException("Resultado con ID " + idResultado + " no existe"));

        // Si intentan cambiar la asignación, hay que cuidar la unicidad
        Long nuevaAsignacion = request.getIdAsignacion();
        if (nuevaAsignacion != null && !nuevaAsignacion.equals(existing.getIdAsignacion())) {
            if (repository.existsByIdAsignacion(nuevaAsignacion)) {
                throw new ResultadoAlreadyExistsException("Ya existe resultado para la asignación " + nuevaAsignacion);
            }
            existing.setIdAsignacion(nuevaAsignacion);
        }

        existing.setFechaResultado(request.getFechaResultado() != null ? request.getFechaResultado() : existing.getFechaResultado());
        existing.setResultadoCualitativo(request.getResultadoCualitativo());
        existing.setResultadoCuantitativo(request.getResultadoCuantitativo());
        existing.setUnidad(request.getUnidad());
        existing.setObservacion(request.getObservacion());

        ResultadoAnalisis saved = repository.save(existing);
        return toResponse(saved);
    }

    @Override
    public void delete(Long idResultado) {
        if (!repository.existsById(idResultado)) {
            throw new ResultadoNotFoundException("Resultado con ID " + idResultado + " no existe");
        }
        repository.deleteById(idResultado);
    }

    private ResultadoAnalisisResponse toResponse(ResultadoAnalisis r) {
        return new ResultadoAnalisisResponse(
            r.getIdResultado(),
            r.getIdAsignacion(),
            r.getFechaResultado(),
            r.getResultadoCualitativo(),
            r.getResultadoCuantitativo(),
            r.getUnidad(),
            r.getObservacion()
        );
    }
}

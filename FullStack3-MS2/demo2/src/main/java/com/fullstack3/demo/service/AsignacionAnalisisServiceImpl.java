package com.fullstack3.demo.service;

import com.fullstack3.demo.model.AsignacionAnalisis;
import com.fullstack3.demo.repository.AsignacionAnalisisRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class AsignacionAnalisisServiceImpl implements AsignacionAnalisisService {

    private final AsignacionAnalisisRepository asignacionAnalisisRepository;

    public AsignacionAnalisisServiceImpl(AsignacionAnalisisRepository asignacionAnalisisRepository) {
        this.asignacionAnalisisRepository = asignacionAnalisisRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<AsignacionAnalisis> getAll() {
        return asignacionAnalisisRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<AsignacionAnalisis> getById(Long idAsignacion) {
        return asignacionAnalisisRepository.findById(idAsignacion);
    }

    @Override
    public AsignacionAnalisis create(AsignacionAnalisis asignacion) {
        // Reglas simples: debe venir asociado a un laboratorio
        if (asignacion.getLaboratorio() == null) {
            throw new IllegalArgumentException("La asignación debe estar asociada a un laboratorio.");
        }
        return asignacionAnalisisRepository.save(asignacion);
    }

    @Override
    public Optional<AsignacionAnalisis> update(Long idAsignacion, AsignacionAnalisis asignacionActualizada) {
        return asignacionAnalisisRepository.findById(idAsignacion).map(existente -> {
            existente.setNombreAnalisis(asignacionActualizada.getNombreAnalisis());
            existente.setFechaAsignacion(asignacionActualizada.getFechaAsignacion());
            existente.setLaboratorio(asignacionActualizada.getLaboratorio());
            return asignacionAnalisisRepository.save(existente);
        });
    }

    @Override
    public void delete(Long idAsignacion) {
        asignacionAnalisisRepository.deleteById(idAsignacion);
    }

    @Override
    @Transactional(readOnly = true)
    public List<AsignacionAnalisis> getByLaboratorioId(Long idLab) {
        return asignacionAnalisisRepository.findByLaboratorio_IdLab(idLab);
    }
}
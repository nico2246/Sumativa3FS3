package com.fullstack3.demo.service;

import com.fullstack3.demo.model.Laboratorio;
import com.fullstack3.demo.repository.LaboratorioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class LaboratorioServiceImpl implements LaboratorioService {

    private final LaboratorioRepository laboratorioRepository;

    public LaboratorioServiceImpl(LaboratorioRepository laboratorioRepository) {
        this.laboratorioRepository = laboratorioRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Laboratorio> getAll() {
        return laboratorioRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Laboratorio> getById(Long idLab) {
        return laboratorioRepository.findById(idLab);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Laboratorio> getByNombre(String nombre) {
        return laboratorioRepository.findByNombre(nombre);
    }

    @Override
    public Laboratorio create(Laboratorio laboratorio) {
        if (laboratorio.getNombre() != null && laboratorioRepository.existsByNombre(laboratorio.getNombre())) {
            throw new IllegalArgumentException("Ya existe un laboratorio con ese nombre.");
        }
        return laboratorioRepository.save(laboratorio);
    }

    @Override
    public Optional<Laboratorio> update(Long idLab, Laboratorio laboratorioActualizado) {
        return laboratorioRepository.findById(idLab).map(existente -> {
            existente.setNombre(laboratorioActualizado.getNombre());
            existente.setDireccion(laboratorioActualizado.getDireccion());
            existente.setTelefono(laboratorioActualizado.getTelefono());
            return laboratorioRepository.save(existente);
        });
    }

    @Override
    public void delete(Long idLab) {
        laboratorioRepository.deleteById(idLab);
    }
}
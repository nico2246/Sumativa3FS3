package com.fullstack3.demo.service;

import com.fullstack3.demo.model.AsignacionAnalisis;

import java.util.List;
import java.util.Optional;

public interface AsignacionAnalisisService {

    List<AsignacionAnalisis> getAll();

    Optional<AsignacionAnalisis> getById(Long idAsignacion);

    AsignacionAnalisis create(AsignacionAnalisis asignacion);

    Optional<AsignacionAnalisis> update(Long idAsignacion, AsignacionAnalisis asignacionActualizada);

    void delete(Long idAsignacion);

    List<AsignacionAnalisis> getByLaboratorioId(Long idLab);
}
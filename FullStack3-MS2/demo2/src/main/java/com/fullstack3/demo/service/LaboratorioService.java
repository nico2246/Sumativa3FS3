package com.fullstack3.demo.service;

import com.fullstack3.demo.model.Laboratorio;

import java.util.List;
import java.util.Optional;

public interface LaboratorioService {

    List<Laboratorio> getAll();

    Optional<Laboratorio> getById(Long idLab);

    Optional<Laboratorio> getByNombre(String nombre);

    Laboratorio create(Laboratorio laboratorio);

    Optional<Laboratorio> update(Long idLab, Laboratorio laboratorioActualizado);

    void delete(Long idLab);
}
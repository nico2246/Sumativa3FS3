package com.fullstack3.demo.repository;

import com.fullstack3.demo.model.AsignacionAnalisis;
import com.fullstack3.demo.model.Laboratorio;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface AsignacionAnalisisRepository extends JpaRepository<AsignacionAnalisis, Long> {

    // Listar asignaciones por laboratorio
    List<AsignacionAnalisis> findByLaboratorio(Laboratorio laboratorio);

    // Variante por ID del laboratorio (útil para endpoints)
    List<AsignacionAnalisis> findByLaboratorio_IdLab(Long idLab);

    // (Opcional) Filtrar por fecha si lo necesitas en pruebas
    List<AsignacionAnalisis> findByFechaAsignacion(LocalDate fechaAsignacion);
}
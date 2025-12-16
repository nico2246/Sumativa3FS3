package com.fullstack3.demo.repository;

import com.fullstack3.demo.model.ResultadoAnalisis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ResultadoAnalisisRepository extends JpaRepository<ResultadoAnalisis, Long> {

    Optional<ResultadoAnalisis> findByIdAsignacion(Long idAsignacion);

    boolean existsByIdAsignacion(Long idAsignacion);

    // Lista resultados por laboratorio usando JOIN con ASIGNACION_ANALISIS
    @Query(value = """
        SELECT r.*
        FROM RESULTADO_ANALISIS r
        JOIN ASIGNACION_ANALISIS a ON a.ID_ASIGNACION = r.ID_ASIGNACION
        WHERE a.ID_LAB = :idLab
        ORDER BY r.FECHA_RESULTADO DESC
        """, nativeQuery = true)
    List<ResultadoAnalisis> findByLaboratorioId(Long idLab);
}

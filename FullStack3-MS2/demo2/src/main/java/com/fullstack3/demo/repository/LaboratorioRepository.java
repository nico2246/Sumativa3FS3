package com.fullstack3.demo.repository;

import com.fullstack3.demo.model.Laboratorio;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LaboratorioRepository extends JpaRepository<Laboratorio, Long> {

    Optional<Laboratorio> findByNombre(String nombre);

    boolean existsByNombre(String nombre);
    }
    
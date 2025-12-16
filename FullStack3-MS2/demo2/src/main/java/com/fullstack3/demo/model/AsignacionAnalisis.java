package com.fullstack3.demo.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "ASIGNACION_ANALISIS")
public class AsignacionAnalisis {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_ASIGNACION")
    private Long idAsignacion;

    @Column(name = "NOMBRE_ANALISIS", nullable = false, length = 120)
    private String nombreAnalisis;

    @Column(name = "FECHA_ASIGNACION", nullable = false)
    private LocalDate fechaAsignacion;

    @ManyToOne(optional = false)
    @JoinColumn(name = "ID_LAB", nullable = false)
    private Laboratorio laboratorio;

    // ----- Constructores -----
    public AsignacionAnalisis() {}

    public AsignacionAnalisis(String nombreAnalisis, LocalDate fechaAsignacion, Laboratorio laboratorio) {
        this.nombreAnalisis = nombreAnalisis;
        this.fechaAsignacion = fechaAsignacion;
        this.laboratorio = laboratorio;
    }

    // ----- Getters/Setters -----
    public Long getIdAsignacion() {
        return idAsignacion;
    }

    public void setIdAsignacion(Long idAsignacion) {
        this.idAsignacion = idAsignacion;
    }

    public String getNombreAnalisis() {
        return nombreAnalisis;
    }

    public void setNombreAnalisis(String nombreAnalisis) {
        this.nombreAnalisis = nombreAnalisis;
    }

    public LocalDate getFechaAsignacion() {
        return fechaAsignacion;
    }

    public void setFechaAsignacion(LocalDate fechaAsignacion) {
        this.fechaAsignacion = fechaAsignacion;
    }

    public Laboratorio getLaboratorio() {
        return laboratorio;
    }

    public void setLaboratorio(Laboratorio laboratorio) {
        this.laboratorio = laboratorio;
    }
}
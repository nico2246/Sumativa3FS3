package com.fullstack3.demo.dto;

import java.time.LocalDate;

public class AsignacionAnalisisResponse {

    private Long idAsignacion;
    private String nombreAnalisis;
    private LocalDate fechaAsignacion;
    private Long idLab;

    public AsignacionAnalisisResponse(Long idAsignacion, String nombreAnalisis, LocalDate fechaAsignacion, Long idLab) {
        this.idAsignacion = idAsignacion;
        this.nombreAnalisis = nombreAnalisis;
        this.fechaAsignacion = fechaAsignacion;
        this.idLab = idLab;
    }

    // Getters y setters
    public Long getIdAsignacion() { return idAsignacion; }
    public void setIdAsignacion(Long idAsignacion) { this.idAsignacion = idAsignacion; }
    public String getNombreAnalisis() { return nombreAnalisis; }
    public void setNombreAnalisis(String nombreAnalisis) { this.nombreAnalisis = nombreAnalisis; }
    public LocalDate getFechaAsignacion() { return fechaAsignacion; }
    public void setFechaAsignacion(LocalDate fechaAsignacion) { this.fechaAsignacion = fechaAsignacion; }
    public Long getIdLab() { return idLab; }
    public void setIdLab(Long idLab) { this.idLab = idLab; }
}

package com.fullstack3.demo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public class AsignacionAnalisisRequest {

    @NotBlank(message = "Nombre del análisis es obligatorio")
    private String nombreAnalisis;

    @NotNull(message = "Fecha de asignación es obligatoria")
    private LocalDate fechaAsignacion;

    @NotNull(message = "ID de laboratorio es obligatorio")
    private Long idLab;

    // Getters y setters
    public String getNombreAnalisis() { return nombreAnalisis; }
    public void setNombreAnalisis(String nombreAnalisis) { this.nombreAnalisis = nombreAnalisis; }
    public LocalDate getFechaAsignacion() { return fechaAsignacion; }
    public void setFechaAsignacion(LocalDate fechaAsignacion) { this.fechaAsignacion = fechaAsignacion; }
    public Long getIdLab() { return idLab; }
    public void setIdLab(Long idLab) { this.idLab = idLab; }
}

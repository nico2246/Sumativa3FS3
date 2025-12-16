package com.fullstack3.demo.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.math.BigDecimal;


public class ResultadoAnalisisRequest {

    @NotNull(message = "ID de asignación es obligatorio")
    private Long idAsignacion;

    // Opcional: si viene null, el service lo setea a hoy
    private LocalDate fechaResultado;

    @Size(max = 200, message = "Resultado cualitativo no debe exceder 200 caracteres")
    private String resultadoCualitativo;

    private BigDecimal resultadoCuantitativo;

    @Size(max = 30, message = "Unidad no debe exceder 30 caracteres")
    private String unidad;

    @Size(max = 500, message = "Observación no debe exceder 500 caracteres")
    private String observacion;

    public Long getIdAsignacion() { return idAsignacion; }
    public void setIdAsignacion(Long idAsignacion) { this.idAsignacion = idAsignacion; }

    public LocalDate getFechaResultado() { return fechaResultado; }
    public void setFechaResultado(LocalDate fechaResultado) { this.fechaResultado = fechaResultado; }

    public String getResultadoCualitativo() { return resultadoCualitativo; }
    public void setResultadoCualitativo(String resultadoCualitativo) { this.resultadoCualitativo = resultadoCualitativo; }

    public BigDecimal getResultadoCuantitativo() { return resultadoCuantitativo; }
    public void setResultadoCuantitativo(BigDecimal resultadoCuantitativo) { this.resultadoCuantitativo = resultadoCuantitativo; }

    public String getUnidad() { return unidad; }
    public void setUnidad(String unidad) { this.unidad = unidad; }

    public String getObservacion() { return observacion; }
    public void setObservacion(String observacion) { this.observacion = observacion; }
}

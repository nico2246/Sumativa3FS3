package com.fullstack3.demo.dto;

import java.time.LocalDate;

import java.math.BigDecimal;


public class ResultadoAnalisisResponse {

    private Long idResultado;
    private Long idAsignacion;
    private LocalDate fechaResultado;
    private String resultadoCualitativo;
    private BigDecimal resultadoCuantitativo;
    private String unidad;
    private String observacion;

    public ResultadoAnalisisResponse(Long idResultado, Long idAsignacion, LocalDate fechaResultado,
                                    String resultadoCualitativo, BigDecimal resultadoCuantitativo,
                                    String unidad, String observacion) {
        this.idResultado = idResultado;
        this.idAsignacion = idAsignacion;
        this.fechaResultado = fechaResultado;
        this.resultadoCualitativo = resultadoCualitativo;
        this.resultadoCuantitativo = resultadoCuantitativo;
        this.unidad = unidad;
        this.observacion = observacion;
    }

    public Long getIdResultado() { return idResultado; }
    public void setIdResultado(Long idResultado) { this.idResultado = idResultado; }

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

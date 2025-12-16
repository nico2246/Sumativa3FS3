package com.fullstack3.demo.model;

import jakarta.persistence.*;

import java.math.BigDecimal;

import java.time.LocalDate;

@Entity
@Table(
    name = "RESULTADO_ANALISIS",
    uniqueConstraints = @UniqueConstraint(name = "UK_RESULTADO_ASIGNACION", columnNames = "ID_ASIGNACION")
)
public class ResultadoAnalisis {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_RESULTADO")
    private Long idResultado;

    @Column(name = "ID_ASIGNACION", nullable = false)
    private Long idAsignacion;

    @Column(name = "FECHA_RESULTADO", nullable = false)
    private LocalDate fechaResultado;

    @Column(name = "RESULTADO_CUALITATIVO", length = 200)
    private String resultadoCualitativo;

    @Column(name = "RESULTADO_CUANTITATIVO", precision = 10, scale = 2)
    private BigDecimal resultadoCuantitativo;

    @Column(name = "UNIDAD", length = 30)
    private String unidad;

    @Column(name = "OBSERVACION", length = 500)
    private String observacion;

    public ResultadoAnalisis() {}

    public ResultadoAnalisis(Long idAsignacion, LocalDate fechaResultado, String resultadoCualitativo,
                             BigDecimal resultadoCuantitativo, String unidad, String observacion) {
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

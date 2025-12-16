package com.fullstack3.demo.dto;

public class LaboratorioResponse {

    private Long idLab;
    private String nombre;
    private String ubicacion;

    public LaboratorioResponse(Long idLab, String nombre, String ubicacion) {
        this.idLab = idLab;
        this.nombre = nombre;
        this.ubicacion = ubicacion;
    }

    // Getters y setters
    public Long getIdLab() { return idLab; }
    public void setIdLab(Long idLab) { this.idLab = idLab; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getUbicacion() { return ubicacion; }
    public void setUbicacion(String ubicacion) { this.ubicacion = ubicacion; }
}

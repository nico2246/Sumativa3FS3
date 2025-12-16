package com.fullstack3.demo.dto;

import jakarta.validation.constraints.NotBlank;

public class LaboratorioRequest {

    @NotBlank(message = "Nombre del laboratorio es obligatorio")
    private String nombre;

    @NotBlank(message = "Ubicación del laboratorio es obligatoria")
    private String ubicacion;

    // Getters y setters
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getUbicacion() { return ubicacion; }
    public void setUbicacion(String ubicacion) { this.ubicacion = ubicacion; }
}

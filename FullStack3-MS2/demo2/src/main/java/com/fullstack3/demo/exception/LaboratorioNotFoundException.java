package com.fullstack3.demo.exception;

public class LaboratorioNotFoundException extends RuntimeException {
    public LaboratorioNotFoundException(String message) {
        super(message);
    }
}

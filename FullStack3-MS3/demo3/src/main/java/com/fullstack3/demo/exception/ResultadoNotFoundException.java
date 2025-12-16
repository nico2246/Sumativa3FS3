package com.fullstack3.demo.exception;

public class ResultadoNotFoundException extends RuntimeException {
    public ResultadoNotFoundException(String message) {
        super(message);
    }
}

package com.fullstack3.demo.exception;

public class ResultadoAlreadyExistsException extends RuntimeException {
    public ResultadoAlreadyExistsException(String message) {
        super(message);
    }
}


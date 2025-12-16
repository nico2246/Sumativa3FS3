package com.fullstack3.demo.advice;

import com.fullstack3.demo.exception.AsignacionNotFoundException;
import com.fullstack3.demo.exception.ResultadoAlreadyExistsException;
import com.fullstack3.demo.exception.ResultadoNotFoundException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandlerResultados {

    @ExceptionHandler(ResultadoNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleResultadoNotFound(ResultadoNotFoundException ex, WebRequest request) {
        return build(HttpStatus.NOT_FOUND, "Resultado no encontrado", ex.getMessage(), request);
    }

    @ExceptionHandler(AsignacionNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleAsignacionNotFound(AsignacionNotFoundException ex, WebRequest request) {
        return build(HttpStatus.BAD_REQUEST, "Asignación inválida", ex.getMessage(), request);
    }

    @ExceptionHandler(ResultadoAlreadyExistsException.class)
    public ResponseEntity<Map<String, Object>> handleResultadoAlreadyExists(ResultadoAlreadyExistsException ex, WebRequest request) {
        return build(HttpStatus.CONFLICT, "Resultado ya existe", ex.getMessage(), request);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Map<String, Object>> handleDataIntegrity(DataIntegrityViolationException ex, WebRequest request) {
        // Útil para FK o UNIQUE violados en BD
        return build(HttpStatus.BAD_REQUEST, "Violación de integridad", "Datos inválidos o relación inexistente.", request);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
            errors.put(error.getField(), error.getDefaultMessage())
        );

        Map<String, Object> body = new HashMap<>();
        body.put("timestamp", LocalDateTime.now());
        body.put("status", HttpStatus.BAD_REQUEST.value());
        body.put("error", "Error de validación");
        body.put("messages", errors);

        return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleAllExceptions(Exception ex, WebRequest request) {
        return build(HttpStatus.INTERNAL_SERVER_ERROR, "Error interno del servidor", ex.getMessage(), request);
    }

    private ResponseEntity<Map<String, Object>> build(HttpStatus status, String error, String message, WebRequest request) {
        Map<String, Object> body = new HashMap<>();
        body.put("timestamp", LocalDateTime.now());
        body.put("status", status.value());
        body.put("error", error);
        body.put("message", message);
        body.put("path", request.getDescription(false).replace("uri=", ""));
        return new ResponseEntity<>(body, status);
    }
}

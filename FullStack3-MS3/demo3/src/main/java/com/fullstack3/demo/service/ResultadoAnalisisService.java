package com.fullstack3.demo.service;

import com.fullstack3.demo.dto.ResultadoAnalisisRequest;
import com.fullstack3.demo.dto.ResultadoAnalisisResponse;

import java.util.List;

public interface ResultadoAnalisisService {

    List<ResultadoAnalisisResponse> getAll();

    ResultadoAnalisisResponse getById(Long idResultado);

    ResultadoAnalisisResponse getByAsignacion(Long idAsignacion);

    List<ResultadoAnalisisResponse> getByLaboratorio(Long idLab);

    ResultadoAnalisisResponse create(ResultadoAnalisisRequest request);

    ResultadoAnalisisResponse update(Long idResultado, ResultadoAnalisisRequest request);

    void delete(Long idResultado);
}

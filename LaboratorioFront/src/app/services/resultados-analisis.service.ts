import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


export interface ResultadoAnalisis {
  idResultado?: number;
  valor?: string;
  observacion?: string;
  fechaResultado?: string; // yyyy-mm-dd
  idAsignacion?: number;
}

export interface CrearResultadoRequest {
  valor: string;
  observacion?: string;
  fechaResultado: string;   // yyyy-mm-dd
  idAsignacion: number;
}

@Injectable({ providedIn: 'root' })
export class ResultadoAnalisisService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.api.resultados}/resultados`;

  getAll() {
    return this.http.get<ResultadoAnalisis[]>(this.baseUrl);
  }

  create(payload: CrearResultadoRequest) {
    return this.http.post<ResultadoAnalisis>(this.baseUrl, payload);
  }
}

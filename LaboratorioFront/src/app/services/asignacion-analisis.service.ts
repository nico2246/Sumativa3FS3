import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface AsignacionAnalisis {
  idAsignacion: number;
  nombreAnalisis: string;
  fechaAsignacion: string; // ISO yyyy-mm-dd
  laboratorio: { idLab: number; nombre?: string; direccion?: string; telefono?: string };
}

export interface CrearAsignacionRequest {
  nombreAnalisis: string;
  fechaAsignacion: string; // yyyy-mm-dd
  laboratorio: { idLab: number };
}

@Injectable({ providedIn: 'root' })
export class AsignacionAnalisisService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.api.asignaciones}/asignaciones`;

  getAll() {
    return this.http.get<AsignacionAnalisis[]>(this.baseUrl);
  }

  create(payload: CrearAsignacionRequest) {
    return this.http.post<AsignacionAnalisis>(this.baseUrl, payload);
  }

  getByLaboratorio(idLab: number) {
    return this.http.get<AsignacionAnalisis[]>(`${this.baseUrl}/laboratorio/${idLab}`);
  }
}

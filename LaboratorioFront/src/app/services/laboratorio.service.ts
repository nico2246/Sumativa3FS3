import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface Laboratorio {
  idLab: number;
  nombre: string;
  direccion?: string;
  telefono?: string;
}

@Injectable({ providedIn: 'root' })
export class LaboratorioService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.api.asignaciones}/laboratorios`;

  getAll() {
    return this.http.get<Laboratorio[]>(this.baseUrl);
  }

  getById(idLab: number) {
    return this.http.get<Laboratorio>(`${this.baseUrl}/${idLab}`);
  }
}

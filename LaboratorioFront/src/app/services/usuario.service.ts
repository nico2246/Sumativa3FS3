import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface CrearUsuarioRequest {
  nombre: string;
  correo: string;
  contrasena: string;
  rol: { idRol: number };
}

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.api.usuarios}/usuarios`;

  crearUsuario(req: CrearUsuarioRequest) {
    return this.http.post(this.baseUrl, req);
  }
}

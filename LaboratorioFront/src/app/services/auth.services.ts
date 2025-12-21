import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { LocalStorageUtils } from '../utils/local-storage.util';
import { environment } from '../../environments/environment';

export interface LoginRequest {
  correo: string;
  contrasena: string;
}

export interface Rol {
  idRol: number;
  nombre?: string;
}

export interface Usuario {
  idUsuario: number;
  nombre: string;
  correo: string;
  contrasena: string;
  rol: Rol;
}

export interface Session {
  correo: string;
  idUsuario: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private storage = inject(LocalStorageUtils);

  private readonly SESSION_KEY = 'session';
  private readonly baseUrl = `${environment.api.usuarios}/usuarios`;

  login(payload: LoginRequest) {
    const url = `${this.baseUrl}/login`;

    return this.http.post(url, payload, { responseType: 'text' }).pipe(
      switchMap(() => this.http.get<Usuario[]>(this.baseUrl)),
      map((usuarios) => usuarios.find(u => u.correo === payload.correo)),
      tap((u) => {
        if (!u) throw new Error('Usuario no encontrado tras login');
        const session: Session = { correo: u.correo, idUsuario: u.idUsuario };
        this.storage.set(this.SESSION_KEY, session);
      }),
      map(() => true),
      catchError((_err: any) => of(false))
    );
  }

  logout(): void {
    this.storage.remove(this.SESSION_KEY);
  }

  isLoggedIn(): boolean {
    return this.getSession() !== null;
  }

  getSession(): Session | null {
    return this.storage.get<Session>(this.SESSION_KEY);
  }

  getUsuarioActivo(): Session | null {
    return this.getSession();
  }

  getPerfil() {
    const session = this.getSession();
    if (!session) return of(null);

    return this.http.get<Usuario>(`${this.baseUrl}/${session.idUsuario}`).pipe(
      catchError((_err: HttpErrorResponse) => of(null))
    );
  }

  /**
   * ✅ Actualiza perfil sin romper validación:
   * hace GET del usuario actual y luego PUT con objeto completo.
   */
  updatePerfil(changes: { nombre?: string; contrasena?: string }) {
    const session = this.getSession();
    if (!session) return of(false);

    return this.http.get<Usuario>(`${this.baseUrl}/${session.idUsuario}`).pipe(
      switchMap((actual) => {
        const actualizado: Usuario = {
          ...actual,
          nombre: changes.nombre ?? actual.nombre,
          contrasena: changes.contrasena ? changes.contrasena : actual.contrasena,
        };
        return this.http.put<Usuario>(`${this.baseUrl}/${session.idUsuario}`, actualizado);
      }),
      map(() => true),
      catchError((_err: HttpErrorResponse) => of(false))
    );
  }
}

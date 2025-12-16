import { Injectable } from '@angular/core';
import { safeLocalStorage } from '../utils/local-storage.util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioPrueba = {
    username: 'admin',
    password: '1234',
    nombre: 'Administrador del Sistema'
  };

  login(username: string, password: string): boolean {
    if (username === this.usuarioPrueba.username && password === this.usuarioPrueba.password) {
      safeLocalStorage.setItem('usuarioActivo', JSON.stringify(this.usuarioPrueba));
      return true;
    }
    return false;
  }

  logout(): void {
    safeLocalStorage.removeItem('usuarioActivo');
  }

  getUsuarioActivo() {
    const data = safeLocalStorage.getItem('usuarioActivo');
    return data ? JSON.parse(data) : null;
  }

  isLoggedIn(): boolean {
    return safeLocalStorage.getItem('usuarioActivo') !== null;
  }
}

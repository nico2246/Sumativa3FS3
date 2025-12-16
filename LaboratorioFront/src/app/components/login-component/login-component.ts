import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar';
import { AuthService } from '../../services/auth.services';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, NavbarComponent],
  template: `
    <app-navbar></app-navbar>

    <div class="form-container">
      <h2>Login</h2>

      <form (ngSubmit)="login()">
        <input
          type="text"
          placeholder="Usuario"
          [(ngModel)]="usuario"
          name="usuario"
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          [(ngModel)]="password"
          name="password"
          required
        />

        <button type="submit">Ingresar</button>
      </form>

      <p *ngIf="errorMsg" class="error-text">{{ errorMsg }}</p>

      <p>¿No tienes cuenta? <a routerLink="/register">Regístrate</a></p>
    </div>
  `,
  styles: [`
    .form-container {
      max-width: 400px;
      margin: 50px auto;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 8px;
      text-align: center;
    }
    input {
      display: block;
      width: 100%;
      margin: 10px 0;
      padding: 8px;
    }
    button {
      width: 100%;
      padding: 10px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background-color: #0056b3;
    }
    .error-text {
      color: red;
      margin-top: 10px;
    }
  `]
})
export class LoginComponent {
  
  usuario: string = '';
  password: string = '';
  errorMsg: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    const ok = this.authService.login(this.usuario, this.password);

    if (ok) {
      this.router.navigate(['/home']);
    } else {
      this.errorMsg = 'Usuario o contraseña incorrectos';
    }
  }
}


import {Routes } from '@angular/router';

import { LoginComponent } from './components/login-component/login-component';
import { RegistroComponent } from './components/registro-component/registro-component';
import { HomeComponent } from './components/home-component/home-component';
import { ProfileComponent } from './components/perfil-component/perfil-component';
import { ForgotPasswordComponent } from './/components/forgotpassword-component/forgotPassword-component';
import { LaboratoriosComponent } from './components/laboratorios-component/laboratorios-component';
import { ResultadosComponent } from './components/resultados-component/resultados-component';
import { AsignacionesComponent } from './components/asignaciones-component/asignaciones-component';

import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  /* =======================
     RUTAS PÚBLICAS
     ======================= */
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistroComponent },
  { path: 'recuperar-contrasena', component: ForgotPasswordComponent },

  /* =======================
     RUTAS PROTEGIDAS
     ======================= */
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'perfil',
    component: ProfileComponent,
    canActivate: [authGuard],
  },
  {
    path: 'laboratorios',
    component: LaboratoriosComponent,
    canActivate: [authGuard],
  },

 
  {
    path: 'resultados',
    component: ResultadosComponent,
    canActivate: [authGuard],
  },


  {
    path: 'asignaciones',
    component: AsignacionesComponent,
    canActivate: [authGuard],
  },
 

  /* =======================
     DEFAULT Y 404
     ======================= */
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];



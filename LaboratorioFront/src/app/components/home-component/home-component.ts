import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar';
import { AuthService, Session } from '../../services/auth.services';
import { LaboratorioService, Laboratorio } from '../../services/laboratorio.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './home-component.html',
  styleUrls: ['./home-component.css'],
})
export class HomeComponent implements OnInit {
  usuarioActivo: Session | null = null;

  laboratorios: Laboratorio[] = [];
  loadingLabs = true;
  errorLabs = '';
examenes: any;

  constructor(
    private readonly authService: AuthService,
    private readonly laboratorioService: LaboratorioService
  ) {}

  ngOnInit(): void {
    this.usuarioActivo = this.authService.getSession();
    this.cargarLaboratorios();
  }

  cargarLaboratorios(): void {
    this.errorLabs = '';
    this.loadingLabs = true;

    this.laboratorioService.getAll().subscribe({
      next: (data) => {
        this.laboratorios = data;
        this.loadingLabs = false;
      },
      error: () => {
        this.errorLabs = 'No se pudieron cargar los laboratorios.';
        this.loadingLabs = false;
      },
    });
  }
}

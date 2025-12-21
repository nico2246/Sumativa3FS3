import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar';
import { Laboratorio, LaboratorioService } from '../../services/laboratorio.service';

@Component({
  selector: 'app-laboratorios',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  template: `
    <app-navbar></app-navbar>

    <div class="container mt-4">
      <h2>Laboratorios</h2>

      <p *ngIf="loading" class="text-muted">Cargando...</p>
      <div *ngIf="error" class="alert alert-danger">{{ error }}</div>

      <ul class="list-group" *ngIf="!loading && !error">
        <li class="list-group-item" *ngFor="let lab of laboratorios">
          <div class="d-flex justify-content-between">
            <div>
              <strong>{{ lab.nombre }}</strong><br />
              <small class="text-muted">{{ lab.direccion || 'Sin dirección' }}</small>
            </div>
            <small class="text-muted">{{ lab.telefono || '' }}</small>
          </div>
        </li>
      </ul>

      <p *ngIf="!loading && !error && laboratorios.length === 0" class="text-muted">
        No hay laboratorios registrados.
      </p>
    </div>
  `,
})
export class LaboratoriosComponent implements OnInit {
  laboratorios: Laboratorio[] = [];
  loading = false;
  error = '';

  constructor(private laboratorioService: LaboratorioService) {}

  ngOnInit(): void {
    this.loading = true;
    this.laboratorioService.getAll().subscribe({
      next: (data) => {
        this.laboratorios = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar los laboratorios.';
        this.loading = false;
      },
    });
  }
}

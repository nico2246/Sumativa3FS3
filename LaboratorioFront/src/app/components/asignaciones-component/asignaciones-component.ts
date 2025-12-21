import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar';
import { Laboratorio, LaboratorioService } from '../../services/laboratorio.service';
import { AsignacionAnalisis, AsignacionAnalisisService } from '../../services/asignacion-analisis.service';

@Component({
  selector: 'app-asignaciones',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  template: `
    <app-navbar></app-navbar>

    <div class="container mt-4">
      <h2>Asignaciones de Análisis</h2>

      <!-- Crear -->
      <div class="card p-3 mb-4">
        <h5 class="mb-3">Nueva asignación</h5>

        <div class="row g-2">
          <div class="col-md-4">
            <input class="form-control" placeholder="Nombre análisis"
              [(ngModel)]="nombreAnalisis" name="nombreAnalisis" />
          </div>

          <div class="col-md-3">
            <input class="form-control" type="date"
              [(ngModel)]="fechaAsignacion" name="fechaAsignacion" />
          </div>

          <div class="col-md-3">
            <select class="form-select" [(ngModel)]="idLabSeleccionado" name="idLabSeleccionado">
              <option [ngValue]="null">Seleccione laboratorio</option>
              <option *ngFor="let lab of laboratorios" [ngValue]="lab.idLab">
                {{ lab.nombre }}
              </option>
            </select>
          </div>

          <div class="col-md-2 d-grid">
            <button class="btn btn-primary" (click)="crear()" [disabled]="creating">
              {{ creating ? 'Creando...' : 'Crear' }}
            </button>
          </div>
        </div>

        <div *ngIf="createError" class="alert alert-danger mt-3">{{ createError }}</div>
        <div *ngIf="createOk" class="alert alert-success mt-3">{{ createOk }}</div>
      </div>

      <!-- Lista -->
      <p *ngIf="loading" class="text-muted">Cargando asignaciones...</p>
      <div *ngIf="error" class="alert alert-danger">{{ error }}</div>

      <table class="table table-striped" *ngIf="!loading && !error">
        <thead>
          <tr>
            <th>ID</th>
            <th>Análisis</th>
            <th>Fecha</th>
            <th>Laboratorio</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let a of asignaciones">
            <td>{{ a.idAsignacion }}</td>
            <td>{{ a.nombreAnalisis }}</td>
            <td>{{ a.fechaAsignacion }}</td>
            <td>{{ a.laboratorio?.nombre || ('ID ' + a.laboratorio?.idLab) }}</td>
          </tr>
        </tbody>
      </table>

      <p *ngIf="!loading && !error && asignaciones.length === 0" class="text-muted">
        No hay asignaciones registradas.
      </p>
    </div>
  `,
})
export class AsignacionesComponent implements OnInit {
  laboratorios: Laboratorio[] = [];
  asignaciones: AsignacionAnalisis[] = [];

  loading = false;
  error = '';

  nombreAnalisis = '';
  fechaAsignacion = this.hoyISO();
  idLabSeleccionado: number | null = null;

  creating = false;
  createError = '';
  createOk = '';

  constructor(
    private laboratorioService: LaboratorioService,
    private asignacionService: AsignacionAnalisisService
  ) {}

  ngOnInit(): void {
    this.cargarLaboratorios();
    this.cargarAsignaciones();
  }

  cargarLaboratorios() {
    this.laboratorioService.getAll().subscribe({
      next: (labs) => (this.laboratorios = labs),
      error: () => (this.laboratorios = []),
    });
  }

  cargarAsignaciones() {
    this.loading = true;
    this.error = '';
    this.asignacionService.getAll().subscribe({
      next: (data) => {
        this.asignaciones = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar las asignaciones.';
        this.loading = false;
      },
    });
  }

  crear() {
    this.createError = '';
    this.createOk = '';

    if (!this.nombreAnalisis.trim()) {
      this.createError = 'El nombre del análisis es obligatorio.';
      return;
    }
    if (!this.fechaAsignacion) {
      this.createError = 'La fecha es obligatoria.';
      return;
    }
    if (!this.idLabSeleccionado) {
      this.createError = 'Debe seleccionar un laboratorio.';
      return;
    }

    this.creating = true;

    this.asignacionService.create({
      nombreAnalisis: this.nombreAnalisis.trim(),
      fechaAsignacion: this.fechaAsignacion,
      laboratorio: { idLab: this.idLabSeleccionado },
    }).subscribe({
      next: () => {
        this.creating = false;
        this.createOk = 'Asignación creada correctamente.';
        this.nombreAnalisis = '';
        this.idLabSeleccionado = null;
        this.cargarAsignaciones();
      },
      error: (err) => {
        this.creating = false;
        this.createError = err?.error?.message || 'No se pudo crear la asignación.';
      },
    });
  }

  private static pad(n: number) { return n < 10 ? `0${n}` : `${n}`; }
  private hoyISO(): string {
    const d = new Date();
    return `${d.getFullYear()}-${AsignacionesComponent.pad(d.getMonth() + 1)}-${AsignacionesComponent.pad(d.getDate())}`;
  }
}

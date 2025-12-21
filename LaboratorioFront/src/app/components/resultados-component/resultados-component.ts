import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar';
import { ResultadoAnalisis, ResultadoAnalisisService } from '../../services/resultados-analisis.service';

@Component({
  selector: 'app-resultados',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  template: `
    <app-navbar></app-navbar>

    <div class="container mt-4">
      <h2>Resultados de Análisis</h2>

      <!-- Crear -->
      <div class="card p-3 mb-4">
        <h5 class="mb-3">Nuevo resultado</h5>

        <div class="row g-2">
          <div class="col-md-3">
            <input class="form-control" type="number" placeholder="ID Asignación"
              [(ngModel)]="idAsignacion" name="idAsignacion" />
          </div>

          <div class="col-md-3">
            <input class="form-control" type="date"
              [(ngModel)]="fechaResultado" name="fechaResultado" />
          </div>

          <div class="col-md-3">
            <input class="form-control" placeholder="Valor"
              [(ngModel)]="valor" name="valor" />
          </div>

          <div class="col-md-3">
            <input class="form-control" placeholder="Observación (opcional)"
              [(ngModel)]="observacion" name="observacion" />
          </div>

          <div class="col-12 d-grid mt-2">
            <button class="btn btn-primary" (click)="crear()" [disabled]="creating">
              {{ creating ? 'Guardando...' : 'Guardar resultado' }}
            </button>
          </div>
        </div>

        <div *ngIf="createError" class="alert alert-danger mt-3">{{ createError }}</div>
        <div *ngIf="createOk" class="alert alert-success mt-3">{{ createOk }}</div>

        <small class="text-muted">
          
        </small>
      </div>

      <!-- Lista -->
      <p *ngIf="loading" class="text-muted">Cargando resultados...</p>
      <div *ngIf="error" class="alert alert-danger">{{ error }}</div>

      <table class="table table-striped" *ngIf="!loading && !error">
        <thead>
          <tr>
            <th>ID</th>
            <th>ID Asignación</th>
            <th>Fecha</th>
            <th>Valor</th>
            <th>Obs.</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let r of resultados">
            <td>{{ r.idResultado || '-' }}</td>
            <td>{{ r.idAsignacion || '-' }}</td>
            <td>{{ r.fechaResultado || '-' }}</td>
            <td>{{ r.valor || '-' }}</td>
            <td>{{ r.observacion || '-' }}</td>
          </tr>
        </tbody>
      </table>

      <p *ngIf="!loading && !error && resultados.length === 0" class="text-muted">
        No hay resultados registrados.
      </p>
    </div>
  `,
})
export class ResultadosComponent implements OnInit {
  resultados: ResultadoAnalisis[] = [];
  loading = false;
  error = '';

  // formulario
  idAsignacion: number | null = null;
  fechaResultado = this.hoyISO();
  valor = '';
  observacion = '';

  creating = false;
  createError = '';
  createOk = '';

  constructor(private resultadosService: ResultadoAnalisisService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar() {
    this.loading = true;
    this.error = '';
    this.resultadosService.getAll().subscribe({
      next: (data) => {
        this.resultados = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar los resultados.';
        this.loading = false;
      },
    });
  }

  crear() {
    this.createError = '';
    this.createOk = '';

    if (!this.idAsignacion) {
      this.createError = 'Debe indicar el ID de la asignación.';
      return;
    }
    if (!this.fechaResultado) {
      this.createError = 'Debe indicar la fecha.';
      return;
    }
    if (!this.valor.trim()) {
      this.createError = 'Debe indicar un valor.';
      return;
    }

    this.creating = true;
    this.resultadosService.create({
      idAsignacion: this.idAsignacion,
      fechaResultado: this.fechaResultado,
      valor: this.valor.trim(),
      observacion: this.observacion?.trim() || undefined,
    }).subscribe({
      next: () => {
        this.creating = false;
        this.createOk = 'Resultado guardado correctamente.';
        this.valor = '';
        this.observacion = '';
        this.idAsignacion = null;
        this.cargar();
      },
      error: (err) => {
        this.creating = false;
        this.createError = err?.error?.message || 'No se pudo guardar el resultado.';
      },
    });
  }

  private static pad(n: number) { return n < 10 ? `0${n}` : `${n}`; }
  private hoyISO(): string {
    const d = new Date();
    return `${d.getFullYear()}-${ResultadosComponent.pad(d.getMonth() + 1)}-${ResultadosComponent.pad(d.getDate())}`;
  }
}

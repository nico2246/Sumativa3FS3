import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';

import { AsignacionesComponent } from './asignaciones-component';
import { LaboratorioService } from '../../services/laboratorio.service';
import { AsignacionAnalisisService } from '../../services/asignacion-analisis.service';
import { AuthService } from '../../services/auth.services';

describe('AsignacionesComponent', () => {
  let fixture: ComponentFixture<AsignacionesComponent>;
  let component: AsignacionesComponent;

  let labSvc: any;
  let asigSvc: any;

  const authMock: any = {
    getSession: () => null,
    isLoggedIn: () => false,
    logout: () => {},
  };

  beforeEach(async () => {
    labSvc = {
      getAll: () => of([{ idLab: 1, nombre: 'Lab 1' }]),
    };

    asigSvc = {
      getAll: () =>
        of([
          {
            idAsignacion: 10,
            nombreAnalisis: 'Hemograma',
            fechaAsignacion: '2025-12-15',
            laboratorio: { idLab: 1, nombre: 'Lab 1' },
          },
        ]),
      create: (_payload: any) => of({}),
    };

    await TestBed.configureTestingModule({
      imports: [AsignacionesComponent, RouterTestingModule.withRoutes([])],
      providers: [
        { provide: LaboratorioService, useValue: labSvc },
        { provide: AsignacionAnalisisService, useValue: asigSvc },
        { provide: AuthService, useValue: authMock }, // por Navbar
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AsignacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // dispara ngOnInit()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit: debe cargar laboratorios y asignaciones (happy path)', () => {
    expect(component.laboratorios.length).toBe(1);
    expect(component.asignaciones.length).toBe(1);
    expect(component.loading).toBe(false);
    expect(component.error).toBe('');
  });

  it('cargarAsignaciones: si falla debe setear error y loading=false', () => {
    asigSvc.getAll = () => throwError(() => new Error('fail'));

    component.cargarAsignaciones();

    expect(component.loading).toBe(false);
    expect(component.error).toBe('No se pudieron cargar las asignaciones.');
  });

  it('crear: validaciones -> nombre vacío', () => {
    component.nombreAnalisis = '   ';
    component.fechaAsignacion = '2025-12-15';
    component.idLabSeleccionado = 1;

    component.crear();

    expect(component.createError).toBe('El nombre del análisis es obligatorio.');
    expect(component.creating).toBe(false);
  });

  it('crear: validaciones -> fecha vacía', () => {
    component.nombreAnalisis = 'A';
    component.fechaAsignacion = '';
    component.idLabSeleccionado = 1;

    component.crear();

    expect(component.createError).toBe('La fecha es obligatoria.');
    expect(component.creating).toBe(false);
  });

  it('crear: validaciones -> laboratorio no seleccionado', () => {
    component.nombreAnalisis = 'A';
    component.fechaAsignacion = '2025-12-15';
    component.idLabSeleccionado = null;

    component.crear();

    expect(component.createError).toBe('Debe seleccionar un laboratorio.');
    expect(component.creating).toBe(false);
  });

  it('crear: éxito -> muestra ok, limpia campos y recarga asignaciones', () => {
    let recargo = 0;
    const original = component.cargarAsignaciones.bind(component);
    component.cargarAsignaciones = () => {
      recargo++;
      original();
    };

    component.nombreAnalisis = '  Glucosa  ';
    component.fechaAsignacion = '2025-12-15';
    component.idLabSeleccionado = 1;

    component.crear();

    expect(component.creating).toBe(false);
    expect(component.createOk).toBe('Asignación creada correctamente.');
    expect(component.createError).toBe('');
    expect(component.nombreAnalisis).toBe('');
    expect(component.idLabSeleccionado).toBeNull();
    expect(recargo).toBeGreaterThan(0);
  });

  it('crear: error backend -> muestra mensaje desde err.error.message', () => {
    asigSvc.create = (_payload: any) =>
      throwError(() => ({ error: { message: 'Duplicado' } }));

    component.nombreAnalisis = 'A';
    component.fechaAsignacion = '2025-12-15';
    component.idLabSeleccionado = 1;

    component.crear();

    expect(component.creating).toBe(false);
    expect(component.createOk).toBe('');
    expect(component.createError).toBe('Duplicado');
  });

  it('crear: error backend sin message -> muestra mensaje por defecto', () => {
    asigSvc.create = (_payload: any) => throwError(() => ({}));

    component.nombreAnalisis = 'A';
    component.fechaAsignacion = '2025-12-15';
    component.idLabSeleccionado = 1;

    component.crear();

    expect(component.creating).toBe(false);
    expect(component.createError).toBe('No se pudo crear la asignación.');
  });
});

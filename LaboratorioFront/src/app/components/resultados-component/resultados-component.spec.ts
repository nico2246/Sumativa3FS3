import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';

import { ResultadosComponent } from './resultados-component';
import { ResultadoAnalisisService } from '../../services/resultados-analisis.service';
import { AuthService } from '../../services/auth.services';

describe('ResultadosComponent', () => {
  let fixture: ComponentFixture<ResultadosComponent>;
  let component: ResultadosComponent;

  let resSvc: any;

  const authMock: any = {
    getSession: () => null,
    isLoggedIn: () => false,
    logout: () => {},
  };

  beforeEach(async () => {
    resSvc = {
      getAll: () =>
        of([
          {
            idResultado: 1,
            idAsignacion: 10,
            fechaResultado: '2025-12-15',
            valor: 'OK',
            observacion: 'obs',
          },
        ]),
      create: (_payload: any) => of({}),
    };

    await TestBed.configureTestingModule({
      imports: [ResultadosComponent, RouterTestingModule.withRoutes([])],
      providers: [
        { provide: ResultadoAnalisisService, useValue: resSvc },
        { provide: AuthService, useValue: authMock }, // por Navbar
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ResultadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // dispara ngOnInit -> cargar()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit/cargar: success -> carga resultados y apaga loading', () => {
    expect(component.loading).toBe(false);
    expect(component.error).toBe('');
    expect(component.resultados.length).toBe(1);
    expect(component.resultados[0].idAsignacion).toBe(10);
  });

  it('cargar: error -> setea error y apaga loading', () => {
    resSvc.getAll = () => throwError(() => new Error('fail'));

    component.cargar();

    expect(component.loading).toBe(false);
    expect(component.error).toBe('No se pudieron cargar los resultados.');
  });

  it('crear: validación -> falta idAsignacion', () => {
    component.idAsignacion = null;
    component.fechaResultado = '2025-12-15';
    component.valor = 'A';

    component.crear();

    expect(component.createError).toBe('Debe indicar el ID de la asignación.');
    expect(component.creating).toBe(false);
  });

  it('crear: validación -> falta fechaResultado', () => {
    component.idAsignacion = 10;
    component.fechaResultado = '';
    component.valor = 'A';

    component.crear();

    expect(component.createError).toBe('Debe indicar la fecha.');
    expect(component.creating).toBe(false);
  });

  it('crear: validación -> valor vacío', () => {
    component.idAsignacion = 10;
    component.fechaResultado = '2025-12-15';
    component.valor = '   ';

    component.crear();

    expect(component.createError).toBe('Debe indicar un valor.');
    expect(component.creating).toBe(false);
  });

  it('crear: éxito -> muestra ok, limpia campos y recarga lista', () => {
    let recargo = 0;
    const original = component.cargar.bind(component);
    component.cargar = () => {
      recargo++;
      original();
    };

    component.idAsignacion = 10;
    component.fechaResultado = '2025-12-15';
    component.valor = '  7.8  ';
    component.observacion = '  nota  ';

    component.crear();

    expect(component.creating).toBe(false);
    expect(component.createOk).toBe('Resultado guardado correctamente.');
    expect(component.createError).toBe('');

    expect(component.valor).toBe('');
    expect(component.observacion).toBe('');
    expect(component.idAsignacion).toBeNull();

    expect(recargo).toBeGreaterThan(0);
  });

  it('crear: error backend -> usa err.error.message', () => {
    resSvc.create = (_payload: any) =>
      throwError(() => ({ error: { message: 'No permitido' } }));

    component.idAsignacion = 10;
    component.fechaResultado = '2025-12-15';
    component.valor = 'A';

    component.crear();

    expect(component.creating).toBe(false);
    expect(component.createOk).toBe('');
    expect(component.createError).toBe('No permitido');
  });

  it('crear: error backend sin message -> mensaje por defecto', () => {
    resSvc.create = (_payload: any) => throwError(() => ({}));

    component.idAsignacion = 10;
    component.fechaResultado = '2025-12-15';
    component.valor = 'A';

    component.crear();

    expect(component.creating).toBe(false);
    expect(component.createError).toBe('No se pudo guardar el resultado.');
  });
});

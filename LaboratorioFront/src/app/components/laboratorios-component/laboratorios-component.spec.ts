import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';

import { LaboratoriosComponent } from './laboratorios-component';
import { LaboratorioService } from '../../services/laboratorio.service';
import { AuthService } from '../../services/auth.services';

describe('LaboratoriosComponent', () => {
  let fixture: ComponentFixture<LaboratoriosComponent>;
  let component: LaboratoriosComponent;

  let labSvc: any;

  const authMock: any = {
    getSession: () => null,
    isLoggedIn: () => false,
    logout: () => {},
  };

  beforeEach(async () => {
    labSvc = {
      getAll: () => of([{ idLab: 1, nombre: 'Lab 1', direccion: 'Dir 1' }]),
    };

    await TestBed.configureTestingModule({
      imports: [LaboratoriosComponent, RouterTestingModule.withRoutes([])],
      providers: [
        { provide: LaboratorioService, useValue: labSvc },
        { provide: AuthService, useValue: authMock }, // por Navbar
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LaboratoriosComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges(); // dispara ngOnInit
    expect(component).toBeTruthy();
  });

  it('ngOnInit: success -> carga laboratorios y apaga loading', () => {
    fixture.detectChanges();

    expect(component.loading).toBe(false);
    expect(component.error).toBe('');
    expect(component.laboratorios.length).toBe(1);
    expect(component.laboratorios[0].nombre).toBe('Lab 1');
  });

  it('ngOnInit: error -> setea mensaje y apaga loading', () => {
    labSvc.getAll = () => throwError(() => new Error('fail'));

    fixture.detectChanges();

    expect(component.loading).toBe(false);
    expect(component.laboratorios.length).toBe(0);
    expect(component.error).toBe('No se pudieron cargar los laboratorios.');
  });
});

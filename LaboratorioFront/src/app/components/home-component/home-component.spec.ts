import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';

import { HomeComponent } from './home-component';
import { AuthService } from '../../services/auth.services';
import { LaboratorioService } from '../../services/laboratorio.service';

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;

  const authMock = {
    getSession: () => ({ correo: 'nico@test.com', idUsuario: 1 }),
    isLoggedIn: () => true,
    logout: () => {},
  };

  it('debe cargar laboratorios correctamente', () => {
    const labsMock = [{ idLab: 1, nombre: 'Lab 1', direccion: 'Dir' }];

    const labServiceMock = {
      getAll: () => of(labsMock),
    };

    TestBed.configureTestingModule({
      imports: [HomeComponent, RouterTestingModule], // ✅ FIX ActivatedRoute/RouterLink
      providers: [
        { provide: AuthService, useValue: authMock },
        { provide: LaboratorioService, useValue: labServiceMock },
      ],
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;

    // Para que no rompa el ngFor de examenes
    component.examenes = [];

    fixture.detectChanges();

    expect(component.loadingLabs).toBe(false);
    expect(component.errorLabs).toBe('');
    expect(component.laboratorios.length).toBe(1);
    expect(component.laboratorios[0].nombre).toBe('Lab 1');
  });

  it('debe manejar error al cargar laboratorios', () => {
    const labServiceMock = {
      getAll: () => throwError(() => new Error('fail')),
    };

    TestBed.configureTestingModule({
      imports: [HomeComponent, RouterTestingModule], // ✅ FIX ActivatedRoute/RouterLink
      providers: [
        { provide: AuthService, useValue: authMock },
        { provide: LaboratorioService, useValue: labServiceMock },
      ],
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;

    component.examenes = [];

    fixture.detectChanges();

    expect(component.loadingLabs).toBe(false);
    expect(component.errorLabs).toBe('No se pudieron cargar los laboratorios.');
    expect(component.laboratorios.length).toBe(0);
  });
});

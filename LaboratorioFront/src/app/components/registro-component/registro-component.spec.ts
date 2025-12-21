import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';

import { RegistroComponent } from './registro-component';
import { UsuarioService } from '../../services/usuario.service';
import { AuthService } from '../../services/auth.services';

describe('RegistroComponent', () => {
  let fixture: ComponentFixture<RegistroComponent>;
  let component: RegistroComponent;

  let navigatedTo: any[] | null = null;

  let router: Router;
  let originalNavigate!: Router['navigate'];

  const usuarioServiceMock: any = {
    crearUsuario: (_payload: any) => of({}),
  };

  const authMock: any = {
    // Navbar usa esto
    getSession: () => null,
    isLoggedIn: () => false,
    logout: () => {},
  };

  beforeEach(async () => {
    navigatedTo = null;

    await TestBed.configureTestingModule({
      imports: [RegistroComponent, RouterTestingModule.withRoutes([])],
      providers: [
        { provide: UsuarioService, useValue: usuarioServiceMock },
        { provide: AuthService, useValue: authMock },
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    originalNavigate = router.navigate.bind(router);

    router.navigate = (commands: any[]) => {
      navigatedTo = commands;
      return Promise.resolve(true);
    };

    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    if (router && originalNavigate) {
      router.navigate = originalNavigate;
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('registrar: éxito -> muestra successMsg, apaga loading y navega a /login luego de 800ms', fakeAsync(() => {
    usuarioServiceMock.crearUsuario = (_payload: any) => of({});

    component.nombre = 'Nico';
    component.correo = 'nico@test.com';
    component.contrasena = '123';

    component.registrar();

    expect(component.loading).toBe(false);
    expect(component.errorMsg).toBe('');
    expect(component.successMsg).toContain('Usuario creado correctamente');

    tick(799);
    expect(navigatedTo).toBeNull();

    tick(1);
    expect(navigatedTo).toEqual(['/login']);
  }));

  it('registrar: error -> muestra errorMsg y apaga loading (no navega)', () => {
    usuarioServiceMock.crearUsuario = (_payload: any) =>
      throwError(() => ({ error: { message: 'Correo duplicado' } }));

    component.nombre = 'Nico';
    component.correo = 'nico@test.com';
    component.contrasena = '123';

    component.registrar();

    expect(component.loading).toBe(false);
    expect(component.successMsg).toBe('');
    expect(component.errorMsg).toBe('Correo duplicado');
    expect(navigatedTo).toBeNull();
  });

  it('registrar: error sin message -> muestra mensaje por defecto', () => {
    usuarioServiceMock.crearUsuario = (_payload: any) =>
      throwError(() => ({}));

    component.nombre = 'Nico';
    component.correo = 'nico@test.com';
    component.contrasena = '123';

    component.registrar();

    expect(component.loading).toBe(false);
    expect(component.successMsg).toBe('');
    expect(component.errorMsg).toBe('No se pudo registrar. Verifica los datos e intenta nuevamente.');
    expect(navigatedTo).toBeNull();
  });
});

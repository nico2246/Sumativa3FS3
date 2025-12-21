import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';

import { LoginComponent } from './login-component';
import { AuthService } from '../../services/auth.services';

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let component: LoginComponent;

  let navigatedTo: any[] | null = null;

  let router: Router;
  let originalNavigate!: Router['navigate'];

  const authMock: any = {
    // Navbar usa esto
    getSession: () => null,
    isLoggedIn: () => false,
    logout: () => {},

    // Login usa esto
    login: (_payload: any) => of(true),
  };

  beforeEach(async () => {
    navigatedTo = null;

    await TestBed.configureTestingModule({
      imports: [LoginComponent, RouterTestingModule.withRoutes([])],
      providers: [{ provide: AuthService, useValue: authMock }],
    }).compileComponents();

    router = TestBed.inject(Router);
    originalNavigate = router.navigate.bind(router);

    router.navigate = (commands: any[]) => {
      navigatedTo = commands;
      return Promise.resolve(true);
    };

    fixture = TestBed.createComponent(LoginComponent);
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

  it('login: si AuthService.login retorna true debe navegar a /home', () => {
    authMock.login = (_: any) => of(true);

    component.correo = 'a@a.com';
    component.contrasena = '123';
    component.login();

    expect(component.errorMsg).toBe('');
    expect(navigatedTo).toEqual(['/home']);
  });

  it('login: si AuthService.login retorna false debe mostrar error de credenciales', () => {
    authMock.login = (_: any) => of(false);

    component.correo = 'a@a.com';
    component.contrasena = 'bad';
    component.login();

    expect(component.errorMsg).toBe('Usuario o contraseña incorrectos');
    expect(navigatedTo).toBeNull();
  });

  it('login: si AuthService.login lanza error debe mostrar error de servidor', () => {
    authMock.login = (_: any) => throwError(() => new Error('server'));

    component.correo = 'a@a.com';
    component.contrasena = '123';
    component.login();

    expect(component.errorMsg).toBe('Error al conectar con el servidor');
    expect(navigatedTo).toBeNull();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ProfileComponent } from './perfil-component'; // si tu archivo se llama distinto, ajusta aquí
import { AuthService } from '../../services/auth.services';

describe('ProfileComponent', () => {
  let fixture: ComponentFixture<ProfileComponent>;
  let component: ProfileComponent;

  let updatePayloads: any[] = [];
  let alerts = 0;

  const prevAlert = window.alert;

  const authMock: any = {
    // usado por NavbarComponent
    getSession: () => ({ correo: 'nico@test.com', idUsuario: 1 }),
    isLoggedIn: () => true,
    logout: () => {},

    // usado por ProfileComponent
    getPerfil: () =>
      of({
        idUsuario: 1,
        nombre: 'Nico',
        correo: 'nico@test.com',
        contrasena: 'x',
        rol: { idRol: 1, nombre: 'USER' },
      }),
    updatePerfil: (payload: any) => {
      updatePayloads.push(payload);
      return of(true);
    },
  };

  beforeEach(async () => {
    updatePayloads = [];
    alerts = 0;

    (window as any).alert = () => { alerts++; };

    await TestBed.configureTestingModule({
      imports: [ProfileComponent, RouterTestingModule], // ✅ FIX ActivatedRoute/RouterLink
      providers: [{ provide: AuthService, useValue: authMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    (window as any).alert = prevAlert;
  });

  it('debe cargar perfil y poblar el formulario', () => {
    const raw = component.form.getRawValue();
    expect(raw.nombre).toBe('Nico');
    expect(raw.correo).toBe('nico@test.com');
    expect(raw.rol).toBe('USER');
  });

  it('guardar: si contraseñas no coinciden -> error y no llama updatePerfil', () => {
    component.form.patchValue({
      nombre: 'Nico',
      nuevaContrasena: '123',
      repetirContrasena: '456',
    });

    component.guardar();

    expect(component.errorMsg).toBe('Las contraseñas no coinciden.');
    expect(updatePayloads.length).toBe(0);
    expect(alerts).toBe(0);
  });

  it('guardar: cambia solo nombre -> llama updatePerfil sin contrasena y alerta', () => {
    component.form.patchValue({
      nombre: 'Nuevo Nombre',
      nuevaContrasena: '',
      repetirContrasena: '',
    });

    component.guardar();

    expect(updatePayloads.length).toBe(1);
    expect(updatePayloads[0].nombre).toBe('Nuevo Nombre');
    expect(updatePayloads[0].contrasena).toBeUndefined();
    expect(alerts).toBe(1);
  });

  it('guardar: cambia contraseña -> llama updatePerfil con contrasena y alerta', () => {
    component.form.patchValue({
      nombre: 'Nico',
      nuevaContrasena: 'abc',
      repetirContrasena: 'abc',
    });

    component.guardar();

    expect(updatePayloads.length).toBe(1);
    expect(updatePayloads[0].contrasena).toBe('abc');
    expect(alerts).toBe(1);
  });
});

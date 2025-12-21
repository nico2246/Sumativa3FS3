import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService, Usuario } from './auth.services';
import { LocalStorageUtils } from '../utils/local-storage.util';
import { environment } from '../../environments/environment';

// Mock simple del LocalStorageUtils
class MockLocalStorageUtils {
  private store = new Map<string, any>();

  set(key: string, value: any) {
    this.store.set(key, value);
  }

  get<T>(key: string): T | null {
    return this.store.has(key) ? this.store.get(key) : null;
  }

  remove(key: string) {
    this.store.delete(key);
  }
}

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let storage: MockLocalStorageUtils;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: LocalStorageUtils, useClass: MockLocalStorageUtils }
      ],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    storage = TestBed.inject(LocalStorageUtils) as any;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('login() guarda session y retorna true cuando login OK y encuentra usuario', () => {
    const payload = { correo: 'a@a.com', contrasena: '123' };

    service.login(payload).subscribe((ok) => {
      expect(ok).toBe(true);

      const session = storage.get<any>('session');
      expect(session).not.toBeNull();
      expect(session.correo).toBe('a@a.com');
      expect(session.idUsuario).toBe(1);
    });

    const loginReq = httpMock.expectOne(`${environment.api.usuarios}/usuarios/login`);
    expect(loginReq.request.method).toBe('POST');
    loginReq.flush('Login exitoso.', { status: 200, statusText: 'OK' });

    const listReq = httpMock.expectOne(`${environment.api.usuarios}/usuarios`);
    expect(listReq.request.method).toBe('GET');

    const usuarios: Usuario[] = [{
      idUsuario: 1,
      correo: 'a@a.com',
      nombre: 'A',
      contrasena: 'x',
      rol: { idRol: 1, nombre: 'USER' }
    }];

    listReq.flush(usuarios);
  });

  it('login() retorna false cuando backend responde 401', () => {
    const payload = { correo: 'a@a.com', contrasena: 'bad' };

    service.login(payload).subscribe((ok) => {
      expect(ok).toBe(false);
      expect(storage.get<any>('session')).toBeNull();
    });

    const loginReq = httpMock.expectOne(`${environment.api.usuarios}/usuarios/login`);
    expect(loginReq.request.method).toBe('POST');
    loginReq.flush('Credenciales incorrectas.', { status: 401, statusText: 'Unauthorized' });
  });

  it('getPerfil() llama GET /usuarios/{id} si hay sesión', () => {
    storage.set('session', { correo: 'a@a.com', idUsuario: 5 });

    service.getPerfil().subscribe((u) => {
      expect(u).not.toBeNull();
      expect(u!.idUsuario).toBe(5);
    });

    const req = httpMock.expectOne(`${environment.api.usuarios}/usuarios/5`);
    expect(req.request.method).toBe('GET');

    req.flush({
      idUsuario: 5,
      correo: 'a@a.com',
      nombre: 'A',
      contrasena: 'x',
      rol: { idRol: 1 }
    });
  });

  it('getPerfil() retorna null si no hay sesión y no llama al backend', () => {
    storage.remove('session');

    service.getPerfil().subscribe((u) => {
      expect(u).toBeNull();
    });

    httpMock.expectNone((req) =>
      req.method === 'GET' &&
      req.url.startsWith(`${environment.api.usuarios}/usuarios/`)
    );
  });

  it('updatePerfil() hace GET + PUT completo y retorna true', () => {
    storage.set('session', { correo: 'a@a.com', idUsuario: 7 });

    service.updatePerfil({ nombre: 'Nuevo', contrasena: 'nueva' }).subscribe((ok) => {
      expect(ok).toBe(true);
    });

    const getReq = httpMock.expectOne(`${environment.api.usuarios}/usuarios/7`);
    expect(getReq.request.method).toBe('GET');
    getReq.flush({
      idUsuario: 7,
      correo: 'a@a.com',
      nombre: 'Viejo',
      contrasena: 'old',
      rol: { idRol: 1 }
    });

    const putReq = httpMock.expectOne(`${environment.api.usuarios}/usuarios/7`);
    expect(putReq.request.method).toBe('PUT');
    expect(putReq.request.body.nombre).toBe('Nuevo');
    expect(putReq.request.body.contrasena).toBe('nueva');
    expect(putReq.request.body.rol).toBeTruthy();

    putReq.flush({
      idUsuario: 7,
      correo: 'a@a.com',
      nombre: 'Nuevo',
      contrasena: 'nueva',
      rol: { idRol: 1 }
    });
  });

  it('updatePerfil() retorna false si falla el GET', () => {
    storage.set('session', { correo: 'a@a.com', idUsuario: 9 });

    service.updatePerfil({ nombre: 'X' }).subscribe((ok) => {
      expect(ok).toBe(false);
    });

    const getReq = httpMock.expectOne(`${environment.api.usuarios}/usuarios/9`);
    expect(getReq.request.method).toBe('GET');
    getReq.flush('Error', { status: 500, statusText: 'Server Error' });
  });
});

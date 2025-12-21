import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UsuarioService, CrearUsuarioRequest } from './usuario.service';
import { environment } from '../../environments/environment';

describe('UsuarioService', () => {
  let service: UsuarioService;
  let httpMock: HttpTestingController;

  const baseUrl = `${environment.api.usuarios}/usuarios`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsuarioService],
    });

    service = TestBed.inject(UsuarioService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('crearUsuario should POST baseUrl with request body', () => {
    const payload: CrearUsuarioRequest = {
      nombre: 'Nico',
      correo: 'nico@test.com',
      contrasena: '1234',
      rol: { idRol: 1 },
    };

    const mockResponse = { ok: true };

    service.crearUsuario(payload).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);
    req.flush(mockResponse);
  });

  it('crearUsuario should propagate http error', () => {
    const payload: CrearUsuarioRequest = {
      nombre: 'Nico',
      correo: 'nico@test.com',
      contrasena: '1234',
      rol: { idRol: 1 },
    };

    service.crearUsuario(payload).subscribe({
      next: () => fail('Expected error'),
      error: (err) => {
        expect(err.status).toBe(400);
        expect(err.statusText).toBe('Bad Request');
      },
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('POST');

    req.flush(
      { message: 'Validation error' },
      { status: 400, statusText: 'Bad Request' }
    );
  });
});
function fail(arg0: string): void {
    throw new Error('Function not implemented.');
}


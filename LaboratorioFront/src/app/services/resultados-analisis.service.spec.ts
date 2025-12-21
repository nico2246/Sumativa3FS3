import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {ResultadoAnalisisService, ResultadoAnalisis, CrearResultadoRequest,} from './resultados-analisis.service'
import { environment } from '../../environments/environment';

describe('ResultadoAnalisisService', () => {
  let service: ResultadoAnalisisService;
  let httpMock: HttpTestingController;

  const baseUrl = `${environment.api.resultados}/resultados`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ResultadoAnalisisService],
    });

    service = TestBed.inject(ResultadoAnalisisService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAll should GET baseUrl and return resultados', () => {
    const mock: ResultadoAnalisis[] = [
      {
        idResultado: 1,
        valor: '12.5',
        observacion: 'OK',
        fechaResultado: '2025-12-10',
        idAsignacion: 100,
      },
      {
        idResultado: 2,
        valor: '9.1',
        observacion: 'Bajo',
        fechaResultado: '2025-12-11',
        idAsignacion: 101,
      },
    ];

    service.getAll().subscribe((res) => {
      expect(res).toEqual(mock);
      expect(res.length).toBe(2);
      expect(res[0].idAsignacion).toBe(100);
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mock);
  });

  it('create should POST baseUrl with payload and return created resultado', () => {
    const payload: CrearResultadoRequest = {
      valor: '7.8',
      observacion: 'Normal',
      fechaResultado: '2025-12-12',
      idAsignacion: 200,
    };

    const created: ResultadoAnalisis = {
      idResultado: 999,
      valor: payload.valor,
      observacion: payload.observacion,
      fechaResultado: payload.fechaResultado,
      idAsignacion: payload.idAsignacion,
    };

    service.create(payload).subscribe((res) => {
      expect(res).toEqual(created);
      expect(res.idResultado).toBe(999);
      expect(res.idAsignacion).toBe(200);
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);
    req.flush(created);
  });

  it('create should propagate http error', () => {
    const payload: CrearResultadoRequest = {
      valor: '7.8',
      observacion: 'Normal',
      fechaResultado: '2025-12-12',
      idAsignacion: 200,
    };

    service.create(payload).subscribe({
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


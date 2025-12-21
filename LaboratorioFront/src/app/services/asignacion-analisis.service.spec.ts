import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AsignacionAnalisisService, AsignacionAnalisis, CrearAsignacionRequest } from './asignacion-analisis.service';
import { environment } from '../../environments/environment';

describe('AsignacionAnalisisService', () => {
  let service: AsignacionAnalisisService;
  let httpMock: HttpTestingController;

  const baseUrl = `${environment.api.asignaciones}/asignaciones`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AsignacionAnalisisService],
    });

    service = TestBed.inject(AsignacionAnalisisService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAll should GET baseUrl and return asignaciones', () => {
    const mock: AsignacionAnalisis[] = [
      {
        idAsignacion: 1,
        nombreAnalisis: 'Hemograma',
        fechaAsignacion: '2025-12-01',
        laboratorio: { idLab: 10, nombre: 'Lab A' },
      },
      {
        idAsignacion: 2,
        nombreAnalisis: 'Perfil lipídico',
        fechaAsignacion: '2025-12-02',
        laboratorio: { idLab: 11, nombre: 'Lab B' },
      },
    ];

    service.getAll().subscribe((res) => {
      expect(res).toEqual(mock);
      expect(res.length).toBe(2);
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mock);
  });

  it('create should POST baseUrl with payload and return created asignacion', () => {
    const payload: CrearAsignacionRequest = {
      nombreAnalisis: 'Hemoglobina',
      fechaAsignacion: '2025-12-03',
      laboratorio: { idLab: 10 },
    };

    const created: AsignacionAnalisis = {
      idAsignacion: 99,
      nombreAnalisis: payload.nombreAnalisis,
      fechaAsignacion: payload.fechaAsignacion,
      laboratorio: { idLab: payload.laboratorio.idLab, nombre: 'Lab A' },
    };

    service.create(payload).subscribe((res) => {
      expect(res).toEqual(created);
      expect(res.idAsignacion).toBe(99);
      expect(res.laboratorio.idLab).toBe(10);
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);
    req.flush(created);
  });

  it('getByLaboratorio should GET baseUrl/laboratorio/:idLab and return asignaciones', () => {
    const idLab = 10;
    const mock: AsignacionAnalisis[] = [
      {
        idAsignacion: 1,
        nombreAnalisis: 'Glucosa',
        fechaAsignacion: '2025-12-04',
        laboratorio: { idLab },
      },
    ];

    service.getByLaboratorio(idLab).subscribe((res) => {
      expect(res).toEqual(mock);
      expect(res[0].laboratorio.idLab).toBe(idLab);
    });

    const req = httpMock.expectOne(`${baseUrl}/laboratorio/${idLab}`);
    expect(req.request.method).toBe('GET');
    req.flush(mock);
  });

  it('getAll should propagate http error', () => {
    service.getAll().subscribe({
      next: () => fail('Expected error'),
      error: (err) => {
        expect(err.status).toBe(500);
        expect(err.statusText).toBe('Server Error');
      },
    });

    const req = httpMock.expectOne(baseUrl);
    req.flush({ message: 'boom' }, { status: 500, statusText: 'Server Error' });
  });
});
function fail(arg0: string): void {
    throw new Error('Function not implemented.');
}


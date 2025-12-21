import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LaboratorioService, Laboratorio } from './laboratorio.service';
import { environment } from '../../environments/environment';

describe('LaboratorioService', () => {
  let service: LaboratorioService;
  let httpMock: HttpTestingController;

  const baseUrl = `${environment.api.asignaciones}/laboratorios`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LaboratorioService],
    });

    service = TestBed.inject(LaboratorioService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('getAll() debe hacer GET al endpoint y retornar la lista', () => {
    const mock: Laboratorio[] = [
      { idLab: 1, nombre: 'Lab 1', direccion: 'Dir 1' },
      { idLab: 2, nombre: 'Lab 2' },
    ];

    let result: Laboratorio[] | null = null;

    service.getAll().subscribe((data) => {
      result = data;
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('GET');

    req.flush(mock);

    expect(result).not.toBeNull();
    expect(result!.length).toBe(2);
    expect(result![0].nombre).toBe('Lab 1');
  });

  it('getById(id) debe hacer GET /laboratorios/{id} y retornar el laboratorio', () => {
    const mock: Laboratorio = { idLab: 10, nombre: 'Lab X', telefono: '123' };

    let result: Laboratorio | null = null;

    service.getById(10).subscribe((data) => {
      result = data;
    });

    const req = httpMock.expectOne(`${baseUrl}/10`);
    expect(req.request.method).toBe('GET');

    req.flush(mock);

    expect(result).not.toBeNull();
    expect(result!.idLab).toBe(10);
    expect(result!.nombre).toBe('Lab X');
  });
});

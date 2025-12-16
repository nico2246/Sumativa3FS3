import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';   
import { NavbarComponent } from '../navbar/navbar';
import { AuthService } from '../../services/auth.services';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent,NgFor],      
  templateUrl: './home-component.html',
  styleUrls: ['./home-component.css']
})
export class HomeComponent implements OnInit {

  usuarioActivo: any;

  examenes = [
    { nombre: 'Hemograma', descripcion: 'Examen básico para evaluar glóbulos rojos, blancos y plaquetas.' },
    { nombre: 'Perfil Lipídico', descripcion: 'Evalúa colesterol total, LDL, HDL y triglicéridos.' },
    { nombre: 'PCR', descripcion: 'Detecta infecciones o procesos inflamatorios agudos.' },
    { nombre: 'TSH', descripcion: 'Mide hormonas tiroideas para diagnóstico de hipotiroidismo.' }
  ];

  laboratorios = [
    { nombre: 'Laboratorio Central', direccion: 'Av. Providencia 1234' },
    { nombre: 'Laboratorio Norte', direccion: 'Av. Independencia 567' },
    { nombre: 'Laboratorio Sur', direccion: 'Gran Avenida 8901' }
  ];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.usuarioActivo = this.authService.getUsuarioActivo();
  }


}

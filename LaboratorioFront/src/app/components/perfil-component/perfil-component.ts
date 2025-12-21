import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, Usuario } from '../../services/auth.services';
import { NavbarComponent } from '../navbar/navbar';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent],
  templateUrl: './perfil-component.html',
  styles: [`
    .box { max-width: 520px; margin: 40px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
    label { display:block; text-align:left; font-weight:600; margin-top: 12px; }
    input { width: 100%; padding: 8px; margin-top: 6px; }
    .muted { color:#666; font-size: .9rem; margin-top: 4px; }
    .actions { display:flex; gap:10px; margin-top: 16px; }
    button { width: 100%; padding: 10px; }
    .ok { color: green; margin-top: 10px; }
    .err { color: red; margin-top: 10px; }
  `]
})
export class ProfileComponent implements OnInit {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  loading = false;
  saving = false;
  okMsg = '';
  errorMsg = '';

  usuario: Usuario | null = null;

  form = this.fb.group({
    correo: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
    rol: [{ value: '', disabled: true }],
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    nuevaContrasena: [''],
    repetirContrasena: [''],
  });

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.loading = true;
    // OJO: no borramos okMsg aquí para no “pisar” mensajes
    this.errorMsg = '';

    this.auth.getPerfil().subscribe({
      next: (u) => {
        this.usuario = u;
        this.loading = false;

        if (!u) {
          this.errorMsg = 'No hay sesión activa o no se pudo cargar tu perfil.';
          return;
        }

        this.form.patchValue({
          correo: u.correo,
          rol: u.rol?.nombre ? u.rol.nombre : `ID ${u.rol?.idRol ?? ''}`,
          nombre: u.nombre,
          nuevaContrasena: '',
          repetirContrasena: ''
        });
      },
      error: () => {
        this.loading = false;
        this.errorMsg = 'No se pudo cargar tu perfil.';
      }
    });
  }

  guardar(): void {
    this.okMsg = '';
    this.errorMsg = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();
    const nombre = raw.nombre?.trim() ?? '';
    const pass1 = (raw.nuevaContrasena ?? '').trim();
    const pass2 = (raw.repetirContrasena ?? '').trim();

    const cambioPass = !!pass1;

    if ((pass1 || pass2) && pass1 !== pass2) {
      this.errorMsg = 'Las contraseñas no coinciden.';
      return;
    }

    this.saving = true;

    this.auth.updatePerfil({
      nombre,
      contrasena: pass1 ? pass1 : undefined
    }).subscribe({
      next: (ok) => {
        this.saving = false;

        if (ok) {
          // ✅ ALERTA: se ve sí o sí cuando el backend respondió ok
          if (cambioPass) {
            alert('Su contraseña fue cambiada correctamente ✅');
          } else {
            alert('Perfil actualizado ✅');
          }

          // opcional: también dejarlo escrito en pantalla
          this.okMsg = cambioPass
            ? 'Su contraseña fue cambiada correctamente ✅'
            : 'Perfil actualizado ✅';

          // limpiar campos de contraseña
          this.form.patchValue({ nuevaContrasena: '', repetirContrasena: '' });

          // recargar datos
          this.cargar();
        } else {
          this.errorMsg = 'No se pudo guardar. Intenta nuevamente.';
        }
      },
      error: () => {
        this.saving = false;
        this.errorMsg = 'Error al conectar con el servidor.';
      }
    });
  }

  volver(): void {
    this.router.navigate(['/home']);
  }
}

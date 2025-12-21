import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.services';
import { NavbarComponent } from "../navbar/navbar";

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent],
  templateUrl: './forgotPassword-component.html',
})
export class ForgotPasswordComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  loading = false;
  sent = false;
  errorMsg = '';

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  submit(): void {
    this.errorMsg = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const email = this.form.getRawValue().email!.trim();
    this.loading = true;

    // Simulación de llamada al servicio
    setTimeout(() => {
      this.loading = false;
      this.sent = true;

   
      alert(
        'Se enviaron las instrucciones para recuperar tu contraseña al correo ingresado.'
      );

    }, 800);

    
  }

  volverLogin(): void {
    this.router.navigate(['/login']);
  }
}

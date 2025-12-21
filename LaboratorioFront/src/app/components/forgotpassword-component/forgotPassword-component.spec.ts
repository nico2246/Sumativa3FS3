import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ForgotPasswordComponent } from './forgotPassword-component';
import { AuthService } from '../../services/auth.services';
import { RouterTestingModule } from '@angular/router/testing';

describe('ForgotPasswordComponent', () => {
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let component: ForgotPasswordComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgotPasswordComponent],
      providers: [{ provide: AuthService, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('submit: si el form es inválido no debe enviar', () => {
    component.form.patchValue({ email: '' });
    component.submit();
    expect(component.loading).toBe(false);
    expect(component.sent).toBe(false);
  });

  it('submit: debe marcar sent=true y disparar alert (simulado)', fakeAsync(() => {
    component.form.patchValue({ email: 'a@a.com' });

    let alerts = 0;
    const prevAlert = window.alert;
    (window as any).alert = () => { alerts++; };

    component.submit();

    // al inicio queda loading
    expect(component.loading).toBe(true);

    tick(800); // termina el setTimeout

    expect(component.loading).toBe(false);
    expect(component.sent).toBe(true);
    expect(alerts).toBe(1);

    (window as any).alert = prevAlert;
  }));
});

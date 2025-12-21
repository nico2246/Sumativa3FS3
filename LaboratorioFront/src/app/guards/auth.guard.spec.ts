import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../services/auth.services';
import { authGuard } from './auth.guard';

describe('authGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    });
  });

  it('permite acceso si isLoggedIn() = true', () => {
    TestBed.overrideProvider(AuthService, { useValue: { isLoggedIn: () => true } });

    const result = TestBed.runInInjectionContext(() =>
      // por si tu guard recibe (route, state), le pasamos null as any
      (authGuard as any)(null, null)
    );

    expect(result).toBe(true);
  });

  it('bloquea acceso si isLoggedIn() = false (retorna false o UrlTree a /login)', () => {
    TestBed.overrideProvider(AuthService, { useValue: { isLoggedIn: () => false } });

    const router = TestBed.inject(Router);

    const result = TestBed.runInInjectionContext(() =>
      (authGuard as any)(null, null)
    );

    // Puede ser false o UrlTree dependiendo de tu implementación
    if (result === false) {
      expect(result).toBe(false);
      return;
    }

    // Si devuelve UrlTree, verificamos que apunte a /login
    expect(result instanceof UrlTree).toBe(true);
    const url = router.serializeUrl(result as UrlTree);
    expect(url).toBe('/login');
  });
});

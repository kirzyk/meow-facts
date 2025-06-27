import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core/testing';
import { authGuard } from './auth.guard';
import { AuthService } from '../../services/auth/auth.service';
import { Auth } from '@angular/fire/auth';
import { of } from 'rxjs';

describe('authGuard', () => {
  let authServiceMock: { isAuthenticated: jest.Mock };
  let routerMock: { navigate: jest.Mock };

  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    authServiceMock = {
      isAuthenticated: jest.fn(),
    };
    routerMock = {
      navigate: jest.fn(),
    };
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: Auth, useValue: {} },
      ],
    });
  });

  it('should allow navigation for authenticated users', inject(
    [AuthService],
    (authService: AuthService) => {
      authServiceMock.isAuthenticated.mockReturnValue(of(true));
      const result$ = executeGuard({} as any, {} as any);
      (result$ as any).subscribe((result: boolean) => {
        expect(result).toBe(true);
      });
    }
  ));

  it('should block navigation for unauthenticated users', inject(
    [AuthService, Router],
    (authService: AuthService, router: Router) => {
      authServiceMock.isAuthenticated.mockReturnValue(of(false));
      const result$ = executeGuard({} as any, {} as any);
      (result$ as any).subscribe((result: boolean) => {
        expect(result).toBe(false);
        expect(routerMock.navigate).toHaveBeenCalledWith(['login']);
      });
    }
  ));
});

import { loggedInGuard } from './logged-in.guard';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import * as fireAuth from '@angular/fire/auth';
import * as angularCore from '@angular/core';

jest.mock('@angular/fire/auth', () => ({
  user: jest.fn(),
}));

jest.mock('@angular/core', () => ({
  ...jest.requireActual('@angular/core'),
  inject: jest.fn(),
}));

describe('loggedInGuard', () => {
  let authMock: Partial<Auth>;
  let routerMock: { navigate: jest.Mock };
  let injectMock: jest.Mock;

  beforeEach(() => {
    authMock = {
      app: { name: 'test-app' } as any,
      config: { apiKey: 'test' } as any,
      name: 'test-auth',
    };
    routerMock = {
      navigate: jest.fn(),
    };
    injectMock = (angularCore as any).inject;
    injectMock.mockImplementation((token: any) => {
      if (token === Auth) return authMock;
      if (token === Router) return routerMock;
      return null;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should block navigation and redirect to home if user is logged in', (done) => {
    (fireAuth.user as jest.Mock).mockReturnValue(of({ uid: '123' }));

    const result$ = loggedInGuard({} as any, {} as any) as any;
    result$.subscribe((result: boolean) => {
      expect(result).toBe(false);
      expect(routerMock.navigate).toHaveBeenCalledWith(['home']);
      done();
    });
  });

  it('should allow navigation if user is not logged in', (done) => {
    (fireAuth.user as jest.Mock).mockReturnValue(of(null));

    const result$ = loggedInGuard({} as any, {} as any) as any;
    result$.subscribe((result: boolean) => {
      expect(result).toBe(true);
      expect(routerMock.navigate).not.toHaveBeenCalled();
      done();
    });
  });
});

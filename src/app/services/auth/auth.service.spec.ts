import { AuthService } from './auth.service';
import * as fireAuth from '@angular/fire/auth';
import { Auth, User, UserCredential } from '@angular/fire/auth';
import { of } from 'rxjs';

jest.mock('@angular/fire/auth', () => ({
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
}));

describe('AuthService', () => {
  let service: AuthService;
  let authMock: jest.Mocked<Auth>;

  beforeEach(() => {
    authMock = {} as any;
    service = new AuthService(authMock);
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });

  it('should register a user', (done) => {
    const user = { uid: '123', email: 'test@example.com' } as User;
    const userCredential = {
      user,
      providerId: 'password',
      operationType: 'signIn',
    } as UserCredential;
    (fireAuth.createUserWithEmailAndPassword as jest.Mock).mockImplementation(
      () => Promise.resolve(userCredential)
    );
    service.register('test@example.com', 'password').subscribe((result) => {
      expect(result).toEqual(user);
      done();
    });
  });

  it('should login a user', (done) => {
    const user = { uid: '123', email: 'test@example.com' } as User;
    const userCredential = {
      user,
      providerId: 'password',
      operationType: 'signIn',
    } as UserCredential;
    (fireAuth.signInWithEmailAndPassword as jest.Mock).mockImplementation(() =>
      Promise.resolve(userCredential)
    );
    service.login('test@example.com', 'password').subscribe((result) => {
      expect(result).toEqual(user);
      done();
    });
  });

  it('should logout', (done) => {
    (fireAuth.signOut as jest.Mock).mockImplementation(() => Promise.resolve());
    service.logout().subscribe((result) => {
      expect(result).toBeUndefined();
      done();
    });
  });
});

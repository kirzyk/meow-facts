import { Injectable, inject } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { Auth, authState, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private auth = inject(Auth);
  private router = inject(Router);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return authState(this.auth).pipe(
      take(1),
      switchMap((user) => {
        if (user) {
          return from(user.getIdToken()).pipe(
            switchMap((token) => {
              const cloned = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${token}`,
                },
              });
              return next.handle(cloned);
            })
          );
        } else {
          return from(signOut(this.auth)).pipe(
            switchMap(() => {
              this.router.navigate(['login']);
              return next.handle(req);
            })
          );
        }
      })
    );
  }
}

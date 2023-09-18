import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class WebRequestInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = this.addAuthHeader(req);
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.auth.logout();
        }
        return throwError(() => err);
      })
    )
  }

  public addAuthHeader(req: HttpRequest<any>) {
    const token = this.auth.getAccessToken();
    if (token) {
      return req.clone({
        setHeaders: {
          'x-access-token': token
        }
      })
    }
    return req;
  }
}

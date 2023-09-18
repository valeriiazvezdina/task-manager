import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Router } from '@angular/router';
import { Observable, shareReplay, tap } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private webService: WebRequestService, private router: Router) { }

  public login(email: string, password: string): Observable<any> {
    return this.webService.login(email, password).pipe(
                                                shareReplay(), 
                                                tap((res: HttpResponse<any>) => {
                                                  this.setSession(
                                                    res.body._id, 
                                                    res.headers.get('x-access-token')!,
                                                    res.headers.get('x-refresh-token')!);
                                                }))
  }

  public getAccessToken(): string {
    return localStorage.getItem('x-access-token')!;
  }

  public setAccessToken(accessToken: string): void {
    localStorage.setItem('x-access-token', accessToken);
  }

  public getRefreshToken(): string | null {
    return localStorage.getItem('x-refresh-token');
  }

  public setRefreshToken(accessToken: string): void {
    localStorage.setItem('x-refresh-token', accessToken);
  }
  
  private setSession(userId: string, accessToken: string, refreshToken: string) {
    localStorage.setItem('user-id', userId);
    localStorage.setItem('x-access-token', accessToken);
    localStorage.setItem('x-refresh-token', refreshToken);
  }

  private removeSession() {
    localStorage.removeItem('user-id');
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('x-refresh-token');
  }

  public logout() {
    this.removeSession();
    this.router.navigateByUrl('/login');
  }
}

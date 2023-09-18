import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IList } from '../models/list.model';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly ROOT_URL;

  constructor(private hhtp: HttpClient) {
    this.ROOT_URL = 'http://localhost:3000';
  }

  public get(uri: string): Observable<Object> {
    return this.hhtp.get(`${this.ROOT_URL}/${uri}`);
  }

  public post(uri: string, payLoad: Object): Observable<Object> {
    return this.hhtp.post(`${this.ROOT_URL}/${uri}`, payLoad);
  }

  public patch(uri: string, payLoad: Object): Observable<Object> {
    return this.hhtp.patch(`${this.ROOT_URL}/${uri}`, payLoad);
  }

  public delete(uri: string): Observable<Object> {
    return this.hhtp.delete(`${this.ROOT_URL}/${uri}`);
  }

  public login(email: string, password: string): Observable<any> {
    return this.hhtp.post(`${this.ROOT_URL}/users/login`, {
      email,
      password
    }, {
      observe: 'response'
    })
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthResponse, User } from '../interfaces/auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _baseUrl:string = environment.baseUrl;
  private _user!:User;

  get user():User {
    return { ... this._user }
  }

  constructor(
    private httpClient:HttpClient
  ) { }

  public login(email:string, password:string) {
    const url:string = `${this._baseUrl}/auth`;
    const body:{} = { email, password };

    return this.httpClient.post<AuthResponse>(url, body)
      .pipe(
        tap((resp) => {
          if (resp.ok) {
            localStorage.setItem('AuthApp.token', resp.token!);
          } else {
            localStorage.clear();
          }
        }),
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      );
  }

  public validateToken():Observable<boolean> {
    const url:string = `${this._baseUrl}/auth/renew`;
    const headers:HttpHeaders = new HttpHeaders()
      .set('x-api-key', localStorage.getItem('AuthApp.token') || '');

    return this.httpClient.get<AuthResponse>(url, { headers })
      .pipe(
        map(resp => {

          localStorage.setItem('AuthApp.token', resp.token!);
            
          this._user = {
            name: resp.name!,
            uid: resp.uid!,
            email: resp.email!
          }

          return resp.ok;
        }),
        catchError(err => of(false))
      );
  }

  public logout():void {
    localStorage.clear();
  }

  public register(name:string, email:string, password:string) {
    const url:string = `${this._baseUrl}/auth/register`;
    const body:{} = { name, email, password };

    return this.httpClient.post<AuthResponse>(url, body)
      .pipe(
        tap(({ok, token}) => {
          if (ok) {
            localStorage.setItem('AuthApp.token', token!);
          } else {
            localStorage.clear();
          }
        }),
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      );
  }
}

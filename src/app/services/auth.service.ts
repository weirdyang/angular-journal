import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IApiResponse, IArcstoneLogin, ILogin, IUser, IUserToken, Profile, RegisterUser } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }
  apiUrl = environment.userApi;

  isAuthenticated() {
    const token = localStorage.getItem('token');

    return token !== null;
  }

  setCurrentUser(user: IUserToken) {
    localStorage.setItem('token', user.accessToken);
    localStorage.setItem('username', user.username);
  }
  getToken() {
    return localStorage.getItem('token');

  }
  getUserName() {
    return localStorage.getItem('username');
  }
  handleError(err: any): Observable<IApiResponse> {
    console.dir(err);
    let errorMessage: string = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      console.dir(err);

      if (err?.error) {
        errorMessage = err.error;

      }
    }
    // this.errorService.setErrorMessage("Unable to fetch records.")
    console.error(errorMessage);
    return of({ message: errorMessage, hasError: true });
  }

  loginUser(user: IArcstoneLogin) {
    console.log(user);
    return this.http.post<IUserToken>(`${this.apiUrl}/api/personnel/login`, user)
      .pipe(
        tap(res => console.log(res)),
        catchError(error => this.handleError(error)),
      );
  }

  registerUser(user: RegisterUser) {
    console.dir(user);
    return this.http.post<HttpResponse<string>>(`${this.apiUrl}/api/personnel/register`, user)
      .pipe(
        tap(res => console.log(res)),
        catchError(error => this.handleError(error)),
      );
  }
  constructor(private http: HttpClient) { }
}

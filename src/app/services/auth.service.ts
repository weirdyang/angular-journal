import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, of, throwError } from 'rxjs';
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
  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.dir(err);
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
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
    return this.http.post<HttpResponse<any>>(`${this.apiUrl}/api/personnel/register`, user)
      .pipe(
        tap(res => console.log(res)),
        catchError(error => this.handleError(error)),
      );
  }
  constructor(private http: HttpClient) { }
}

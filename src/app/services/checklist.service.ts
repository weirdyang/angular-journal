import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IApiResponse, IUserToken } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {
  apiUrl = environment.checkList;

  constructor(private http: HttpClient) { }


  getChecklistCategories() {
    return this.http.get<any[]>(`${this.apiUrl}/api/ChecklistCategory/GetChecklistCategories`)
      .pipe(
        tap(res => console.log(res)),
        catchError(error => this.handleError(error)),
      );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
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

}

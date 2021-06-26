import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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

}

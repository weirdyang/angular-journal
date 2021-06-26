import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ThemingService } from 'src/app/services/core/theming.service';
import { UserService } from 'src/app/services/user.service';
import { IApiResponse, IArcstoneLogin, ILogin, IUser, IUserToken } from 'src/app/types/user';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private snackBar: MatSnackBar) { }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('intercepting..', this.authService.getUserName())

    if (this.authService.isAuthenticated()) {
      const newRequest = request.clone({
        headers: request.headers.set("Authorization", `Bearer ${this.authService.getToken()}`)
      })
      console.log(this.authService.getToken(), 'interceptor');
      return next.handle(newRequest);
    }
    else {
      return next.handle(request);
    }
  }
}

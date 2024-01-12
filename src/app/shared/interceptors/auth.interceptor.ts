import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(this.addAuthToken(request)).pipe(catchError(x=> this.handleAuthError(x)));
  }

  private handleAuthError(httpError: HttpErrorResponse): Observable<any> {
    if (httpError.status === 403) {
      this.toastr.error('You are not authorized to perform this action', 'Error');
      return of(httpError.message);
    }
    if (httpError.status === 401) {
      localStorage.setItem('userToken', '');
      this.router.navigateByUrl('/auth/login');
      return of(httpError.message);
    }
    if (httpError.error){
      this.toastr.error(httpError.error.errorMessage);
      return of(httpError.message);
    }
    return throwError(httpError);
  }

  addAuthToken(request: HttpRequest<any>) {
    const token = localStorage.getItem('userToken');

    if (!token) {
      return request;
    }

    return request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
    })
  }
}

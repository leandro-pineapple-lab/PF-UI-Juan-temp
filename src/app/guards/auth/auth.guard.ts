import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private jwtHelper: JwtHelperService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const accessToken = localStorage.getItem('userToken');
    const require_password_change = localStorage.getItem('requirePasswordChange') === "true" ? true : false;
    const isLoggedIn = this.isLoggedIn(accessToken);
    if (!isLoggedIn) {
      this.router.navigate(['/auth/login']);
    }else{
      if (require_password_change){
        this.router.navigateByUrl('/change-password');
        return false;
      }
    }

    return isLoggedIn;
  }

  isLoggedIn(accessToken: string | null): boolean {
    if (!accessToken || this.jwtHelper.isTokenExpired(accessToken)) {
      return false;
    }
    return true;
  }

}


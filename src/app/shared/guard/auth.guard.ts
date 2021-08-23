import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from "../../services/auth-service.service";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router
  ){ }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(async (resolve, reject) => {
      if(!(await this.authService.userIsWhitelisted())) {
        this.router.navigate(['not-whitelisted'])
      }
      if(!(await this.authService.isLoggedIn())) {
        this.router.navigate(['sign-in'])
      }
      resolve(true);
    })
  }

}

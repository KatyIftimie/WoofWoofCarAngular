
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from './user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return this.userService.isLoggedIn.pipe(
    //   map((auth) => {
    //     if (auth) {
    //       console.log("should return true in auth")
    //       return true;
    //     }
    //     this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    //     console.log("Auth not working");

    //   })
    // );
    let url: string = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this.userService.isLoggedIn) {
      return true;
    }
    console.log("User is not logged - This routing guard prevents redirection to any routes that needs logging.");
    this.router.navigate(['login',]);
    return false;
  }

}
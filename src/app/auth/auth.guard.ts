import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "./services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService
    ){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        this.authService.currentUSerSessionSubject.subscribe(
            (event) => {
                if ((!event.session || event.session === null) && event.expired ){
                    alert("Sua sessão expirou. Por favor faça o login novamente");
                    this.router.navigate(['/login']);
                }
                if (event.session == null && !event.expired) {
                    this.router.navigate(['/register']);
                }
            }
        );

        const currentUser = this.authService.currentUserSessionValue;
        if(!currentUser) return false;

        return true;
    }
}
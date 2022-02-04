import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { HublabSessionDto } from "./dtos/hublab_session.dto";
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
            (event: HublabSessionDto) => {
                if ((!event.token || event.token === null) && event.expired ){
                    alert("Sua sessão expirou. Por favor faça o login novamente");
                    this.router.navigate(['/login']);
                }
                if (event.token == null && !event.expired) {
                    this.router.navigate(['/user/register']);
                }
            }
        );

        const currentUser = this.authService.currentUserSessionValue;
        if(!currentUser) return false;

        return true;
    }
}
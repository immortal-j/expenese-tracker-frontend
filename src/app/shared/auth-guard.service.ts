import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { StoreService } from "./store.service";
@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private router: Router,private storeService:StoreService){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if(this.storeService.getLoggedin())
        {
            return true;
        }
        else{
            this.router.navigate(['/login']);
            return false;
        }
    }
}
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FlashMessagesService } from "angular2-flash-messages";

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('id_token')) {
      return true;
    }

    this.router.navigate(['login']);
    this.flashMessage.show('Please login first..!', { cssClass: 'alert-danger', timeout: 5000});
    return false;

  }
}

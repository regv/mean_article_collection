import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";

import { ValidateService } from "../../services/validate.service";
import { DataService } from "../../services/data.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title: string;
  username: string;
  password: string;
  constructor(
    private router: Router,
    private flashMessage: FlashMessagesService,
    private validateService: ValidateService,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.title = "Login";
  }

  onSubmit() {
    const newUser = {
      username: this.username,
      password: this.password
    };

    if (!this.validateService.validateLogin(newUser)) {
      this.flashMessage.show('please fill out all fields..', {cssClass: 'alert-danger', timeout: 5000});
      this.router.navigate(['/login']);
    } else {
      this.dataService.onAuthenticate(newUser).subscribe(data => {
        if (data.success) {
          this.dataService.storeUserData(data.token, data.user);
          this.flashMessage.show('You are logged in...', {cssClass: 'alert-success', timeout: 5000});
          this.router.navigate(['/dashboard']);
        } else {
          this.flashMessage.show('User not found...', {cssClass: 'alert-danger', timeout: 5000});
          this.router.navigate(['/login']);
        }
      });
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";

import { ValidateService } from "../../services/validate.service";
import { DataService } from "../../services/data.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  title: string;
  name: string;
  email: string;
  username: string;
  password: string;
  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.title = "Register";
  }

  onSubmit() {
    const newUser = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    };

    if (!this.validateService.validateRegister(newUser)) {
      this.flashMessage.show('fill out all fields...', { cssClass: 'alert-danger', timeout: 3000});
      this.router.navigate(['/register']);
      return false;
    }

    if (!this.validateService.validateEmail(newUser.email)) {
      this.flashMessage.show('Invalid email...', { cssClass: 'alert-danger', timeout: 3000});
      this.router.navigate(['/register']);
      return false;
    }

    if (!this.validateService.validateUsername(newUser.username)) {
      this.flashMessage.show('Invalid username...', { cssClass: 'alert-danger', timeout: 3000});
      this.router.navigate(['/register']);
      return false;
    }

    this.dataService.onRegister(newUser).subscribe(user => {
      if (user.success) {
        this.flashMessage.show('You are registered, you can logg in...', { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show('You are registered, you can logg in...', { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/login']);
      }
    });
  }
}

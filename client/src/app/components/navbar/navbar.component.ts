import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";

import { DataService } from "../../services/data.service";

@Component ({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})

export class NavbarComponent {
  navbarHeading: string;

  constructor(
    private router: Router,
    private flashMessage: FlashMessagesService,
    public dataService: DataService
  ) {}

  ngOnInit() {
    this.navbarHeading = "ARTICLE COLLECTION";
  }

  onLogOut() {
    this.dataService.logoutUser();
    this.flashMessage.show('you are logged out...', {cssClass: 'alert-success', timeout: 5000});
    this.router.navigate(['/']);
    return false;
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";

import { DataService } from "../../services/data.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title: string;

  constructor(
    private router: Router,
    private flashMessage: FlashMessagesService,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.title = "ARTICLE COLLECTION";
  }

}

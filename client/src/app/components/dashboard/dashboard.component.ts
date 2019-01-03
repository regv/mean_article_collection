import { Component, OnInit } from '@angular/core';

import { DataService } from "../../services/data.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title: string;
  user: User;
  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.dataService.getDashBoard().subscribe(data => {
      this.user = data.user;
    },
    error => console.log(error));
  }

}

interface User {
  _id: any,
  name: string,
  email: string;
}

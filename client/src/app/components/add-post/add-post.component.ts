import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";

import { ValidateService } from "../../services/validate.service";
import { DataService } from "../../services/data.service";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  title: string;
  postTitle: string;
  postBody: string;
  postAuthor: string;
  user: User;
  constructor(
    private router: Router,
    private flashMessage: FlashMessagesService,
    private validateService: ValidateService,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.title = "Add Posts";
  }

  onSubmit() {
    const newPost = {
      title: this.postTitle,
      body: this.postBody,
      author: this.postAuthor
    };

    if (!this.validateService.validatePost(newPost)) {
      this.flashMessage.show('Fill out all fields.....!', { cssClass: 'alert-danger', timeout: 5000});
      this.router.navigate(['/post/add']);
      return false;
    }

    this.dataService.addPosts(newPost).subscribe(post => {
      if (post.success) {
        this.flashMessage.show('Post added successfully.....!', {cssClass: 'alert-success', timeout: 5000});
        this.router.navigate(['/posts']);
      } else {
        this.flashMessage.show('Something went wrong.....!', {cssClass: 'alert-danger', timeout: 5000});
        this.router.navigate(['/post/add']);
      }
    });

  }

}

interface User {
  _id: any,
  email: string;
  name: string;
}

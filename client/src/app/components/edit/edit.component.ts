import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";

import { ValidateService } from "../../services/validate.service";
import { DataService } from "../../services/data.service";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  title: string;
  postTitle: string;
  postBody: string;
  postAuthor: string;
  id: any;
  constructor(
    private router: Router,
    private flashMessage: FlashMessagesService,
    private validateService: ValidateService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.title = "Edit Post";
    this.id = this.router.url.split('/')[2];
    this.dataService.editPost(this.id).subscribe(post => {
      this.postTitle = post.title;
      this.postBody = post.body;
      this.postAuthor = post.author;
    });
  }

  onSubmit() {
    const editedPost = {
      title: this.postTitle,
      body: this.postBody,
      author: this.postAuthor
    };

    if (!this.validateService.validatePost(editedPost)) {
      this.flashMessage.show('Fill out all fields.....!', { cssClass: 'alert-danger', timeout: 5000});
      this.router.navigate(['/posts']);
      return false;
    }

    this.dataService.patchPost(this.id, editedPost).subscribe(post => {
      if (post.success) {
        this.flashMessage.show('Post updated successfully.....!', { cssClass: 'alert-success', timeout: 5000});
        this.router.navigate(['/posts']);
      } else {
        this.flashMessage.show('Something went wrong.....!', { cssClass: 'alert-danger', timeout: 5000});
        this.router.navigate([`/post/${this.id}`]);
      }
    });
  }

}

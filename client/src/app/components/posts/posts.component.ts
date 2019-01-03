import { Component, OnInit } from '@angular/core';
import { DataService } from "../../services/data.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  title: string;
  posts: Posts[];
  user: Object;
  constructor(
    private dataService: DataService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.title = "Posts";
    this.dataService.getPosts().subscribe(posts => {
      this.posts = posts;
    });

  }

  onDeletePost(id) {
    const isConfirm = confirm('Are you sure you want to delete this post...');
    if (isConfirm) {
      this.dataService.deletePosts(id).subscribe(post => {
        if (post.success) {
          this.flashMessage.show("Post deleted successfully, Let's add some.....!", {cssClass: "alert-success", timeout: 5000});
          this.router.navigate(['/post/add']);
        } else {
          this.flashMessage.show('Something went wrong.....!', {cssClass: 'alert-danger', timeout: 5000});
          this.router.navigate(['/posts']);
        }
      });
    }
  }

  onEditPost(id) {
    this.router.navigate([`/post/${id}`]);
  }
}


interface Posts {
  title: string,
  body: string,
  _id: number,
  author: string
}

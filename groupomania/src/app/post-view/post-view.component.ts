import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../models/Post.model';
import { PostService } from '../services/post.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.scss']
})
export class PostViewComponent implements OnInit, OnDestroy {

  posts: Post[];
  postSub: Subscription;
  lastUpdate = new Date();
  errorMsg: string;

  constructor(private postService: PostService,
              private router: Router) {

  }

  ngOnInit() {
    this.postSub = this.postService.postSubject.subscribe(
      (posts) => {
        this.posts = posts;
        this.errorMsg = null;
      },
      (error) => {
        this.errorMsg = JSON.stringify(error);
      }
    );
    this.postService.getPosts();
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../models/Post.model';
import { User } from '../models/User.model';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';
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
  users: User[];
  user: User;
  lastUpdate = new Date();
  errorMsg: string;

  constructor(private postService: PostService,
              private userService: UserService,
              private router: Router) {

  }

  ngOnInit() {
    this.postSub = this.postService.postSubject.subscribe(
      (posts) => {
        this.posts = posts;
        this.errorMsg = null;
        let users = [];
        this.posts.forEach(post => {
          this.userService.getUserById(post.UserId)
          .then(
            (user: User) => {
              users.push(user);
              this.users = users;
            }
          ).catch(
            (error) => {
              this.errorMsg = JSON.stringify(error);
            }
          );
        });
      },
      (error) => {
        this.errorMsg = JSON.stringify(error);
      }
    );
    this.postService.getPosts()
    
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
  }

  onClickPost(id: number) {
    this.router.navigate(['posts', id]);
  }

  
}

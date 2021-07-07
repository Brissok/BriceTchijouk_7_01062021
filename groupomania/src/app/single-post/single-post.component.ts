import { Component, OnInit } from '@angular/core';
import { Post } from '../models/Post.model';
import { User } from '../models/User.model';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {

  post: Post;
  userId: number;
  errorMsg: string;
  isAdmin: boolean = false;

  constructor(private postService: PostService,
              private userService: UserService,
              private route: ActivatedRoute,
              private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.userId = this.auth.getUserId();
    this.route.params.subscribe(
      (params) => {
        console.log(params.id);
        this.postService.getPostById(params.id)
          .then((post: Post) => {
            this.post = post;
            console.log(post);
          });
      }
    );
    this.userId = this.auth.getUserId();
    console.log(this.userId);
    this.userService.getUserById(this.userId)
      .then((user) => {
        console.log(user);
        if(user.isAdmin === true) {
          this.isAdmin = true;
        } else {
          this.isAdmin = false;
        }
      });
      console.log(this.isAdmin);
  }

  onBack() {
    this.router.navigate(['/posts']);
  }

  onModify() {
    this.router.navigate(['/modify-post', this.post.id]);
  }

  onDelete() {
    this.postService.deletePost(this.post.id)
      .then((response) => {
        console.log(response);
        this.router.navigate(['/posts']);
      }
    ).catch((error) => {
        this.errorMsg = error.message;
        console.error(error);
      }
    );
  }

}

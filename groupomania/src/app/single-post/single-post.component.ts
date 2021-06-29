import { Component, OnInit } from '@angular/core';
import { Post } from '../models/Post.model';
import { PostService } from '../services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {

  post: Post;
  userId: string;
  errorMsg: string;

  constructor(private postService: PostService,
              private route: ActivatedRoute,
              private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.userId = this.auth.getUserId();
    this.route.params.subscribe(
      (params) => {
        this.postService.getPostById(params.id)
          .then((post: Post) => {
            this.post.id = post.id;
          }
        );
      }
    );
    this.userId = this.auth.getUserId();     
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

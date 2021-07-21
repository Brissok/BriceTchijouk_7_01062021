import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../models/Post.model';
import { User } from '../models/User.model';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';
import { Comment } from '../models/Comment.model';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

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
  userId: number;
  lastUpdate = new Date();
  commentForm: FormGroup;
  comment: Comment;
  errorMsg: string;
  isComment: number = 0;
  commentsView: number = 0;
  isAdmin: boolean = false;
  loading: boolean;

  constructor(private formBuilder: FormBuilder,
              private postService: PostService,
              private userService: UserService,
              private auth: AuthService,
              private router: Router) {

  }

  ngOnInit() {
    this.loading = true;
    this.userId = this.auth.getUserId();
    this.postSub = this.postService.postSubject.subscribe(
      (posts) => {
        this.posts = posts;
        this.loading = false;
        this.errorMsg = null;
      },
      (error) => {
        this.errorMsg = JSON.stringify(error);
        this.loading = false;
      }
    );
    this.postService.getPosts();
    this.userId = this.auth.getUserId();
    this.userService.getUserById(this.userId)
      .then((user) => {
        if(user.isAdmin === true) {
          this.isAdmin = true;
        } else {
          this.isAdmin = false;
        }
      });
    
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
  }

  onClickPost(id: number) {
    this.router.navigate(['posts', id]);
  }

  initEmptyForm() {
    this.commentForm = this.formBuilder.group({
      text: ["", Validators.required]
    });
  }

  onClickComment(id: number) {
    if(this.isComment === id) {
      this.isComment = 0;
    } else {
      this.isComment = id;
      this.initCommentForm();
    }
    
  }

  initCommentForm() {
    this.commentForm = this.formBuilder.group({
      text: ["", Validators.required]
    });
  }

  onSubmit(id: number) {
    const newComment = new Comment();
    newComment.text = this.commentForm.get('text').value;
    newComment.UserId = this.auth.getUserId();
    newComment.PostId = id;
    this.postService.createComment(newComment)
      .then((response: { message: string }) => {
        console.log(response.message);
        this.router.navigate(['/posts']);
        this.isComment = 0;
        this.postService.getPosts();
      })
      .catch((error) => {
        console.error(error);
        this.errorMsg = error.message;
      });
  }

  onCommentsView(id: number) {
    if(this.commentsView === id) {
      this.commentsView = 0;
    } else {
      this.commentsView = id;
    }
  }

  onDelete(id: number) {
    this.postService.deleteComment(id)
      .then((response: { message: string }) => {
        console.log(response.message);
        this.postService.getPosts();
      }
    ).catch((error) => {
        this.errorMsg = error.message;
        console.error(error);
      }
    );
  }

}

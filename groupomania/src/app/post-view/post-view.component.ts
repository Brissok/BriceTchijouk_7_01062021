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
  lastUpdate = new Date();
  commentForm: FormGroup;
  comment: Comment;
  errorMsg: string;
  isComment: boolean = false;
  commentsView: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private postService: PostService,
              private userService: UserService,
              private auth: AuthService,
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
    this.postService.getPosts()
    
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

  onClickComment() {
    if(this.isComment) {
      this.isComment = false;
    } else {
      this.isComment = true;
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
    console.log(newComment);
    this.postService.createComment(newComment)
      .then((response: { message: string }) => {
        console.log(response.message);
        this.router.navigate(['/posts']);
        this.isComment = false;
        this.postService.getPosts();
      })
      .catch((error) => {
        console.error(error);
        this.errorMsg = error.message;
      });
  }

  onCommentsView() {
    if(this.commentsView) {
      this.commentsView = false;
    } else {
      this.commentsView = true;
    }
  }

}

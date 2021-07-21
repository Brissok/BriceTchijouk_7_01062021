import { Component, OnInit } from '@angular/core';
import { Post } from '../models/Post.model';
import { User } from '../models/User.model';
import { Comment } from '../models/Comment.model';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {

  post: Post;
  userId: number;
  errorMsg: string;
  commentForm: FormGroup;
  isComment: number = 0;
  commentsView: number = 0;
  isAdmin: boolean = false;

  constructor(private postService: PostService,
              private userService: UserService,
              private route: ActivatedRoute,
              private auth: AuthService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.userId = this.auth.getUserId();
    this.route.params.subscribe(
      (params) => {
        this.postService.getPostById(params.id)
          .then((post: Post) => {
            this.post = post;
            console.log(post);
          });
      }
    );
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

  onDeleteCom(id: number) {
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

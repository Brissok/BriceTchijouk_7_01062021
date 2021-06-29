import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../services/post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Post } from '../models/Post.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {

  postForm: FormGroup;
  mode: string;
  post: Post;
  errorMsg: string;

  constructor(private formBuilder: FormBuilder,
              private postService: PostService,
              private router: Router,
              private route: ActivatedRoute,
              private auth: AuthService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        if (!params.id) {
          this.mode = 'new';
          this.initEmptyForm();
        } else {
          this.mode = 'edit';
          this.postService.getPostById(params.id).then(
            (post: Post) => {
              this.post = post;
              this.initModifyForm(post);
            }
          ).catch(
            (error) => {
              this.errorMsg = JSON.stringify(error);
            }
          );
        }
      }
    );
  }

  initEmptyForm() {
    this.postForm = this.formBuilder.group({
      title: ["", Validators.required],
      content: ["", Validators.required],
    });
  }

  initModifyForm(post: Post) {
    this.postForm = this.formBuilder.group({
      title: [this.post.title, Validators.required],
      content: [this.post.content, Validators.required]
    });
  }

  onSubmit() {
    const newPost = new Post();
    newPost.title = this.postForm.get('title').value;
    newPost.content = this.postForm.get('content').value;
    newPost.UserId = this.auth.getUserId();
    if(this.mode === 'new') {
      this.postService.createPost(newPost)
      .then((response: { message: string }) => {
        console.log(response.message);
        this.router.navigate(['/posts']);
      })
      .catch((error) => {
        console.error(error);
        this.errorMsg = error.message;
      });
    } else if(this.mode === 'edit') {
      this.postService.modifyPost(this.post.id, newPost)
      .then((response: { message: string }) => {
        console.log(response.message);
        this.router.navigate(['posts']);
      })
      .catch((error) => {
        console.error(error);
        this.errorMsg = error.message;
      });
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../services/post.service';
import { Router } from '@angular/router';
import { Post } from '../models/Post.model';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {

  postForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private postService: PostService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.postForm = this.formBuilder.group({
      title: ["", Validators.required],
      content: ["", Validators.required],
    });
  }

  onSubmit() {
    const formValue = this.postForm.value;
    const newPost = new Post();
    newPost.title = formValue['title'];
    newPost.content = formValue['content'];
    this.postService.addPost(newPost);
    this.postService.createPost(newPost);
    this.router.navigate(['/posts']);
  }

}

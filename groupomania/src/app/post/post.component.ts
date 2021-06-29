import { Component, Input, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {

  @Input() postTitle: string;
  @Input() postContent: string;
  @Input() indexOfPost: number;
  @Input() id: string;

  lastUpdate = new Date();

  constructor(private postService: PostService) { }

  ngOnInit(): void {
  }

  getContent() {
    return this.postContent;
  }

  getColor() {
    if(this.postContent === 'vert') {
      return 'green';
    } else if(this.postContent === 'rouge') {
      return 'red';
    } 
  }
}

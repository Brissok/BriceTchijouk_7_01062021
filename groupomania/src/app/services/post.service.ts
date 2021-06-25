import { Subject } from "rxjs/Subject";
import { Post } from "../models/Post.model";
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable()
export class PostService {

  postSubject = new Subject<Post[]>();
  private posts: Post[] = [
    {
      id: "feqkjgbeli",
      title: "Hello World !",
      content: "Bienvenue dans le réseau social Groupomania.",
      likes: 1,
      imageUrl: null,
      usersLiked: ["cbhvbskdj"],
      userId: "mlkjhg"
    }
  ];
  
  constructor(private httpClient: HttpClient) {}
     
  emitPosts() {
    this.postSubject.next(this.posts.slice());
  }

  addPost(post: Post) {
    this.posts.push(post);
    this.emitPosts();
  }

  getPostById(id: string) {
    const post = this.posts.find((postObject) => {
      return postObject.id === id;
    });
    return post;
  }

  createPost(post: Post) {
    this.httpClient
      .post('http://localhost:3000/posts', post)
      .subscribe(
        () => {
          console.log('post enregistré !');
      },
        (error) => {
          console.log("Erreur de sauvegarde !" + error);
      }
    );
  }
}
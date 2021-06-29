import { Subject } from "rxjs/Subject";
import { Post } from "../models/Post.model";
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable()
export class PostService {

  postSubject = new Subject<Post[]>();
  private posts: Post[] = [];

  
  constructor(private http: HttpClient) {}

  getPosts() {
    this.http.get<any[]>('http://localhost:3000/posts').subscribe(
      (posts: Post[]) => {
        this.postSubject.next(posts);
      },
      (error) => {
        this.postSubject.next([]);
        console.error(error);
      }
    );
  }

  getPostById(id: string) {
    return new Promise<Post>((resolve, reject) => {
      this.http.get<Post>('http://localhost:3000/posts/' + id).subscribe(
        (post: Post) => {
          resolve(post);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  createPost(post: Post) {
    return new Promise<any>((resolve, reject) => {
      this.http.post<any>('http://localhost:3000/posts', post).subscribe(
        (response: { message: string }) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  modifyPost(id: string, post: Post) {
    return new Promise<any>((resolve, reject) => {
      const formData = new FormData();
      formData.append('sauce', JSON.stringify(post));
      this.http.put<any>('http://localhost:3000/api/posts/' + id, formData).subscribe(
        (response: { message: string }) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  deletePost(id: string) {
    return new Promise((resolve, reject) => {
      this.http.delete<any>('http://localhost:3000/posts/' + id).subscribe(
        (response: { message: string }) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

}
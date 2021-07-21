import { Subject } from "rxjs/Subject";
import { Post } from "../models/Post.model";
import { Comment } from "../models/Comment.model";
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { formatDate } from "@angular/common";

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

  getPostById(id: number) {
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

  createPost(post: Post, image: File) {
    return new Promise<any>((resolve, reject) => {
      const formData = new FormData();
      formData.append('post', JSON.stringify(post));
      formData.append('image', image);
      console.log(formData);
      this.http.post<any>('http://localhost:3000/posts', formData).subscribe(
        (response: { message: string }) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  modifyPost(id: number, post: Post, image:string | File) {
    return new Promise<any>((resolve, reject) => {
      if(typeof image === 'string') {
        this.http.put<any>('http://localhost:3000/posts/' + id, post).subscribe(
          (response: { message: string }) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        const formData = new FormData();
        formData.append('post', JSON.stringify(post));
        formData.append('image', image);
        this.http.put<any>('http://localhost:3000/posts/' + id, formData).subscribe(
          (response: { message: string }) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
      }
      
    });
  }

  deletePost(id: number) {
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

  createComment(comment: Comment) {
    return new Promise<any>((resolve, reject) => {
      this.http.post<any>('http://localhost:3000/comments', comment).subscribe(
        (response: { message: string }) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  deleteComment(id: number) {
    return new Promise<any>((resolve, reject) => {
      this.http.delete<any>('http://localhost:3000/comments/' + id).subscribe(
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
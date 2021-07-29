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

  //Fonction pour récupérer tous les posts 
  /**
   * 
   */
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

  //Fonction pour accéder à un post en particulier
  /**
   * 
   * @param {number} id 
   * @returns {Promise}
   */
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

  //Fonction pour créer un post
  /**
   * 
   * @param {Post} post 
   * @param {File} image 
   * @returns {Promise}
   */
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

  //Fonction pour modifier un post
  /**
   * 
   * @param {number} id 
   * @param {Post} post 
   * @param {string | File} image 
   * @returns {Promise}
   */
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

  //Fonction pour supprimer un post
  /**
   * 
   * @param {number} id 
   * @returns {Promise}
   */
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

  //Fonction pour ajouter un commentaire
  /**
   * 
   * @param {Comment} comment 
   * @returns {Promise}
   */
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

  //Fonction pour supprimer un commentaire
  /**
   * 
   * @param {number} id 
   * @returns {Promise}
   */
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
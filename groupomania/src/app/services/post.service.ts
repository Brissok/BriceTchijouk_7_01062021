import { Subject } from "rxjs/Subject";

export class PostService {

  postSubject = new Subject<any[]>();

  private posts = [
      {
        id: 1,
        title: 'Premier',
        content: 'bleu'
      },
      {
        id: 2,
        title: 'Deuxième',
        content: 'vert'
      },
      {
        id: 3,
        title: 'Troisième',
        content: 'rouge'
      }
    ];

  emitPostSubject() {
    this.postSubject.next(this.posts.slice());
  }

  getPostById(id: number) {
    const post = this.posts.find((postObject) => {
      return postObject.id === id;
    });
    return post;
  }
  switchRedAll() {
      for(let post of this.posts) {
          post.content = "rouge"
      }
      this.emitPostSubject();
  }
  switchGreenAll() {
      for(let post of this.posts) {
          post.content = "vert"
      }
      this.emitPostSubject();
  }
  switchRedOne(index: number) {
      this.posts[index].content = "rouge";
      this.emitPostSubject();
  }
  switchGreenOne(index: number) {
      this.posts[index].content = "vert";
      this.emitPostSubject();
  }
}
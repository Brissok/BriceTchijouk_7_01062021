import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class LinkService {

  constructor(@Inject(DOCUMENT) private doc) { }

  createLink() {
    let link: HTMLLinkElement = this.doc.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', 'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css');
    link.setAttribute('integrity', 'sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh');
    link.setAttribute('crossorigin', 'anonymous');
    this.doc.head.appendChild(link);
  }
}
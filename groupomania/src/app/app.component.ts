import { Component, OnInit } from '@angular/core';
import { LinkService } from './services/link';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  constructor(private link: LinkService) {}

  ngOnInit() {

  }

}

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <fs-navbar></fs-navbar>
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: [
    './app.component.css'
    ]
})
export class AppComponent {

}

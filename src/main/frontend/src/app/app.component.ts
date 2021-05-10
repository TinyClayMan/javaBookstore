import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.scss'
  ]
})
//'../../node_modules/bootstrap/scss/bootstrap.scss' or '../../node_modules/bootstrap/dist/css/bootstrap.min'
export class AppComponent {
  title = 'frontend';
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-angular-child-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'Angular Child Application';
}

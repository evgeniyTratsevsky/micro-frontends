import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent {
  microFrontends = [
    {
      name: 'React Child',
      description: 'React 18 micro-frontend with tabbed interface',
      route: '/react-child',
      standalone: 'http://localhost:4202',
      color: '#61dafb'
    },
    {
      name: 'Vue Child',
      description: 'Vue 3 micro-frontend with interactive demos',
      route: '/vue-child',
      standalone: 'http://localhost:4203',
      color: '#42b883'
    }
  ];
}


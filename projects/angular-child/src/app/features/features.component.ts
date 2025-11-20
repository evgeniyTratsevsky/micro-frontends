import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.less']
})
export class FeaturesComponent {
  features = [
    {
      title: 'Module Federation',
      description: 'Seamless integration with the host application using Webpack Module Federation',
      icon: '🔗'
    },
    {
      title: 'Shared Dependencies',
      description: 'Common libraries like Angular core, RxJS, and Router are shared with the host',
      icon: '📦'
    },
    {
      title: 'Independent Development',
      description: 'Develop, test, and deploy independently from other micro-frontends',
      icon: '🚀'
    },
    {
      title: 'Type Safety',
      description: 'Full TypeScript support with type checking across module boundaries',
      icon: '🛡️'
    }
  ];
}


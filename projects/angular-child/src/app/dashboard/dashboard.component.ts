import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent {
  stats = [
    { label: 'Total Users', value: '1,234', icon: '👥' },
    { label: 'Active Sessions', value: '567', icon: '🔥' },
    { label: 'Revenue', value: '$12,345', icon: '💰' },
    { label: 'Growth', value: '+23%', icon: '📈' }
  ];
}


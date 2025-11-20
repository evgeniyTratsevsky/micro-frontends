import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-iframe',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="iframe-container">
      <iframe [src]="safeUrl" frameborder="0"></iframe>
    </div>
  `,
  styles: [`
    .iframe-container {
      width: 100%;
      height: calc(100vh - 180px);
      overflow: hidden;
    }
    
    iframe {
      width: 100%;
      height: 100%;
      border: none;
    }
  `]
})
export class IframeComponent implements OnInit {
  safeUrl!: SafeResourceUrl;

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    const url = this.route.snapshot.data['url'];
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}


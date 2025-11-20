import { Component, OnInit, OnDestroy, ViewChild, ViewContainerRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { loadRemoteModule } from '@angular-architects/module-federation';

@Component({
  selector: 'app-react-wrapper',
  standalone: true,
  template: '<div #reactContainer></div>',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReactWrapperComponent implements OnInit, OnDestroy {
  @ViewChild('reactContainer', { read: ViewContainerRef, static: true }) 
  container!: ViewContainerRef;

  private unmountFn: any;

  async ngOnInit() {
    try {
      const module = await loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4202/remoteEntry.js',
        exposedModule: './App'
      });

      const containerElement = this.container.element.nativeElement;
      this.unmountFn = module.mount(containerElement);
    } catch (error) {
      console.error('Error loading React app:', error);
    }
  }

  ngOnDestroy() {
    if (this.unmountFn) {
      this.unmountFn();
    }
  }
}


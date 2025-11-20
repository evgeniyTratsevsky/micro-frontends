declare module 'angularChild/Module' {
  import { Type } from '@angular/core';
  const value: Type<any>;
  export default value;
}

declare module 'reactChild/App' {
  export function mount(el: HTMLElement): () => void;
}

declare module 'vueChild/App' {
  export function mount(el: HTMLElement): () => void;
}


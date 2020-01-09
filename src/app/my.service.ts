import { Injectable } from '@angular/core';

function InjectableEnhanced() {
  return <T extends new (...args: any[]) => InstanceType<T>>(target: T) => {
    Injectable({ providedIn: 'root' })(target);
  };
}

@InjectableEnhanced() // -> does not work
// @Injectable() // -> works
export class MyService {
  constructor() {}
}

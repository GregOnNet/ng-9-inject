import { Injectable } from '@angular/core';

function InjectableEnhanced() {
  return <T extends new (...args: any[]) => InstanceType<T>>(target: T) => {
    Injectable({ providedIn: 'root' })(target);
  };
}

// @InjectableEnhanced() // -> does not work
@Injectable({ providedIn: 'root' }) // -> works
export class MyService {
  constructor() {}
}

console.log(
  'Has ɵprov?',
  (MyService as any).prototype.constructor.hasOwnProperty('ɵprov')
);

console.log('Access ɵprov...', (MyService as any).prototype.constructor.ɵprov);

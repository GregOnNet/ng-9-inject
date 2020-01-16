import { ɵɵdefineInjectable } from '@angular/core';

export function InjectableEnhanced() {
  return <T extends new (...args: any[]) => InstanceType<T>>(target: T) => {
    (target as any).ɵfac = function() {
      throw new Error('cannot create directly');
    };

    (target as any).ɵprov = ɵɵdefineInjectable({
      token: target,
      providedIn: 'root',
      factory() {
        return new target();
      }
    });
    return target;
  };
}

@InjectableEnhanced() // -> works, after using ɵɵdefineInjectable
// @Injectable({ providedIn: 'root' }) // -> works
export class MyService {
  constructor() {}
}

// Injectable({ providedIn: 'root' })(MyService); // -> does not work

console.log(
  'Has ɵprov?',
  (MyService as any).prototype.constructor.hasOwnProperty('ɵprov')
);

console.log('Access ɵprov...', (MyService as any).prototype.constructor.ɵprov);

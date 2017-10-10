import * as React from 'react';
import * as Enzyme from 'enzyme';

declare function shallow<T>(
  node: T,
  options?: { context?: Object, disableLifecycleMethods?: boolean }
): enzyme$ShallowWrapper<$PropertyType<$PropertyType<T, 'type'>, 'prototype'>>;

declare function mount<T>(
  node: T,
  options?: {
    context?: Object,
    attachTo?: HTMLElement,
    childContextTypes?: Object
  }
): enzyme$ReactWrapper<$PropertyType<$PropertyType<T, 'type'>, 'prototype'>>;

declare function render(
  node: React.Node,
  options?: { context?: Object }
): enzyme$CheerioWrapper;

declare type MyJestFn = JestMockFn<any, any>;
declare function spyMount<T>(component: T, fnName: string): [enzyme$ReactWrapper<$PropertyType<$PropertyType<T, 'type'>, 'prototype'>>, MyJestFn];
declare function spyMount<T>(component: T, fnName: string, fnName2: string): [enzyme$ReactWrapper<$PropertyType<$PropertyType<T, 'type'>, 'prototype'>>, MyJestFn, MyJestFn];
declare function spyMount<T>(component: T, fnName: string, fnName2: string, fnName3: string): [enzyme$ReactWrapper<$PropertyType<$PropertyType<T, 'type'>, 'prototype'>>, MyJestFn, MyJestFn, MyJestFn];
declare function spyMount<T>(component: T, fnName: string, fnName2: string, fnName3: string, fnName4: string): [enzyme$ReactWrapper<$PropertyType<$PropertyType<T, 'type'>, 'prototype'>>, MyJestFn, MyJestFn, MyJestFn, MyJestFn];

import * as Enzyme from 'enzyme';
import * as React from 'react';

declare type MyJestFn = JestMockFn<any, any>;
declare class EnzymeReactWrapper {
  find(selector: Enzyme.EnzymeSelector): this,
  findWhere(predicate: Enzyme.PredicateFunction<this>): this,
  filter(selector: Enzyme.EnzymeSelector): this,
  filterWhere(predicate: Enzyme.PredicateFunction<this>): this,
  contains(nodeOrNodes: Enzyme.NodeOrNodes): boolean,
  containsMatchingElement(node: React.Node): boolean,
  containsAllMatchingElements(nodes: Enzyme.NodeOrNodes): boolean,
  containsAnyMatchingElements(nodes: Enzyme.NodeOrNodes): boolean,
  dive(option?: { context?: Object }): this,
  exists(): boolean,
  matchesElement(node: React.Node): boolean,
  hasClass(className: string): boolean,
  is(selector: Enzyme.EnzymeSelector): boolean,
  isEmpty(): boolean,
  not(selector: Enzyme.EnzymeSelector): this,
  children(selector?: Enzyme.EnzymeSelector): this,
  childAt(index: number): this,
  parents(selector?: Enzyme.EnzymeSelector): this,
  parent(): this,
  closest(selector: Enzyme.EnzymeSelector): this,
  render(): Enzyme.CheerioWrapper,
  unmount(): this,
  text(): string,
  html(): string,
  get(index: number): React.Node,
  getNodes(): Array<React.Node>,
  getDOMNode(): HTMLElement | HTMLInputElement,
  at(index: number): this,
  first(): this,
  last(): this,
  state(key?: string): any,
  context(key?: string): any,
  props(): Object,
  prop(key: string): any,
  key(): string,
  simulate(event: string, ...args: Array<any>): this,
  setState(state: {}, callback?: Function): this,
  setProps(props: {}): this,
  setContext(context: Object): this,
  instance(): React.Component<*, *>,
  update(): this,
  debug(): string,
  type(): string | Function | null,
  name(): string,
  forEach(fn: (node: this, index: number) => mixed): this,
  map<T>(fn: (node: this, index: number) => T): Array<T>,
  reduce<T>(
    fn: (value: T, node: this, index: number) => T,
    initialValue?: T
  ): Array<T>,
  reduceRight<T>(
    fn: (value: T, node: this, index: number) => T,
    initialValue?: T
  ): Array<T>,
  some(selector: Enzyme.EnzymeSelector): boolean,
  someWhere(predicate: Enzyme.PredicateFunction<this>): boolean,
  every(selector: Enzyme.EnzymeSelector): boolean,
  everyWhere(predicate: Enzyme.PredicateFunction<this>): boolean,
  length: number
}

declare function spyMount(component: any, fnName: string): [EnzymeReactWrapper, MyJestFn];
declare function spyMount(component: any, fnName: string, fnName2: string): [EnzymeReactWrapper, MyJestFn, MyJestFn];
declare function spyMount(component: any, fnName: string, fnName2: string, fnName3: string): [EnzymeReactWrapper, MyJestFn, MyJestFn, MyJestFn];
declare function spyMount(component: any, fnName: string, fnName2: string, fnName3: string, fnName4: string): [EnzymeReactWrapper, MyJestFn, MyJestFn, MyJestFn, MyJestFn];

// flow-typed signature: a18e8395a43c22fe55906624f2a7ddb9
// flow-typed version: e351e417db/enzyme_v3.x.x/flow_>=v0.53.x

import * as React from "react";

declare class enzyme$ShallowWrapper<T> extends enzyme$Wrapper<T> {
  constructor(
    nodes: enzyme$NodeOrNodes,
    root: any,
    options?: ?Object
  ): enzyme$ShallowWrapper<T>,
  equals(node: React.Node): boolean,
  shallow(options?: { context?: Object }): enzyme$ShallowWrapper<T>
}

declare type enzyme$AnyReactInstance = React.Component<any, any>;

declare class enzyme$Wrapper<INSTANCE> {
  find(selector: enzyme$EnzymeSelector): enzyme$Wrapper<enzyme$AnyReactInstance>,
  findWhere(predicate: enzyme$PredicateFunction<this>): enzyme$Wrapper<enzyme$AnyReactInstance>,
  filter(selector: enzyme$EnzymeSelector): enzyme$Wrapper<enzyme$AnyReactInstance>,
  filterWhere(predicate: enzyme$PredicateFunction<this>): enzyme$Wrapper<enzyme$AnyReactInstance>,
  contains(nodeOrNodes: enzyme$NodeOrNodes): boolean,
  containsMatchingElement(node: React.Node): boolean,
  containsAllMatchingElements(nodes: enzyme$NodeOrNodes): boolean,
  containsAnyMatchingElements(nodes: enzyme$NodeOrNodes): boolean,
  dive(option?: { context?: Object }): this,
  exists(): boolean,
  matchesElement(node: React.Node): boolean,
  hasClass(className: string): boolean,
  is(selector: enzyme$EnzymeSelector): boolean,
  isEmpty(): boolean,
  not(selector: enzyme$EnzymeSelector): enzyme$Wrapper<enzyme$AnyReactInstance>,
  children(selector?: enzyme$EnzymeSelector): enzyme$Wrapper<enzyme$AnyReactInstance>,
  childAt(index: number): enzyme$Wrapper<enzyme$AnyReactInstance>,
  parents(selector?: enzyme$EnzymeSelector): enzyme$Wrapper<enzyme$AnyReactInstance>,
  parent(): enzyme$Wrapper<enzyme$AnyReactInstance>,
  closest(selector: enzyme$EnzymeSelector): enzyme$Wrapper<enzyme$AnyReactInstance>,
  render(): enzyme$CheerioWrapper,
  unmount(): this,
  text(): string,
  html(): string,
  get(index: number): React.Node,
  getNodes(): Array<React.Node>,
  getDOMNode(): HTMLElement | HTMLInputElement,
  at(index: number): enzyme$Wrapper<enzyme$AnyReactInstance>,
  first(): enzyme$Wrapper<enzyme$AnyReactInstance>,
  last(): enzyme$Wrapper<enzyme$AnyReactInstance>,
  state(key?: string): any,
  context(key?: string): any,
  props(): Object,
  prop(key: string): any,
  key(): string,
  simulate(event: string, ...args: Array<any>): this,
  setState(state: {}, callback?: Function): this,
  setProps(props: {}): this,
  setContext(context: Object): this,
  instance(): INSTANCE, // React.Component<*, *>,
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
  some(selector: enzyme$EnzymeSelector): boolean,
  someWhere(predicate: enzyme$PredicateFunction<this>): boolean,
  every(selector: enzyme$EnzymeSelector): boolean,
  everyWhere(predicate: enzyme$PredicateFunction<this>): boolean,
  length: number
}

// CheerioWrapper is a type alias for an actual cheerio instance
// TODO: Reference correct type from cheerio's type declarations
declare type enzyme$CheerioWrapper = any;

declare class enzyme$ReactWrapper<T> extends enzyme$Wrapper<T> {
  constructor(nodes: enzyme$NodeOrNodes, root: any, options?: ?Object): enzyme$ReactWrapper<T>,
  mount(): this,
  ref(refName: string): this,
  detach(): void
}

declare type enzyme$EnzymeSelector = string | Class<React.Component<*, *>> | Object;
declare type enzyme$NodeOrNodes = React.Node | Array<React.Node>;
declare type enzyme$PredicateFunction<T: enzyme$Wrapper<any>> = (
  wrapper: T,
  index: number
) => boolean;

declare module "enzyme" {
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

  declare module.exports: {
    configure(options: {
      Adapter?: any,
      disableLifecycleMethods?: boolean
    }): void,
    render: typeof render,
    mount: typeof mount,
    shallow: typeof shallow,
    ShallowWrapper: typeof enzyme$ShallowWrapper,
    ReactWrapper: typeof enzyme$ReactWrapper
  };
}

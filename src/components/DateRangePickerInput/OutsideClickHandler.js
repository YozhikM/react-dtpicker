/* @flow */

import * as React from 'react';
import { addEventListener, removeEventListener } from 'consolidated-events';

type Props = {
  onOutsideClick: any => void,
  children: React.Node
};
type State = void;

class OutsideClickHandler extends React.Component<Props, State> {

  childNode: ?HTMLElement;

  constructor(props: Props) {
    super(props);
    this.onOutsideClick = this.onOutsideClick.bind(this);
    this.setChildNodeRef = this.setChildNodeRef.bind(this);
  }

  componentDidMount() {
    this.clickHandle = addEventListener(document, 'click', this.onOutsideClick, { capture: true });
  }

  componentWillMount() {
    if (this.clickHandle) {
      removeEventListener(this.clickHandle);
    }
  }

  clickHandle = () => {};

  onOutsideClick = (e: any) => {
    const { onOutsideClick } = this.props;
    const { childNode } = this;
    const isDescendantOfRoot = childNode && childNode.contains(e.target);
    if (!isDescendantOfRoot) {
      onOutsideClick(e);
    }
  };

  setChildNodeRef = (ref: ?HTMLElement) => {
    this.childNode = ref;
  };

  render() {
    return <div ref={this.setChildNodeRef}>{this.props.children}</div>;
  }
}

export default OutsideClickHandler;

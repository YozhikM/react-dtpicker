/* @flow */

import * as React from 'react';

export type Props = {
  type?: string,
  style?: Object,
  children?: React.Node,
  disabled?: boolean,
  leftIcon?: any,
  rightIcon?: any,

  onClick?: Function,
  onClickRightIcon?: Function,
  onClickLeftIcon?: Function,
  onMouseDown?: Function,

  icon?: boolean,
  maxWidth?: boolean,

  outline?: boolean,
  filled?: boolean,
  flat?: boolean,
  link?: boolean,

  blue?: boolean,
  lightBlue?: boolean,
  green?: boolean,
  orange?: boolean,
  red?: boolean,
  white?: boolean,
  grey?: boolean,

  large?: boolean,
  normal?: boolean,
  small?: boolean,
  xs?: boolean,

  mTop?: string | boolean,
  mRight?: string | boolean,
  mBottom?: string | boolean,
  mLeft?: string | boolean,
};

export default class Button extends React.Component<Props, void> {
  state: State;
  onClick: Function;
  onMouseUp: Function;
  onClickRightIcon: Function;
  onClickLeftIcon: Function;
  onMouseDown: Function;
  _rippleContainerRef: ?HTMLElement;

  static defaultProps = {
    type: 'button',
    outline: true,
  };

  constructor(props: $Exact<Props>) {
    super(props);

    this.onClick = this._onClick.bind(this);
    this.onMouseUp = this._onMouseUp.bind(this);
    this.onClickRightIcon = this.onClickRightIcon.bind(this);
    this.onClickLeftIcon = this.onClickLeftIcon.bind(this);
    this.onMouseDown = this._onMouseDown.bind(this);
  }

  onClickRightIcon(e: Event) {
    const { disabled, onClickRightIcon } = this.props;

    if (disabled) {
      e.preventDefault();
      return;
    }
    if (onClickRightIcon) {
      e.stopPropagation();
      onClickRightIcon(e);
    }
  }

  onClickLeftIcon(e: Event) {
    const { disabled, onClickLeftIcon } = this.props;

    if (disabled) {
      e.preventDefault();
      return;
    }
    if (onClickLeftIcon) {
      e.stopPropagation();
      onClickLeftIcon(e);
    }
  }

  _onClick(e: Event) {
    const { disabled, onClick } = this.props;

    if (disabled) {
      e.preventDefault();
      return;
    }
    if (onClick) onClick(e);
  }

  _onMouseDown(e: Event) {
    const { onMouseDown } = this.props;

    if (onMouseDown) {
      e.preventDefault();
      onMouseDown();
    }
  }

  render() {
    let style = Object.assign({}, this.props.style);

    const {
      type,
      leftIcon,
      rightIcon,
      disabled,
      maxWidth,
      mTop,
      mRight,
      mBottom,
      mLeft,
    } = this.props;

    if (disabled) {
      if (!style) style = {};
      style.opacity = '0.6';
      style.cursor = 'not-allowed';
    }

    if (maxWidth) {
      if (!style) style = {};
      style.width = '100%';
    }

    // Margins
    if (mTop) {
      if (!style) style = {};
      style.marginTop = typeof mTop === 'boolean' ? '10px' : mTop;
    }
    if (mRight) {
      if (!style) style = {};
      style.marginRight = typeof mRight === 'boolean' ? '10px' : mRight;
    }
    if (mBottom) {
      if (!style) style = {};
      style.marginBottom = typeof mBottom === 'boolean' ? '10px' : mBottom;
    }
    if (mLeft) {
      if (!style) style = {};
      style.marginLeft = typeof mLeft === 'boolean' ? '10px' : mLeft;
    }

    return (
      <button
        type={type}
        onClick={this.onClick}
        onMouseDown={this.onMouseDown}
        style={style}
        disabled={disabled}
        ref={ref => (this._rippleContainerRef = ref)} // eslint-disable-line
        onMouseUp={this.onMouseUp}
        onTouchEnd={this.onMouseUp}
      >
        {leftIcon && (
          <span onClick={this.onClickLeftIcon}>
            {leftIcon}
          </span>
        )}
        <span>{this.props.children}</span>
        {rightIcon && (
          <span onClick={this.onClickRightIcon}>
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
}

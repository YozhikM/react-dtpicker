/* @flow */
/* eslint-disable react/no-danger, global-require, import/no-dynamic-require */

import * as React from 'react';

type Props = {
  file: string,
  width?: string,
  height?: string,
  wh?: string,
  color?: string,
  style?: Object,
  className?: string,
};

class SvgIcon extends React.Component<Props, void> {
  render() {
    const { file, wh = '24px', width, height } = this.props;

    return (
      <div
        className={this.props.className}
        style={{
          width: width || wh,
          height: height || wh,
          fill: this.props.color,
          display: 'inline-block',
          ...this.props.style,
        }}
        dangerouslySetInnerHTML={{
          // $FlowFixMe
          __html: require(`./svg-icons/${file}.svg`),
        }}
      />
    );
  }
}

export default SvgIcon;

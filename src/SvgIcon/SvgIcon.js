/* @flow */
/* eslint-disable react/no-danger, global-require, import/no-dynamic-require */

import * as React from 'react';
import SVGInline from 'react-svg-inline';

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
    const { file, wh = '24', width, height } = this.props;

    return <SVGInline width={width || wh || '24'} height={height || wh || '24'} svg={file} />;
  }
}

export default SvgIcon;

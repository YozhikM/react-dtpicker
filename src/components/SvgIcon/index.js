/* @flow */
/* eslint-disable react/no-danger, global-require, import/no-dynamic-require, react/require-default-props */

import * as React from 'react';

type Props = {|
  file: string,
  width?: string,
  height?: string,
  wh?: string,
  color?: string,
  style?: Object,
  className?: string,
|};

const SvgIcon = (props: Props) => {
  const { file, wh = '24px', width, height, style, className, color } = props;

  return (
    <div
      className={className}
      style={{
        width: width || wh,
        height: height || wh,
        fill: color,
        display: 'inline-block',
        ...style,
      }}
      dangerouslySetInnerHTML={{
        // $FlowFixMe
        __html: require(`./svg-icons/${file}.svg`),
      }}
    />
  );
};

export default SvgIcon;

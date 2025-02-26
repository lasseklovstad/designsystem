import type { HTMLAttributes } from 'react';
import React from 'react';

import classes from './Stack.module.css';

export const Stack = ({
  style,
  gap = 'var(--fds-spacing-4)',
  direction = 'row',
  wrap = 'wrap',
  ...rest
}: FlexContainerProps & HTMLAttributes<HTMLDivElement>) => (
  <div
    className={classes.stack}
    style={{
      ...style,
      gap,
      flexDirection: direction,
      flexWrap: wrap,
    }}
    {...rest}
  ></div>
);

type FlexContainerProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
  gap?: string;
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  wrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
};

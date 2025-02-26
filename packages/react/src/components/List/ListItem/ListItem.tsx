import React from 'react';
import type { HTMLAttributes } from 'react';
import cn from 'classnames';

import classes from './ListItem.module.css';

export type ListItemProps = HTMLAttributes<HTMLLIElement>;

export const ListItem = ({ children, ...rest }: ListItemProps) => (
  <li
    {...rest}
    className={cn(classes.listItem, rest.className)}
  >
    {children}
  </li>
);

ListItem.displayName = 'List.Item';

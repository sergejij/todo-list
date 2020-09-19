import React from 'react';
import classNames from 'classnames';
import { uniqueId } from 'lodash';

import Badge from '../Badge/Badge';

import './List.scss';

const List = ({ items, onClick }) => (
  <ul onClick={onClick} className="list">
    {
      items.map((item) => (
        <li key={uniqueId()} className={classNames(item.className, { active: item.active })}>
          <i>{item.icon ? item.icon : <Badge color={item.color} />}</i>
          <span>{item.name}</span>
        </li>
      ))
    }
  </ul>
);

export default List;

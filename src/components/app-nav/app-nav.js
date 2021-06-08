import React from 'react';

import { BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import NavLink from '../nav-link/nav-link';

import styles from './app-nav.module.css';

const AppNav = () => (
  <nav>
    <ul className={ styles.list }>
      <li className={ styles.item }>
        <NavLink url='#' isActive={ true }>
          <BurgerIcon />
          Конструктор
        </NavLink>
      </li>

      <li>
        <NavLink url='#'>
          <ListIcon type='secondary' />
          Лента заказов
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default AppNav;
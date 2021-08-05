import React from 'react';
import { NavLink } from 'react-router-dom';

import { BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './app-nav.module.css';

const AppNav = () => (
  <nav>
    <ul className={ styles.list }>
      <li className={ styles.item }>
        <NavLink to='/' exact={ true } className='nav-link'>
          <BurgerIcon type='secondary' />
          Конструктор
        </NavLink>
      </li>

      <li>
        <NavLink to='/feed' className='nav-link'>
          <ListIcon type='secondary' />
          Лента заказов
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default AppNav;

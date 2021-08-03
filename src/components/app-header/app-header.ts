import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';

import { Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import AppNav from '../app-nav/app-nav';

import styles from './app-header.module.css';

const AppHeader = memo( () => (
  <header className={ styles.header }>
    <div className={ styles.container }>
      <AppNav />
      <div className={ styles.logo }>
        <Logo />
      </div>
      <div className={ styles.login }>
        <NavLink
          to='/profile'
          className='nav-link'
        >
          <ProfileIcon type='secondary' />
          Личный кабинет
        </NavLink>
      </div>
    </div>
  </header>
) );

export default AppHeader;

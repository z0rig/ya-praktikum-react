import React, { memo } from 'react';

import { Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import AppNav from '../app-nav/app-nav';
import NavLink from '../nav-link/nav-link';

import styles from './app-header.module.css';

const AppHeader = memo(() => (
  <header className={ styles['app-header'] }>
    <div className={ `container ${ styles.container }` }>
      <AppNav />
      <div className={ styles.logo }>
        <Logo />
      </div>
      <div className={ styles.login }>
        <NavLink url='#'>
          <ProfileIcon type='secondary' />
          Личный кабинет
        </NavLink>
      </div>
    </div>
  </header>
));

export default AppHeader;

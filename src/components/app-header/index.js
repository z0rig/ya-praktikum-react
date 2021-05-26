import React from 'react';

import { Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import AppNav from '../app-nav'
import NavLink from '../nav-link'

import styles from './app-header.module.css';

const AppHeader = () => (
  <header className={`${styles['app-header']} pt-3 pb-3` }>
    <div className={`container ${styles.container}`}>
      <AppNav />
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={styles.login}>
        <NavLink url='/'>
          <ProfileIcon type='secondary' />
          Личный кабинет
        </NavLink>
      </div>
    </div>
  </header>
);

export default AppHeader;
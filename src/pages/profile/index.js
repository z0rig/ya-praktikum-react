import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useRouteMatch, Route, Switch, useHistory } from 'react-router-dom';

import UserForm from '../../components/user-form/user-form';
import OrdersFeed from '../../components/orders-feed/orders-feed';
import OrderInfo from '../../components/order-info/order-info';
import ScrolledContainer from '../../components/scrolled-container/scrolled-container';

import { logout } from '../../store/slices/profile-page';

import styles from './profile.module.css';

const ProfilePage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const onLogoutBtnClick = useCallback( ( evt ) => {
    evt.preventDefault();

    dispatch( logout() );
    history.push( { pathName: '/login', state: { from: '/login' } } );
  }, [dispatch, history] );

  const { path, url } = useRouteMatch();

  return (
    <div className={ styles.wrapper }>
      <div className={ styles['side-bar'] }>
        <nav className={ styles.nav }>
          <ul className={ styles.list }>
            <li className={ styles.item }>
              <NavLink exact={ true } className={ styles.link } to={ url }>Профиль</NavLink>
            </li>
            <li className={ styles.item }>
              <NavLink className={ styles.link } to={ `${ url }/orders` }>История заказов</NavLink>
            </li>
            <li className={ styles.item }>
              <a href='/login' onClick={ onLogoutBtnClick } className={ styles.link }>Выход</a>
            </li>
          </ul>
        </nav>
        <p className={ styles.description }>В этом разделе вы можете <br /> изменить свои персональные данные</p>
      </div>
      <div className={ styles.main }>
        <Switch>
          <Route exact={ true } path={ path }>
            <UserForm/>
          </Route>
          <Route exact={ true } path={ `${ path }/orders` }>
            <ScrolledContainer maxHeight='868px'>
              <OrdersFeed />
            </ScrolledContainer>
          </Route>
          <Route path={ `${ path }/orders/:id` }>
            <OrderInfo/>
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default ProfilePage;
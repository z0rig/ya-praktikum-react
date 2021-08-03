import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from '../../hooks';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import Spinner from '../spinner/spinner';
import Error from '../error/error';

import { getUserData, setUserData } from '../../store/slices/profile';

import styles from './user-form.module.css';

const UserForm = () => {
  const dispatch = useDispatch();

  const profileData = useSelector( ( state ) => state.profile );
  const userData = profileData.user;
  const { loading, error } = profileData;

  const [ inputsData, setInputsData ] = useState( {
    name: '',
    email: '',
    password: ''
  } );

  useEffect( () => {
    dispatch( getUserData() );
  }, [dispatch] );

  useEffect( () => {
    const { name, email } = userData;

    if( name && email ) {
      setInputsData( {
        name,
        email,
        password: ''
      } );
    }
  }, [userData] );

  const onInputChange = useCallback( ( evt ) => {
    const { name, value } = evt.target;

    setInputsData( ( state ) => {
      return {
        ...state,
        [name]: value
      };
    } );
  }, [] );

  const formSubmitHandler = useCallback( ( evt ) => {
    evt.preventDefault();
    dispatch( setUserData( inputsData ) );
  }, [ dispatch, inputsData ] );

  const onCancelBtnClick = useCallback( () => {
    if ( userData.name && userData.email ) {
      setInputsData( {
        name: userData.name,
        email: userData.email,
        password: ''
      } );
    }
  }, [userData] );

  return (
    <>
      { loading && ( <Spinner /> ) }
      { error && ( <Error error={ error } /> ) }
      { !loading && !error && (
        <form onSubmit={ formSubmitHandler } className={ styles.form }>
          <h1 className='visually-hidden'>В этом разделе вы можете изменить свои персональные данные</h1>
          <Input
            onChange={ onInputChange }
            value={ inputsData.name }
            name='name'
            type='text'
            placeholder='Имя'
            icon='EditIcon'
          />
          <EmailInput
            onChange={ onInputChange }
            value={ inputsData.email }
            name='email'
          />
          <PasswordInput
            onChange={ onInputChange }
            value={ inputsData.password }
            name='password'
          />
          <div className={ styles.flex }>
            <Button size='medium' type='primary'>Сохранить</Button>
            <Button onClick={ onCancelBtnClick } size='medium' type='secondary'>Отмена</Button>
          </div>
        </form>
      ) }
    </>
  );
};

export default UserForm;

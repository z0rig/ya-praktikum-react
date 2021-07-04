import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { getUserData, setUserData } from '../../store/slices/profile-page';

import styles from './user-form.module.css';

const UserForm = () => {
  const dispatch = useDispatch();

  const currentUserData = useSelector( ( state ) => state.profile.user );

  const [ inputsData, setInputsData ] = useState( {
    name: currentUserData.name,
    email: currentUserData.email,
    password: ''
  } );

  useEffect( () => {
    dispatch( getUserData() );
  }, [dispatch] );

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

  const onCancelBtnClick = useCallback( ( evt ) => {
    evt.preventDefault();

    setInputsData( {
      name: currentUserData.name,
      email: currentUserData.email,
      password: ''
    } );
  }, [currentUserData] );

  return (
    <form onSubmit={ formSubmitHandler } className={ styles.form }>
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
  );
};

export default UserForm;

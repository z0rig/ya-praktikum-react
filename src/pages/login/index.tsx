import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from '../../hooks';
import { Redirect, useLocation } from 'react-router-dom';

import { PasswordInput, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';

import FormPageTemplate from '../../components/form-page-template/form-page-template';
import Note from '../../components/note/note';
import Spinner from '../../components/spinner/spinner';

import { login } from '../../store/slices/login';

const LoginPage = () => {
  const dispatch = useDispatch();
  const { state } = useLocation<{from?: string}>();

  const [ inputsData, setInputsData ] = useState( {
    email: '',
    password: ''
  } );

  const onFormSubmit = useCallback(
    ( evt ) => {
      evt.preventDefault();
      dispatch( login( inputsData ) );
    },
    [inputsData, dispatch]
  );

  const onInputChange = useCallback( ( evt ) => {
    const { name, value } = evt.target;

    setInputsData( ( state ) => {
      return {
        ...state,
        [name]: value
      };
    } );
  }, [] );

  const { loading, error } = useSelector(
    ( state ) => state.login
  );

  const isLogin = useSelector(
    ( state ) => state.profile.user.isLogin
  );

  if ( isLogin ) {
    return <Redirect to={ state?.from || '/' } />;
  }

  const inputs = [
    <EmailInput
      value={ inputsData.email }
      onChange={ onInputChange }
      name='email'
      key='1'
    />,
    <PasswordInput
      value={ inputsData.password }
      onChange={ onInputChange }
      name='password'
      key='2'
    />
  ];

  const notes = [
    <Note link={ { text: 'Зарегистрироваться', href: 'register' } } key='1'>Вы — новый пользователь?</Note>,
    <Note link={ { text: 'Восстановить пароль', href: 'forgot-password' } } key='2'>Забыли пароль?</Note>,
  ];

  return (
    <>
      { loading && ( <Spinner /> ) }
      { !loading && (
        <FormPageTemplate
          inputs={ inputs }
          notes={ notes }
          title='Вход'
          submitButtonText='Войти'
          onFormSubmit={ onFormSubmit }
          reqError={ error }
        />
      ) }
    </>
  );
};

export default LoginPage;

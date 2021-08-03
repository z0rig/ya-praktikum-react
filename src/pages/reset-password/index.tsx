import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from '../../hooks';
import { Redirect, useLocation } from 'react-router-dom';

import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import FormPageTemplate from '../../components/form-page-template/form-page-template';
import Note from '../../components/note/note';
import Spinner from '../../components/spinner/spinner';

import { resetPassword } from '../../store/slices/reset-password';

const ResetPasswordPage = () => {
  const { state } = useLocation<{from?: string}>();
  const dispatch = useDispatch();

  const [ inputsData, setInputsData ] = useState( {
    token: '',
    password: ''
  } );

  const onFormSubmit = useCallback(
    ( evt ) => {
      evt.preventDefault();

      dispatch( resetPassword( inputsData ) );
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
    ( state ) => state.resetPassword
  );

  const isLogin = useSelector(
    ( state ) => state.profile.user.isLogin
  );

  const emailChecked = useSelector(
    ( state ) => state.forgotPassword.emailChecked
  );

  if ( isLogin || !emailChecked || state?.from !== '/forgot-password' ) {
    return <Redirect to='/'/>;
  }

  const inputs = [
    <PasswordInput
      value={ inputsData.password }
      onChange={ onInputChange }
      key='1'
      name='password'
    />,
    <Input
      value={ inputsData.token }
      onChange={ onInputChange }
      key='2'
      type='text'
      placeholder='Введите код из письма'
      name='token'
    />
  ];

  const notes = [
    <Note key='1' link={ { text: 'Войти', href: '/login' } }>Вспомнили пароль?</Note>
  ];

  return (
    <>
      { loading && ( <Spinner /> ) }
      { !loading && (
        <FormPageTemplate
          inputs={ inputs }
          notes={ notes }
          title='Сброс пароля'
          submitButtonText='Сохранить'
          onFormSubmit={ onFormSubmit }
          reqError={ error }
        />
      ) }
    </>
  );
};

export default ResetPasswordPage;

import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from '../../hooks';
import { Redirect, useLocation } from 'react-router-dom';

import { EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';

import FormPageTemplate from '../../components/form-page-template/form-page-template';
import Note from '../../components/note/note';
import Spinner from '../../components/spinner/spinner';

import { checkEmailForPassReset } from '../../store/slices/forgot-password';

const ForgotPasswordPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const [ email, setEmail ] = useState( '' );

  const onEmailInput = useCallback(
    ( evt ) => {
      setEmail( evt.target.value );
    },
    []
  );

  const onFormSubmit = useCallback(
    async ( evt ) => {
      evt.preventDefault();
      dispatch( checkEmailForPassReset( email ) );
    },
    [email, dispatch]
  );

  const inputs = [
    <EmailInput key='1' name='email' value={ email } onChange={ onEmailInput } />,
  ];

  const notes = [
    <Note key='1' link={ { text: 'Войти', href: '/login' } }>Вспомнили пароль?</Note>
  ];

  const { loading, error, emailChecked } = useSelector(
    ( state ) => state.forgotPassword
  );

  const isLogin = useSelector(
    ( state ) => state.profile.user.isLogin
  );

  if ( isLogin ) {
    return <Redirect to='/'/>;
  }

  return (
    <>
      { loading && ( <Spinner /> ) }
      { emailChecked && (
        <Redirect to={ {
          pathname: '/reset-password',
          state: { from: location.pathname }
        } }/>
      ) }
      { !loading && (
        <FormPageTemplate
          inputs={ inputs }
          notes={ notes }
          title='Восстановление пароля'
          submitButtonText='Восстановить'
          onFormSubmit={ onFormSubmit }
          reqError={ error }
        />
      ) }
    </>
  );
};

export default ForgotPasswordPage;

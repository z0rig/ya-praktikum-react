import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from '../../hooks';
import { Redirect } from 'react-router-dom';

import { PasswordInput, EmailInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import FormPageTemplate from '../../components/form-page-template/form-page-template';
import Note from '../../components/note/note';
import Spinner from '../../components/spinner/spinner';

import { register } from '../../store/slices/registration';

const RegistrationPage = () => {
  const dispatch = useDispatch();

  const [ inputsData, setInputsData ] = useState( {
    name: '',
    email: '',
    password: ''
  } );

  const onFormSubmit = useCallback(
    ( evt ) => {
      evt.preventDefault();
      dispatch( register( inputsData ) );
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
    ( state ) => state.registration
  );

  const isLogin = useSelector(
    ( state ) => state.profile.user.isLogin
  );

  if ( isLogin ) {
    return <Redirect to='/'/>;
  }

  const inputs = [
    <Input
      onChange={ onInputChange }
      value={ inputsData.name }
      name='name'
      key='1'
      type='text'
      placeholder='Имя'
     />,
    <EmailInput
      onChange={ onInputChange }
      value={ inputsData.email }
      name='email'
      key='2'
     />,
    <PasswordInput
      onChange={ onInputChange }
      value={ inputsData.password }
      name='password'
      key='3'
     />
  ];

  const notes = [
    <Note key='1' link={ { text: 'Войти', href: '/login' } }>Уже зарегистрированы?</Note>
  ];

  return (
    <>
      { loading && ( <Spinner /> ) }
      { !loading && (
        <FormPageTemplate
          inputs={ inputs }
          notes={ notes }
          title='Регистрация'
          submitButtonText='Зарегистрироваться'
          onFormSubmit={ onFormSubmit }
          reqError={ error }
        />
      ) }
    </>
  );
};

export default RegistrationPage;

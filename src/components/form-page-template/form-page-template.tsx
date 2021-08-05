import React, { FormEventHandler, ReactNode } from 'react';

import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './form-page-template.module.css';

import { SerializedError } from '@reduxjs/toolkit';

interface IFormPageTemplate {
  inputs: Array<ReactNode>,
  notes: Array<ReactNode>,
  title: string,
  submitButtonText: string,
  onFormSubmit: FormEventHandler<HTMLFormElement>,
  reqError: SerializedError | null
}

const FormPageTemplate = ( {
  inputs,
  notes,
  title,
  submitButtonText,
  onFormSubmit,
  reqError
}: IFormPageTemplate ) => {
  return (
    <div className={ styles.wrapper }>
      <h1 className={ styles.title }>{ title }</h1>

      {
        reqError &&
        <p className={ styles.error }>{ `${ reqError.message }` }</p>
      }

      <form className={ styles.form } onSubmit={ onFormSubmit }>
        { inputs }
        <Button size='medium' type='primary'>{ submitButtonText }</Button>
      </form>
      { notes }
    </div>
  );
};

export default FormPageTemplate;

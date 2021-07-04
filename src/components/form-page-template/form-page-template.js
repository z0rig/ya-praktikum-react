import React from 'react';

import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './form-page-template.module.css';

const FormPageTemplate = ( { inputs, notes, title, submitButtonText, onFormSubmit, reqError } ) => {
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

import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './form-page-template.module.css';

const FormPageTemplate = ( {
  inputs,
  notes,
  title,
  submitButtonText,
  onFormSubmit,
  reqError
} ) => {
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

FormPageTemplate.propTypes = {
  inputs: PropTypes.arrayOf( PropTypes.element ).isRequired,
  notes: PropTypes.arrayOf( PropTypes.element ),
  title: PropTypes.string,
  submitButtonText: PropTypes.string.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  reqError: PropTypes.shape( {
    message: PropTypes.string
  } )
};

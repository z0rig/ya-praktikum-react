import React from 'react';
import PropTypes from 'prop-types';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './price.module.css';

const Price = ( { children } ) => (
  <p className={ styles.price }>{ children }<CurrencyIcon /></p>
);

export default Price;

Price.propTypes = {
  children: PropTypes.oneOfType( [PropTypes.string, PropTypes.node] ).isRequired
};

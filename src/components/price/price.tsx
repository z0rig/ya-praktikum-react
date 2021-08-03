import React, { ReactNode } from 'react';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './price.module.css';

const Price = ( { children }: { children: ReactNode; } ) => (
  <p className={ styles.price }>{ children }<CurrencyIcon type='primary' /></p>
);

export default Price;

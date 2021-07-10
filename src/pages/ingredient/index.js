import React from 'react';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';

import styles from './ingredient-page.module.css';

const IngredientPage = () => (
  <div className={ styles.wrapper }>
    <h2 className={ styles.title }>Детали ингредиента</h2>
    <IngredientDetails />
  </div>
);

export default IngredientPage;

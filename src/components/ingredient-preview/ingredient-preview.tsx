import React from 'react';

import styles from './ingredient-preview.module.css';

import { TIngredient } from '../../types';

interface IIngredientPreview {
  ingredient: TIngredient,
  more: number | null
}

const IngredientPreview = (
  { ingredient: { name, image_mobile }, more }: IIngredientPreview
) => (
  <div className={ styles.ingredient }>
    { more && <span className={ styles.more }>+{ more }</span> }
    <picture>
      <img src={ image_mobile } alt={ name } />
    </picture>
  </div>
);

export default IngredientPreview;

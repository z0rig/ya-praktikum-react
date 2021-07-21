import React from 'react';
import PropTypes from 'prop-types';

import styles from './ingredient-preview.module.css';

const IngredientPreview = ( { ingredient: { name, image_mobile }, more } ) => (
  <div className={ styles.ingredient }>
    { more && <span className={ styles.more }>+{ more }</span> }
    <picture>
      <img src={ image_mobile } alt={ name } />
    </picture>
  </div>
);

export default IngredientPreview;

IngredientPreview.propTypes = {
  ingredient: PropTypes.shape( {
    name: PropTypes.string,
    image: PropTypes.string
  } ).isRequired,
  more: PropTypes.number
};

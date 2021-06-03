import React from 'react';
import PropTypes from 'prop-types';

import styles from './ingredient-details.module.css';

const IngredientDetails = ( {
  name,
  src,
  calories,
  proteins,
  fat,
  carbohydrates
} ) => {
  return (
    <div className={ styles.details }>
      <figure className={ styles.figure }>
        <picture>
          <img className={ styles.image } src={ src } alt={ name } />
        </picture>
        <figcaption className={ styles.name }>
          { name }
        </figcaption>
      </figure>
      <table className={ styles.evergy }>
        <caption className='visually-hidden'>Энергетическая ценность</caption>
        <thead>
          <tr>
            <th className={ styles.th }>Калории,ккал</th>
            <th className={ styles.th }>Белки, г</th>
            <th className={ styles.th }>Жиры, г</th>
            <th className={ styles.th }>Углеводы, г</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={ styles.td }>{ calories }</td>
            <td className={ styles.td }>{ proteins }</td>
            <td className={ styles.td }>{ fat }</td>
            <td className={ styles.td }>{ carbohydrates }</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default IngredientDetails;

IngredientDetails.propTypes = {
  name: PropTypes.string,
  src: PropTypes.string,
  calories: PropTypes.number,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number
}

import React from 'react';
import { useSelector } from 'react-redux';

import styles from './ingredient-details.module.css';

const IngredientDetails = () => {
  const {
    name,
    image_large,
    calories,
    proteins,
    fat,
    carbohydrates
  } = useSelector( state => state.ingredientDetails );

  return (
    <div className={ styles.details }>
      <figure className={ styles.figure }>
        <picture>
          <img className={ styles.image } src={ image_large } alt={ name } />
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
  );
};

export default IngredientDetails;

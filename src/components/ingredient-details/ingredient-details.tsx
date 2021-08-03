import React from 'react';

import { useSelector } from '../../hooks';
import { useParams } from 'react-router-dom';

import styles from './ingredient-details.module.css';

interface IIngredientDetails {
  id: string
}

const IngredientDetails = () => {
  const { id } = useParams<IIngredientDetails>();

  const ingredient = useSelector(
    ( state ) => state.burgerIngredients.items
      .find( ( { _id } ) => _id === id )
  );

  if ( !ingredient ) {
    return <p>Ингредиент не найден</p>;
  }

  const {
    name,
    image_large,
    calories,
    proteins,
    fat,
    carbohydrates
  } = ingredient;

  return (
    <article className={ styles.details }>
      <figure className={ styles.figure }>
        <picture>
          <img className={ styles.image } src={ image_large } alt={ name } />
        </picture>
        <figcaption>
          <h1 className={ styles.title }>{ name }</h1>
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
    </article>
  );
};

export default IngredientDetails;

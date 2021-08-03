import { RefObject } from 'react';
import { TIngredient } from '../../types';

interface IRefsObj {
  [i: string]: RefObject<HTMLElement>,
}

interface IAdaptedIngredientsDataItem {
  title:  string,
  ref: RefObject<HTMLElement>,
  items: TIngredient[],
  name: string
}

export interface IAdaptedIngredientsData {
  [i: string]: IAdaptedIngredientsDataItem
}

const getAdaptedIngredientsData = ( ingredientsData: TIngredient[], refs: IRefsObj ) => {
  const ingredientSectionsData: IAdaptedIngredientsData = {
    bun: {
      title: 'Булки',
      ref: refs['bun'],
      items: [],
      name: 'bun'
    },
    sauce: {
      title: 'Соусы',
      ref: refs['sauce'],
      items: [],
      name: 'sauce'
    },
    main: {
      title: 'Начинки',
      ref: refs['main'],
      items: [],
      name: 'main'
    }
  };

  ingredientsData.forEach( ( ingredient ) => {
    ingredientSectionsData[ingredient.type].items
      .push( ingredient );
  } );

  return ingredientSectionsData;
};

export default getAdaptedIngredientsData;

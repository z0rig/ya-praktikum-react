const getAdaptedIngredientsData = ( ingredientsData, refs ) => {
  const ingredientSectionsData = {
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

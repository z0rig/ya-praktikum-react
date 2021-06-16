const getAdaptedIngredientsData = ( ingredientsData ) => {
  const ingredientSectionsData = {
    bun: {
      title: 'Булки',
      items: []
    },
    sauce: {
      title: 'Соусы',
      items: []
    },
    main: {
      title: 'Начинки',
      items: []
    }
  };

  ingredientsData.forEach( ( ingredient ) => {
    ingredientSectionsData[ingredient.type].items
      .push( ingredient );
  } );

  return ingredientSectionsData;
};

export default getAdaptedIngredientsData;

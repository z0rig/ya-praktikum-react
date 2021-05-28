const getAdaptedIngredientsData = (ingredients) => {
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

  ingredients.forEach((ingredient) => {
    ingredientSectionsData[ingredient.type].items
      .push(ingredient);
  })

  return ingredientSectionsData;
}

export default getAdaptedIngredientsData;

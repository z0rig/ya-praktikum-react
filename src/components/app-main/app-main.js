import React from 'react';
import PropTypes from 'prop-types';

import ConstructorPage from '../constructor-page/constructor-page'

const AppMain = ( { ingredients } ) => (
  <main className='pt-10'>
    <ConstructorPage ingredients={ ingredients } />
  </main>
);

export default AppMain;

AppMain.propTypes = {
  ingredients: PropTypes.arrayOf( PropTypes.shape( {
    title: PropTypes.string,
    items: PropTypes.arrayOf( PropTypes.shape( {
      _id: PropTypes.string,
      name: PropTypes.string,
      type: PropTypes.string,
      proteins: PropTypes.number,
      fat: PropTypes.number,
      carbohydrates: PropTypes.number,
      calories: PropTypes.number,
      price: PropTypes.number,
      image: PropTypes.string,
      image_mobile: PropTypes.string,
      image_large: PropTypes.string,
      __v: PropTypes.number,
    } ) )
  } ) )
};
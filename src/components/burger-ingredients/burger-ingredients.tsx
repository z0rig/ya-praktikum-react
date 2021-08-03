import React, { useState, useMemo, useRef, useCallback } from 'react';
import { useSelector } from '../../hooks';

import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import IngredientCard from '../ingredient-card/ingredient-card';
import TabsList from '../tabs-list/tabs-list';
import ScrolledContainer from '../scrolled-container/scrolled-container';

import styles from './burger-ingredients.module.css';

import getAdaptedIngredientsData from './utils';

function BurgerIngredients () {
  const ingredientsData = useSelector( state => state.burgerIngredients.items );
  const [ activeTab, setActiveTab ] = useState( 'bun' );

  const bunIngredientsRef = useRef<HTMLElement>( null );
  const sauceIngredientsRef = useRef<HTMLElement>( null );
  const mainIngredientsRef = useRef<HTMLElement>( null );

  const tabListRef = useRef<HTMLUListElement>( null );

  const refsMap = useMemo( () => ( {
    bun: bunIngredientsRef,
    sauce: sauceIngredientsRef,
    main: mainIngredientsRef,
  } ), [bunIngredientsRef, sauceIngredientsRef, mainIngredientsRef] );

  const adaptedIngredientsData = useMemo(
    () => getAdaptedIngredientsData( ingredientsData, refsMap ),
    [ingredientsData, refsMap]
  );

  const ingredientsSections = useMemo( () => {
    return Object.values( adaptedIngredientsData )
      .map( ( { name, title, items, ref } ) => {
        return (
          <section data-name={ name } ref={ ref } key={ title } className='pt-10'>
            <h3 className='text text_type_main-medium mb-6'>{ title }</h3>

            <ul className={ styles.list }>
              { items.map( ( ingredient, idx ) => (
                <li className={ styles.item } key={ idx }>
                  {
                    !!ingredient.quantity &&
                    <Counter count={ ingredient.quantity } size='default' />
                  }
                  <IngredientCard ingredient={ ingredient } />
                </li>
              ) ) }
            </ul>
          </section>
        );
      } );
  }, [adaptedIngredientsData] );

  const onTabClick = useCallback(
    ( value:string  ) => {
      setActiveTab( value );

      adaptedIngredientsData[value]
        .ref.current?.scrollIntoView( {
          behavior: 'smooth'
        } );
    },
    [adaptedIngredientsData, setActiveTab],
  );

  const setActiveTabOnScroll = useCallback(
    () => {
      const name = Object.values( adaptedIngredientsData )
        .find( ( { ref } ) => {
          return (
            ref.current!.getBoundingClientRect().top -
            tabListRef.current!.getBoundingClientRect().bottom +
            ( ref.current!.getBoundingClientRect().height / 1.3 ) ) > 0;
        } )!.name;
      setActiveTab( name );
    },
    [adaptedIngredientsData],
  );

  return (
    <section className={ styles.section }>
      <h2 className='visually-hidden'>Ингредиенты</h2>

      <TabsList tabListRef={ tabListRef } tabsData={ adaptedIngredientsData } activeTab={ activeTab } onClick={ onTabClick } />

      <ScrolledContainer maxHeight={ '716px' } onScroll={ setActiveTabOnScroll }>
        { ingredientsSections }
      </ScrolledContainer>
    </section>
  );
};

export default BurgerIngredients;

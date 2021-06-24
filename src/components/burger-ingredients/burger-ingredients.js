import React, { useState, useMemo, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetIngredient } from '../../store/slices/ingredient-details';
import { useToggle } from '../../hooks/customHoocs';

import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import IngredientCard from '../ingredient-card/ingredient-card';
import TabsList from '../tabs-list/tabs-list';
import ScrolledContainer from '../scrolled-container/scrolled-container';
import Modal from '../modal/modal';
import IngredientsDetail from '../ingredient-details/ingredient-details';

import styles from './burger-ingredients.module.css';

import getAdaptedIngredientsData from './utils';

function BurgerIngredients () {
  const dispatch = useDispatch();
  const ingredientsData = useSelector( state => state.burgerIngredients.items );
  const [ activeTab, setActiveTab ] = useState( 'bun' );
  const [isModalOpen, toggleModalOpen] = useToggle( false );

  const bunIngredientsRef = useRef( null );
  const sauceIngredientsRef = useRef( null );
  const mainIngredientsRef = useRef( null );

  const tabListRef = useRef( null );

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
                  <IngredientCard ingredient={ ingredient } toggleModalOpen={ toggleModalOpen } />
                </li>
              ) ) }
            </ul>
          </section>
        );
      } );
  }, [adaptedIngredientsData, toggleModalOpen] );

  const onTabClick = useCallback(
    ( value ) => {
      setActiveTab( value );
      adaptedIngredientsData[value]
        .ref.current.scrollIntoView( {
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
            ref.current.getBoundingClientRect().top -
            tabListRef.current.getBoundingClientRect().bottom +
            ( ref.current.getBoundingClientRect().height / 1.3 ) ) > 0;
        } ).name;
      setActiveTab( name );
    },
    [adaptedIngredientsData],
  );

  const closeModal = useCallback(
    () => {
      toggleModalOpen();
      dispatch( resetIngredient() );
    },
    [dispatch, toggleModalOpen],
  );

  return (
    <>
      {
        isModalOpen &&
        ( <Modal isOpen={ isModalOpen } title='Детали ингридиента' closeModal={ closeModal }>
          <IngredientsDetail />
        </Modal> )
      }
      <section className={ styles.section }>
        <h2 className='visually-hidden'>Ингредиенты</h2>

        <TabsList tabListRef={ tabListRef } tabsData={ adaptedIngredientsData } activeTab={ activeTab } onClick={ onTabClick } />

        <ScrolledContainer maxHeight={ '716px' } onScroll={ setActiveTabOnScroll }>
          { ingredientsSections }
        </ScrolledContainer>
      </section>
    </>
  );
};

export default BurgerIngredients;

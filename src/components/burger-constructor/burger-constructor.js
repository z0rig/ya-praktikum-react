import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { ConstructorElement, CurrencyIcon, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import ScrolledContainer from '../scrolled-container/scrolled-container';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import ActiveBun from '../active-bun/active-bun';

import { useToggle } from '../../hooks/customHoocs';

import styles from './burger-constructor.module.css';

const BurgerConstructor = () => {
  const { bun, items } = useSelector( state => state.burgerConstructor );
  const [isModalOpen, toggleModalActive] = useToggle( false );

  const totalPrice = useMemo( () => {
    if ( !bun || !items.length ) {
      return 0;
    }

    return bun.price + items.reduce( ( acc, ingredient ) => acc + ingredient.price, 0 );
  }, [bun, items] );

  const ingredientsIds = useMemo( () => {
    if ( !bun || !items.length ) {
      return [];
    }

    return [...items.map( ( ingredient ) => ingredient._id ), bun._id];
  }, [bun, items] );

  const ingredients = useMemo( () => {
    if ( !items.length ) {
      return (
        <li
          className={ styles.item }
        >
          Тут пусто(( Перетащите сюда желаемые ингредиенты!
        </li>
      );
    }

    return items.map( ( ingredient, idx ) => {
      return (
        <li
          key={ ingredient._id }
          className={ `${ styles.item } ${ ( idx === items.length - 1 ) ? '' : styles['item_mb-4'] }` }
        >
          <DragIcon type='primary' />
          <ConstructorElement thumbnail={ ingredient.image } text={ ingredient.name } price={ ingredient.price } />
        </li>
      );
    } );
  }, [items] );

  const constructor = useMemo( () => {
    return (
      <>
        <div className={ styles.ingredientsData }>
          <ActiveBun >
            <ScrolledContainer maxHeight='455px'>
              <ul className={ styles.list }>
                { ingredients }
              </ul>
            </ScrolledContainer>
          </ActiveBun>
        </div>
        {
          bun &&
          !!items.length &&
          ( <div className={ styles.helper }>
            <p className={ styles.price }>{ totalPrice } <CurrencyIcon type='primary' /></p>

            <Button type='primary' size='large' onClick={ toggleModalActive }>
              Оформить заказ
            </Button>
          </div> )
        }
      </>
    );
  }, [ingredients, bun, items, totalPrice, toggleModalActive] );

  return (
    <>
      {
        isModalOpen &&
        ( <Modal isOpen={ isModalOpen } closeModal={ toggleModalActive } >
          <OrderDetails ingredientsIds={ ingredientsIds } />
        </Modal> )
      }
      <section className={ styles.section }>
        <h2 className='visually-hidden'>Конструктор бургера</h2>
        { constructor }
      </section>
    </>
  );
};

export default BurgerConstructor;

import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, addBun } from '../../store/slices/burger-constructor';

import { useDrop } from 'react-dnd';

import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import ConstructorItem from '../constructior-item/constructor-item';
import ScrolledContainer from '../scrolled-container/scrolled-container';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import ActiveBun from '../active-bun/active-bun';

import { useToggle } from '../../hooks/customHoocs';

import styles from './burger-constructor.module.css';

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const { bun, items } = useSelector( state => state.burgerConstructor );
  const [isModalOpen, toggleModalActive] = useToggle( false );

  const [{ isOver, canDrop }, dropTarget] = useDrop( {
    accept: 'ingredients',
    drop ( item ) {
      if ( item.type === 'bun' ) {
        dispatch( addBun( { bun: item, activeBun: bun } ) );
      } else {
        dispatch( addItem( item ) );
      }
    },
    collect: ( monitor ) => ( {
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    } ),
  } );

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
          className={ styles.placeholder }
        >
          <p className={ styles['placeholder-text'] }>Тут пусто(( <br /> Тащи сюда  ингредиенты!</p>
        </li>
      );
    }

    return items.map( ( item, idx ) => {
      return (
        <li key={ item.constructorId } className={ `${ styles.item } ${ ( idx === items.length - 1 ) ? '' : styles['item_mb-4'] }` } >
          <ConstructorItem ingredient={ item } idx={ idx } />
        </li>
      );
    } );
  }, [items] );

  const constructor = useMemo( () => {
    const isActive = isOver && canDrop;
    let backgroundColor = '';
    if ( isActive ) {
      backgroundColor = 'darkgreen';
    }
    else if ( canDrop ) {
      backgroundColor = 'darkkhaki';
    }

    return (
      <>
        <div style={ { backgroundColor } } ref={ dropTarget } className={ styles.ingredientsData }>
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
  }, [ingredients, bun, items, totalPrice, toggleModalActive, dropTarget, isOver, canDrop] );

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

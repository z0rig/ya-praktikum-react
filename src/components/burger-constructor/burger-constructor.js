import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, addBun } from '../../store/slices/burger-constructor';

import { useDrop } from 'react-dnd';

import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

import ConstructorItem from '../constructior-item/constructor-item';
import ScrolledContainer from '../scrolled-container/scrolled-container';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import ActiveBun from '../active-bun/active-bun';
import Price from '../price/price';

import { useToggle } from '../../hooks/customHoocs';

import styles from './burger-constructor.module.css';

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const { bun, items } = useSelector( ( state ) => state.burgerConstructor );
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

    return bun.price + items
      .reduce( ( acc, ingredient ) => acc + ingredient.price, 0 );
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
        <li key={ item.constructorId } className={ styles.item } >
          <ConstructorItem ingredient={ item } idx={ idx } />
        </li>
      );
    } );
  }, [items] );

  const constructor = useMemo( () => {
    let droppedZoneClassName = `${ styles.ingredientsData }`;

    const ingredientInflight = isOver && canDrop;
    if ( ingredientInflight ) {
      droppedZoneClassName =
        `${ styles.ingredientsData } ${ styles.ingredientInflight }`;
    }
    else if ( canDrop ) {
      droppedZoneClassName =
        `${ styles.ingredientsData } ${ styles.canDrop }`;
    }

    return (
      <>
        <div ref={ dropTarget } className={ droppedZoneClassName }>
          <ActiveBun >
            <ScrolledContainer maxHeight='455px'>
              <ul className={ styles.list }>
                { ingredients }
              </ul>
            </ScrolledContainer>
          </ActiveBun>
        </div>
      </>
    );
  }, [ ingredients, dropTarget, isOver, canDrop ] );

  const constructorFooter = useMemo( () => {
    if ( bun && !!items.length ) {
      return (
        <div className={ styles.helper }>
          <Price>{ totalPrice }</Price>

          <Button type='primary' size='large' onClick={ toggleModalActive }>
            Оформить заказ
          </Button>
        </div>
      );
    }
  }, [bun, items, toggleModalActive, totalPrice] );

  return (
    <>
      {
        isModalOpen &&
        (
          <Modal isOpen={ isModalOpen } onClose={ toggleModalActive } >
            <OrderDetails />
          </Modal>
        )
      }
      <section className={ styles.section }>
        <h2 className='visually-hidden'>Конструктор бургера</h2>
        { constructor }
        { constructorFooter }
      </section>
    </>
  );
};

export default BurgerConstructor;

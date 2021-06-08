import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { ConstructorElement, CurrencyIcon, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import ScrolledContainer from '../scrolled-container/scrolled-container';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import ActiveBun from '../active-bun/active-bun';

import { useToggle } from '../../utils/customHoocs';

import styles from './burger-constructor.module.css';

const BurgerConstructor = ( { ingredients, activeBun } ) => {
  const [isModalOpen, toggleModalActive] = useToggle( false );
  const [bun] = useState( activeBun );

  return (
    <>
      {
        isModalOpen &&
        <Modal closeModal={ toggleModalActive } >
          <OrderDetails />
        </Modal>
      }
      <section className={ styles.section }>
        <h2 className='visually-hidden'>Конструктор бургера</h2>

        <div className={ styles.ingredients }>
          <ActiveBun bun={ bun }>
            <ScrolledContainer maxHeight='455px'>
              <ul className={ styles.list }>
                { ingredients.map( ( ingredient, idx ) => {
                  return (
                    <li
                      key={ ingredient._id }
                      className={ `${ styles.item } ${ ( idx === ingredients.length - 1 ) ? '' : styles['item_mb-4'] }` }
                    >
                      <DragIcon type='primary' />
                      <ConstructorElement thumbnail={ ingredient.image } text={ ingredient.name } price={ ingredient.price } />
                    </li>
                  );
                } ) }
              </ul>
            </ScrolledContainer>
          </ActiveBun>
        </div>
        <div className={ styles.helper }>
          <p className={ styles.price }>610 <CurrencyIcon type='primary' /></p>

          <Button type='primary' size='large' onClick={ toggleModalActive }>
            Оформить заказ
          </Button>
        </div>
      </section>
    </>
  );
};

export default BurgerConstructor;

BurgerConstructor.propTypes = {
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
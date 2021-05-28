import React from 'react';

import { ConstructorElement, CurrencyIcon, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import ScrolledContainer from '../scrolled-container/scrolled-container';

import styles from './burger-constructor.module.css';

import data from '../../utils/data';

const bun = data[0];
const filteredData = data.filter((ingredient) => (ingredient.type !== 'bun'));

const BurgerConstructor = () => (
  <section className={ `${styles.section} pt-5 pr-2 pl-4` }>
    <h2 className="visually-hidden">Конструктор бургера</h2>

    <div className={ `${styles.ingredients} pb-10` }>
      <ConstructorElement
        price={bun.price}
        thumbnail={bun.image}
        text={`${bun.name} (верх)`}
        type="top"
        isLocked={true}
      />
        <ScrolledContainer maxHeight='471px'>
          <ul className={ `${ styles.list } pt-4 pr-2` }>
          {filteredData.map((ingredient, idx) => {
              return (
                <li
                  key={ingredient._id}
                  className={`${styles.item} ${(idx === filteredData.length - 1) ? '' : 'mb-4'}`}
                >
                  <DragIcon type="primary" />
                  <ConstructorElement thumbnail={ingredient.image} text={ingredient.name} price={ingredient.price} />
                </li>
              )
            })}
          </ul>
        </ScrolledContainer>
      <ConstructorElement
        price={ bun.price }
        thumbnail={ bun.image }
        text={ `${bun.name} (низ)` }
        type="bottom"
        isLocked={true}
      />
    </div>
    <div className={styles.helper}>
      <p className={`${styles.price} mr-10 text text_type_digits-medium`}>610 <CurrencyIcon type="primary" /></p>

      <Button type="primary" size="large">
        Оформить заказ
      </Button>
    </div>
</section>
);

export default BurgerConstructor;
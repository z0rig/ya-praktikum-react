import React, { useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { removeItem, swapItems } from '../../store/slices/burger-constructor';

import { useDrop, useDrag } from 'react-dnd';

import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './constructor-item.module.css';

const ConstructorItem = ( { ingredient, idx } ) => {
  const dispatch = useDispatch();
  const ref = useRef( null );

  const [, drag] = useDrag( {
    type: 'constructorItem',
    item: { idx },
    collect: ( monitor ) => ( {
      isDragging: monitor.isDragging(),
    } ),
  } );

  const [, drop] = useDrop( {
    accept: 'constructorItem',
    hover: ( item ) => {
      if ( !ref.current ) {
        return;
      }

      const dragIndex = item.idx;
      const hoverIndex = idx;

      if ( dragIndex === hoverIndex ) {
        return;
      }

      dispatch( swapItems( { from: dragIndex, to: hoverIndex } ) );

      item.idx = hoverIndex;
    },
  } );


  const removeFromConstructor = useCallback( () => {
    dispatch( removeItem( ingredient._id ) );
  }, [ingredient._id, dispatch] );

  drag( drop( ref ) );
  return (
    <div
      className={ styles.item }
      ref={ ref }
    >
      <DragIcon type='primary' />
      <ConstructorElement thumbnail={ ingredient.image } text={ ingredient.name } price={ ingredient.price } handleClose={ removeFromConstructor } />
    </div>
  );
};

export default ConstructorItem;

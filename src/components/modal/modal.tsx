import React, { useEffect, useCallback, ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import ModalOverlay from '../modal-overlay/modal-overlay';

import styles from './modal.module.css';

const modalRoot = document.getElementById( 'modal' ) as HTMLDivElement;

interface IModal {
  children: ReactNode,
  title?: string,
  onClose: () => void
}

const Modal = ( { children, title, onClose }: IModal ) => {
  const closeModal = useCallback( ( evt ) => {
    evt.preventDefault();

    onClose();
  }, [ onClose ] );

  useEffect( () => {
    const onDocumentKeyDown = ( evt: {code: string} ) => {
      if ( evt.code === 'Escape' ) {
        closeModal( evt );
      }
    };

    window.addEventListener( 'keydown', onDocumentKeyDown );
    return () => {
      window.removeEventListener( 'keydown', onDocumentKeyDown );
    };
  }, [closeModal] );

  return ( createPortal(
    <ModalOverlay onClick={ closeModal }>
      <div className={ styles.modal }>
        <header className={ styles.header }>
          <h2 className={ styles.title }>{ title }</h2>
          <button onClick={ closeModal } className={ styles['close-btn'] } aria-label='Закрыть модальое окно' type='button'>
            <CloseIcon type='primary' />
          </button>
        </header>
        { children }
      </div>
    </ModalOverlay>,
    modalRoot ) );
};

export default Modal;

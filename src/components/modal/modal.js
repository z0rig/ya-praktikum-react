import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import ModalOverlay from '../modal-overlay/modal-overlay';

import styles from './modal.module.css';

const modalRoot = document.getElementById( 'modal' );

const Modal = ( { children, title, closeModal } ) => {
  useEffect( () => {
    const onDocumentKeyDown = ( { code } ) => {
      if ( code === 'Escape' ) {
        closeModal();
      }
    };

    window.addEventListener( 'keydown', onDocumentKeyDown );
    return () => {
      window.removeEventListener( 'keydown', onDocumentKeyDown );
    }
  }, [closeModal] );

  return ( createPortal(
    <ModalOverlay onClick={ closeModal }>
      <div className={ styles.modal }>
        <header className={ styles.header }>
          <h2 className={ styles.title }>{ title }</h2>
          <button onClick={ closeModal } className={ styles['close-btn'] } aria-label='Закрыть модальое окно'>
            <CloseIcon type="primary" />
          </button>
        </header>
        { children }
      </div>
    </ModalOverlay>,
    modalRoot ) )
};

export default Modal;

Modal.propTypes = {
  title: PropTypes.string,
  closeModal: PropTypes.func
}

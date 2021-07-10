import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import ModalOverlay from '../modal-overlay/modal-overlay';

import styles from './modal.module.css';

const modalRoot = document.getElementById( 'modal' );

const Modal = ( { children, title, isOpen, onClose } ) => {
  const closeModal = useCallback( ( evt ) => {
    evt.preventDefault();

    onClose();
  }, [ onClose ] );

  useEffect( () => {
    const onDocumentKeyDown = ( evt ) => {
      if ( evt.code === 'Escape' ) {
        closeModal( evt );
      }
    };

    window.addEventListener( 'keydown', onDocumentKeyDown );
    return () => {
      window.removeEventListener( 'keydown', onDocumentKeyDown );
    };
  }, [closeModal, isOpen] );

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

Modal.propTypes = {
  title: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
};

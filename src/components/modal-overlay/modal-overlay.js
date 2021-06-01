import React from 'react';
import PropTypes from 'prop-types';

import styles from './modal-overlay.module.css'

const ModalOverlay = ( { children, onClick } ) => {
  const onOverlayClick = ( { target } ) => {
    if ( target.classList.contains( 'js-overlay' ) ) {
      onClick();
    }
  }

  return (
    <div onClick={ onOverlayClick } className={ `${ styles.overlay } js-overlay` }>
      { children }
    </div>
  )
}

export default ModalOverlay;

ModalOverlay.propTypes = {
  onClick: PropTypes.func
}
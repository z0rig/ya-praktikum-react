import React from 'react';
import PropTypes from 'prop-types';

import styles from './modal-overlay.module.css';

const ModalOverlay = ( { children, onClick } ) => {
  const onOverlayClick = ( evt ) => {
    if ( evt.target.classList.contains( 'js-overlay' ) ) {
      onClick( evt );
    }
  };

  return (
    <div onClick={ onOverlayClick } className={ `${ styles.overlay } js-overlay` }>
      { children }
    </div>
  );
};

export default ModalOverlay;

ModalOverlay.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.element.isRequired
};

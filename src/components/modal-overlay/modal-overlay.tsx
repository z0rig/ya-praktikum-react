import React, { MouseEvent } from 'react';

import styles from './modal-overlay.module.css';
import { ReactNode } from 'react';

interface IModalOverlay {
  children: ReactNode;
  onClick: ( evt: MouseEvent<HTMLDivElement> ) => void;
}

const ModalOverlay = ( { children, onClick }: IModalOverlay ) => {
  const onOverlayClick = ( evt: MouseEvent<HTMLDivElement> ) => {
    const target = evt.target as HTMLDivElement;

    if ( target.classList.contains( 'js-overlay' ) ) {
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

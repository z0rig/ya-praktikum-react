import React from 'react';
import PropTypes from 'prop-types';

import styles from './scrolled-container.module.css';

const ScrolledContainer = ( { maxHeight, children, onScroll } ) => (
  <div style={ { maxHeight } } className={ styles.scroll } onScroll={ onScroll }>
    { children }
  </div>
);

export default ScrolledContainer;

ScrolledContainer.propTypes = {
  maxHeight: PropTypes.string
};

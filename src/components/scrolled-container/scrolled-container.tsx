import React from 'react';
import PropTypes from 'prop-types';

import styles from './scrolled-container.module.css';
import { ReactNode } from 'react';

interface IScrolledContainer {
  maxHeight: string,
  children: ReactNode,
  onScroll?: () => void;
}

const ScrolledContainer = ( { maxHeight, children, onScroll }: IScrolledContainer ) => (
  <div
    style={ { maxHeight } }
    className={ styles.scroll }
    onScroll={ onScroll }
  >
    { children }
  </div>
);

export default ScrolledContainer;

ScrolledContainer.propTypes = {
  maxHeight: PropTypes.string,
  children: PropTypes.oneOfType(
    [ PropTypes.element, PropTypes.array ]
  ).isRequired,
  onScroll: PropTypes.func
};

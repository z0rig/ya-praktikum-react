import React from 'react';
import PropTypes from 'prop-types'

import styles from './scrolled-container.module.css'

const ScrolledContainer = ({ maxHeight, children }) => (
  <div style={{ maxHeight }} className={styles.scroll}>
    {children}
  </div>
);

export default ScrolledContainer;

ScrolledContainer.propTypes = {
  maxHeight: PropTypes.string
}
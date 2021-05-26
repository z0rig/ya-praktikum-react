import React from 'react'

import styles from './scrolled-container.module.css'

const ScrolledContainer = ({ maxHeight, children }) => (
  <div style={{ maxHeight }} className={styles.scroll}>
    {children}
  </div>
);

export default ScrolledContainer;
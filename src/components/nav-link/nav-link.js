import React from 'react';
import PropTypes from 'prop-types';

import styles from './nav-link.module.css';

const NavLink = ( { url, isActive, children } ) => (
  <a
    className={ `${ styles['nav-link'] } ${ isActive ? styles.active : '' }` }
    href={ url }
  >
    {children }
  </a>
);

export default NavLink;

NavLink.propTypes = {
  url: PropTypes.string,
  isActive: PropTypes.bool,
};
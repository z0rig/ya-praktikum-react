import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './nav-link.module.css';

const NavLink = ( { url, isActive, children } ) => (
  <Link
    className={ `${ styles['nav-link'] } ${ isActive ? styles.active : '' }` }
    to={ url }
  >
    { children }
  </Link>
);

export default NavLink;

NavLink.propTypes = {
  url: PropTypes.string,
  isActive: PropTypes.bool,
};

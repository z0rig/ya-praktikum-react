import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './note.module.css';

const Note = ( { link: { text, href }, children } ) => {
  return (
    <p className={ styles.note }>
      { children } <Link to={ href } className={ styles.link }>{ text }</Link>
    </p>
  );
};

export default Note;

Note.propTypes = {
  link: PropTypes.shape( {
    text: PropTypes.string,
    href: PropTypes.string,
  } ).isRequired,
  children: PropTypes.oneOfType(
    [ PropTypes.element, PropTypes.string ]
  ).isRequired
};

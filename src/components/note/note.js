import React from 'react';
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

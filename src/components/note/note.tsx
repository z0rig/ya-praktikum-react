import React from 'react';
import { Link } from 'react-router-dom';

import styles from './note.module.css';
import { ReactNode } from 'react';

interface INote {
  link: {
    text: string
    href: string
  },
  children: ReactNode
}

const Note = ( { link: { text, href }, children }: INote ) => {
  return (
    <p className={ styles.note }>
      { children } <Link to={ href } className={ styles.link }>{ text }</Link>
    </p>
  );
};

export default Note;

import React from 'react';

import styles from './not-found-404.module.css';

const NotFound404 = () => {
  return (
    <div className={ styles.wrapper }>
      <p className={ styles.text }>Страница не найдена!</p>
    </div>
  );
};

export default NotFound404;

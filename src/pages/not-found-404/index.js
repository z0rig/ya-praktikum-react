import React from 'react';

import styles from './not-found-404.module.css';

const NotFound404 = () => {
  return (
    <div className={ styles.wrapper }>
      <h1 className={ styles.text }>Страница не найдена!</h1>
    </div>
  );
};

export default NotFound404;

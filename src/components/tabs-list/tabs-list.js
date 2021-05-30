import React from 'react';
import PropTypes from 'prop-types';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './tabs-list.module.css';

const TABS = ['Булки', 'Соусы', 'Начинки'];

const TabsList = ( { activeTab, onClick } ) => {
  const listItems = TABS.map( ( tabContent, idx ) => (
    <li key={ idx } className={ styles.item }>
      <Tab
        value={ tabContent }
        active={ tabContent === activeTab }
        onClick={ onClick }
      >{ tabContent }</Tab>
    </li>
  ) );

  return <ul className={ styles.list }>{ listItems }</ul>
}

export default TabsList;

TabsList.propTypes = {
  activeTab: PropTypes.string,
  onClick: PropTypes.func
}
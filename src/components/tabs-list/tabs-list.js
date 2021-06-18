import React from 'react';
import PropTypes from 'prop-types';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './tabs-list.module.css';

const TabsList = ( { tabsData, activeTab, onClick, tabListRef } ) => {
  const listItems = Object.keys( tabsData )
    .map( ( key, idx ) => (
      <li key={ idx } className={ styles.item }>
        <Tab
          value={ key }
          active={ key === activeTab }
          onClick={ onClick }
        >{ tabsData[key].title }</Tab>
      </li>
    ) );

  return <ul ref={ tabListRef } className={ styles.list }>{ listItems }</ul>;
};

export default TabsList;

TabsList.propTypes = {
  activeTab: PropTypes.string,
  onClick: PropTypes.func
};

import React, { Ref, useMemo } from 'react';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './tabs-list.module.css';
import { IAdaptedIngredientsData } from '../burger-ingredients/utils';

interface ITabsList {
  tabsData: IAdaptedIngredientsData,
  activeTab: string,
  onClick: ( value:string ) => void,
  tabListRef: Ref<HTMLUListElement>
}

const TabsList = ( { tabsData, activeTab, onClick, tabListRef }: ITabsList ) => {
  const listItems = useMemo( () => ( Object.keys( tabsData )
    .map( ( key, idx ) => (
      <li key={ idx } className={ styles.item }>
        <Tab
          value={ key }
          active={ key === activeTab }
          onClick={ onClick }
        >{ tabsData[ key ].title }</Tab>
      </li>
    ) ) ), [tabsData, activeTab, onClick] );

  return <ul ref={ tabListRef } className={ styles.list }>{ listItems }</ul>;
};

export default TabsList;

import React from 'react';

import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import IngridientCard from '../ingridient-card'
import TabsList from '../tabs-list';
import ScrolledContainer from '../scrolled-container';

import styles from './burger-ingredients.module.css';

class BurgerIngredients extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activeTab: 'Булки'
    }
  }

  setActiveTab = (activeTab) => {
    this.setState({
      activeTab
    });
  }

  getAdaptedData() {
    const ingredientSectionsData = {
      bun: {
        title: 'Булки',
        items: []
      },
      main: {
        title: 'Начинки',
        items: []
      },
      sauce: {
        title: 'Соусы',
        items: []
      }
    };

    this.props.data.forEach((ingredient) => {
      ingredientSectionsData[ingredient.type].items
        .push(ingredient);
    })

    return ingredientSectionsData;
  }

  render() {
    const { activeTab } = this.state;

    return (
      <section className={ styles.section }>
        <h2 className="visually-hidden">Ингредиенты</h2>

        <TabsList activeTab={ activeTab } onClick={this.setActiveTab} />

        <ScrolledContainer maxHeight={ '716px' }>
          {
            Object.values(this.getAdaptedData())
              .map(({ title, items }) => (
                <section key={ title } className='pt-10'>
                  <h3 className='text text_type_main-medium mb-6'>{title}</h3>

                  <ul className={ `${ styles.list } pl-4 pr-1` }>
                    {items.map((ingridient) => (
                      <li className={ styles.item } key={ingridient.id}>
                        <Counter count={1} size="default" />
                        <IngridientCard {...ingridient} />
                      </li>
                    ))}
                  </ul>
                </section>
            ))
          }
        </ScrolledContainer>
      </section>
    );
  }
};

export default BurgerIngredients;
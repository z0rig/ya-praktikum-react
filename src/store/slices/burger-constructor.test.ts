import burgerConstructorReducer from './burger-constructor';

import {
  addItem,
  removeItem,
  addBun,
  swapItems
} from './burger-constructor';

import { initialState } from './burger-constructor';

import { postOrder } from './posted-order-details';

describe( 'burger constructor reducer', () => {
  it( 'should return the initial state', () => {
    expect( burgerConstructorReducer( undefined, { type: '' } ) )
      .toEqual( initialState );
  } );

  it( 'should handle post order', () => {
    expect(
      burgerConstructorReducer(
        undefined,
        postOrder.fulfilled )
        )
      .toEqual( initialState );
  } );

  it( 'should handle add item', () => {
    const payload = { constructorId: '12746f' };

    expect(
      burgerConstructorReducer(
        initialState,
        addItem( payload ) )
        )
      .toEqual( {
        ...initialState,
        items: [{ constructorId: '12746f' }],
      } );
  } );

  it( 'should handle remove item', () => {
    const removedItemId = '23sd2';

    const removedItem = {
      _id: removedItemId
    };

    const commonItem = { _id: '231das' };

    const items = [removedItem, commonItem];

    expect(
      burgerConstructorReducer(
        { items },
        removeItem( removedItemId ) )
        )
      .toEqual( { items: [commonItem] } );
  } );

  it( 'should handle add bun', () => {
    const addedBun = { type: 'bun', _id: 'daw2da' };
    expect(
      burgerConstructorReducer(
        { bun: null },
        addBun( { bun: addedBun, activeBun: null } ) )
        )
      .toEqual( { bun: addedBun } );
  } );

  it( 'should handle swap items', () => {
    const item1 = { _id: 'daw23' };
    const item2 = { _id: 'fgr32' };

    const items = [item1, item2];
    expect(
      burgerConstructorReducer(
        { items },
        swapItems( { from: 1, to: 0 } ) )
        )
      .toEqual( { items: [item2, item1] } );
  } );
} );

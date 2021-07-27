import burgerIngredientsReducer from './burger-ingredients';
import { fetchIngredients } from './burger-ingredients';
import { initialState } from './burger-ingredients';

import { addItem, removeItem, addBun } from './burger-constructor';
import { postOrder } from './posted-order-details';


describe( 'burger ingredients reducer', () => {
  it( 'should return the initial state', () => {
    expect( burgerIngredientsReducer( undefined, {} ) )
      .toEqual( initialState );
  } );

  it( 'should handle fetch ingredients fulfilled', () => {
    const items = [ { _id: 'fsef23' }, { _id: 'fsd2fs' } ];

    expect( burgerIngredientsReducer(
      initialState,
      fetchIngredients.fulfilled( items ) )
    )
    .toEqual( {
      ...initialState,
      loading: false,
      items
    } );
  } );

  it( 'should handle fetch ingredients pending', () => {
    expect( burgerIngredientsReducer(
      initialState,
      fetchIngredients.pending() )
    )
    .toEqual( {
      ...initialState,
      loading: true,
    } );
  } );

  it( 'should handle fetch ingredients rejected', () => {
    expect( burgerIngredientsReducer(
      initialState,
      fetchIngredients.rejected( 'error' ) )
    )
    .toEqual( {
      ...initialState,
      error: { 'message': 'error', }
    } );
  } );

  it( 'should handle add item', () => {
    const item = { _id: 'daw2af' };
    const items = [ { _id: 'daw2af' } ];

    expect( burgerIngredientsReducer(
      { ...initialState, items },
      addItem( item ) )
    )
    .toEqual( { ...initialState, items: [{ ...item, quantity: 1 }] } );
  } );

  it( 'should handle remove item', () => {
    const deleteditemId = 'daw2af';
    const item = { _id: deleteditemId, quantity: 1 };
    const items = [ item ];

    expect( burgerIngredientsReducer(
      { ...initialState, items },
      removeItem( deleteditemId ) )
    )
    .toEqual( { ...initialState, items:  [ { ...item, quantity: 0 } ] } );
  } );

  it( 'should handle add bun', () => {
    const activeBun = { _id: 'da2faf', quantity: 1 };
    const newBun = { _id: 'jln3kb' };

    const items = [ activeBun, newBun ];

    expect( burgerIngredientsReducer(
      { ...initialState, items },
      addBun( { activeBun, bun: newBun } ) )
    )
      .toEqual( {
        ...initialState,
        items: [
          { ...activeBun, quantity: 0 },
          { ...newBun, quantity: 1 }
        ]
      } );
  } );

  it( 'should handle post order fulfilled', () => {
    const itemsBefore = [
      { quantity: 1 },
      { quantity: 10 },
      { quantity: 0 }
    ];

    const itemsAfter = [
      { quantity: 0 },
      { quantity: 0 },
      { quantity: 0 }
    ];

    expect( burgerIngredientsReducer(
      { ...initialState, items: itemsBefore },
      postOrder.fulfilled() )
    )
    .toEqual( { ...initialState, items: itemsAfter }, );
  } );
} );

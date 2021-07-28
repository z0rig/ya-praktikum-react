describe( 'dnd on home page', function () {
   before( function() {
    cy.visit( 'http://localhost:3000' );
   } );

  it( 'is dnd handle correct', function() {
    cy.get( 'article[class^="ingridient-card"]' ).first()
      .trigger( 'dragstart' );

    cy.get( 'div[class^="burger-constructor_ingredientsData"]' )
      .trigger( 'dragenter' )
      .trigger( 'drop' );

    cy.get( '.constructor-element' ).should( 'be.exist' );
  } );
} );

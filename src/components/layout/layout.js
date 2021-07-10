import React from 'react';
import PropTypes from 'prop-types';

import AppHeader from '../app-header/app-header';

const Layout = ( { children } ) => {
  return (
    <>
      <AppHeader />
      <main className='pt-10'>
        <div className='container pl-5 pr-5'>
          { children }
        </div>
      </main>
    </>
  );
};
Layout.propTypes = {
  children: PropTypes.oneOfType(
    [ PropTypes.element, PropTypes.array ]
  ).isRequired,
};

export default Layout;

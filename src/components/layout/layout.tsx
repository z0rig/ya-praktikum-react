import React, { ReactNode } from 'react';

import AppHeader from '../app-header/app-header';

const Layout = ( { children }: {children: ReactNode } ) => {
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

export default Layout;

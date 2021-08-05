import { createAction, PayloadActionCreator } from '@reduxjs/toolkit';

interface IWsCommonActions {
  wsConnectionInit: PayloadActionCreator<string>;
  wsConnectionClose: PayloadActionCreator
}

const wsCommonActions: IWsCommonActions = {
  wsConnectionInit: createAction( 'WS_CONNECTION_INIT' ),
  wsConnectionClose: createAction( 'WS_CONNECTION_CLOSE' )
};

export default wsCommonActions;

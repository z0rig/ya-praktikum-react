import { AnyAction, MiddlewareAPI } from '@reduxjs/toolkit';
import wsServices from '../../services/wsServices';
import wsActions from '../ws-actions/index';

export const socketMiddleware = () => {
  return ( store: MiddlewareAPI ) => {
    let socket: WebSocket | null = null;
    let socketName = '';
    return ( next: ( a: AnyAction ) => void ) => ( action: AnyAction ) => {
      const { dispatch } = store;
      const { type, payload } = action;
      if ( type === wsActions.common.wsConnectionInit.toString() ) {
        socketName = payload;
        socket = wsServices[ payload ]();
      }

      if ( type === wsActions.common.wsConnectionClose.toString() ) {
        socket && socket.close();
      }

      if ( socket ) {
        socket.onopen = ( event ) => {
          dispatch(  wsActions[socketName].onOpen( event.type ) );
        };

        socket.onmessage = ( event ) => {
          const { data } = event;
          const parsedData = JSON.parse( data );
          dispatch(  wsActions[socketName].onMessage( parsedData ) );
        };

        socket.onerror = ( event ) => {
          dispatch(  wsActions[socketName].onError( event.type ) );
        };

        socket.onclose = ( event ) => {
          dispatch(  wsActions[socketName].onClose( event.type ) );
        };
      }
      next( action );
    };
  };
};

export default socketMiddleware;

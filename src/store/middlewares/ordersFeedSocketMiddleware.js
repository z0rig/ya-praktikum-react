import wsServices from '../../services/wsServices';
import wsActions from '../ws-actions.js';

export const socketMiddleware = () => {
  return ( store ) => {
    let socket = null;
    let socketName = '';
    return ( next ) => ( action ) => {
      const { dispatch } = store;
      const { type, payload } = action;
      if ( type === wsActions.common.wsConnectionInit.toString() ) {
        socketName = payload;
        socket = wsServices[ payload ]();
      }

      if ( type === wsActions.common.wsConnectionClose.toString() ) {
        socket.close();
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

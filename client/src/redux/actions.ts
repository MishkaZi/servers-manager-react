import ServerModel from '../ServerModel';

import { ServersAction } from './reducers';

export const setServersAction = (servers: ServerModel[]): ServersAction => {
  return {
    type: 'SET_SERVERS',
    payload: servers,
  };
};

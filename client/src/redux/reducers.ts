import ServerModel from '../ServerModel';

export interface ServersAction {
  type: string;
  payload: ServerModel[];
}

export interface defaultStateI {
  servers?: ServerModel[];
}

const initialState: defaultStateI = {};

export const serversReducer = (
  state: defaultStateI = initialState,
  action: ServersAction
): defaultStateI => {
  const newAppState = { ...state };

  switch (action.type) {
    case 'SET_SERVERS':
      newAppState.servers = action.payload;
      return newAppState;

    default:
      return newAppState;
  }
};

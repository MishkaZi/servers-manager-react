import { createStore } from 'redux';
import { serversReducer } from './reducers';

export type RootStore = ReturnType<typeof serversReducer>;

export const store = createStore(serversReducer);

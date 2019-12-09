import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import userReducer from './users/reducer';
import thunk from 'redux-thunk';
import deviceReducer, {IDeviceState} from './device';

const rootReducer = combineReducers({
  userReducer,
  deviceReducer,
});

export interface IStore {
  deviceReducer: IDeviceState;
}

export default createStore(rootReducer, {}, compose(applyMiddleware(thunk)));

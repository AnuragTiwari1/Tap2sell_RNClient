import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import userReducer from './users/reducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  userReducer,
});

export default createStore(rootReducer, {}, compose(applyMiddleware(thunk)));

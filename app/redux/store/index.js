import {createStore, combineReducers, applyMiddleware} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';
import mainReducer from '../reducers/main-reducer';

const persistConfig = {
  key: 'dev-16',
  storage: AsyncStorage,
  timeout: 100000,
};

let middleware = [thunk];

const rootReducer = combineReducers({
  main: mainReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(...middleware));
const persistor = persistStore(store);

export {store, persistor};

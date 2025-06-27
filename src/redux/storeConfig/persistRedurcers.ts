import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage';

const persistConfig = {
    key: 'vegas-xx-admin',
    storage,
    blacklist: [],
    whitelist: ['auth']
};

export default (reducers: any) => persistReducer(persistConfig, reducers);

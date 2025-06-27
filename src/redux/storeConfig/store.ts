import { persistStore } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch as rawUseDispatch, useSelector as rawUseSelector } from 'react-redux';

// Fix circular dependency by importing from specific files
import rootReducer from '../reducers/rootReducer';
import persistReducer from './persistRedurcers';

const store = configureStore({
    reducer: persistReducer(rootReducer),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
            immutableCheck: false,
        }),
});

const persister = persistStore(store);

// Infer types
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

// Typed hooks
const useDispatch: () => AppDispatch = rawUseDispatch;
const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;

export { store, persister, useDispatch, useSelector };
export type { AppDispatch, RootState };
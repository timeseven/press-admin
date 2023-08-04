import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { CollapsedReducer } from "./reducer/CollapsedReducer";
import { LoadingReducer } from "./reducer/LoadingReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["LoadingReducer"],
};

const reducer = combineReducers({
  CollapsedReducer,
  LoadingReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["persist/PERSIST"],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["meta.arg", "payload.timestamp"],
        // Ignore these paths in the state
        ignoredPaths: ["items.dates"],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };

/*
store.dispatch()
store.subscribe()
*/

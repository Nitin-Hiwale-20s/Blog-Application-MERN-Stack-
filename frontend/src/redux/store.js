import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import themeReducer from "./themeSlice";
import { persistStore } from "redux-persist";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import blogSlice from "./blogSlice";
import storage from "redux-persist/lib/storage";
import commentSlice from "./commentSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  auth: authSlice,
  theme: themeReducer,
  blog: blogSlice,
  comment: commentSlice
});


const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
export default store;

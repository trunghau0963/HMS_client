import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "./customStore";
import sidebarSlice from "./feature/sidebarSlice";
import getproSlice from "./feature/getproSlice";
import authSlice from "./feature/authSlice";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["sidebar", "getProSlice", "auth"], // Names of slices to persist
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    sidebar: sidebarSlice,
    getProSlice: getproSlice,
    auth: authSlice,
  })
);

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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

// import { configureStore } from "@reduxjs/toolkit";
// import sidebarSlice from "./feature/sidebarSlice";
// import getproSlice from "./feature/getproSlice";
// import authSlice from "./feature/authSlice";

// const store = configureStore({
//   reducer: {
//     sidebar: sidebarSlice,
//     getProSlice: getproSlice,
//     auth: authSlice,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// export default store;
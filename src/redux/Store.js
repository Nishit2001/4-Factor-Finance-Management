import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import loginSliceReducer from "./Slices/LoginSlice";
import dashboardSliceReducer from "./Slices/DashboardSlice";
import stateSliceReducer from "./Slices/DbStateSlice";

// Persist config for login slice
const loginPersistConfig = {
    key: 'login',
    storage,
};
const dashboardPersistConfig = {
    key: 'dashboard',
    storage,
};
const statePersistConfig = {
    key: 'state',
    storage,
};

// Persisted reducer for login slice
const persistedLoginReducer = persistReducer(loginPersistConfig, loginSliceReducer);
const persistedDashboardReducer = persistReducer(dashboardPersistConfig, dashboardSliceReducer);
const persistedStateReducer = persistReducer(statePersistConfig, stateSliceReducer);
// Configure the store with persisted login slice and other reducers
export const store = configureStore({
    reducer: {
        isLoggedin: persistedLoginReducer,
        dashboard: persistedDashboardReducer,
        stateChange: persistedStateReducer,
    },
});

// Create the persistor
export const persistor = persistStore(store);

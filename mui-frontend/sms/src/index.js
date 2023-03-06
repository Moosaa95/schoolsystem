import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App  from "./App";
import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "state";
import { Provider } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import {api } from "state/api"
import authReducer from 'state/authSlice'
import { BrowserRouter, Route, Routes } from "react-router-dom";

const store = configureStore({
  reducer: {
    global: globalReducer,
    [api.reducerPath] : api.reducer,
    auth: authReducer

  },
  middleware : (getDefault) => getDefault().concat(api.middleware),
  devTools:true //change later to false when in prod
});
setupListeners(store.dispatch)

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
      {/* <App /> */}
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

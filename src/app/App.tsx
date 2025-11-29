import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { AppRouter } from "../routes/AppRouter";
import "../assets/styles/index.css";

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};

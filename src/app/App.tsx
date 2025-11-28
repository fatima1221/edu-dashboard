import { Provider } from "react-redux";
import { store } from "./store";
import { AppRouter } from "../routes/AppRouter";

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};

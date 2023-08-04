import "./App.css";
import { RouterProvider } from "react-router-dom";
import IndexRouter from "./router/IndexRouter";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={IndexRouter()} future={{ v7_startTransition: true }} />
      </PersistGate>
    </Provider>
  );
}

export default App;

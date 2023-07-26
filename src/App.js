import { RouterProvider } from "react-router-dom";
import IndexRouter from "./router/IndexRouter";

function App() {
  return <RouterProvider router={IndexRouter} future={{ v7_startTransition: true }} />;
}

export default App;

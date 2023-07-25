import { RouterProvider } from "react-router-dom";
import IndexRouter from "./router/IndexRouter";

function App() {
  return <RouterProvider router={IndexRouter}></RouterProvider>;
}

export default App;

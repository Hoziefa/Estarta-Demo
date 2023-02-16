import {createBrowserRouter} from "react-router-dom";
import Logger from "../pages/Logger";

export const routes = createBrowserRouter([
  {path: "/", element: <Logger />},
]);

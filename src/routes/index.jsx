import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

const RouteProvider = () => {
  return <RouterProvider router={router} />;
};

export default RouteProvider;

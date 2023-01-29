import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import Home from "./sites/Home";
import Plan from "./sites/Plan";
import Practice from "./sites/Practice";

function AppRouter() {
  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="plans/:planId" element={<Plan />} />
            <Route path="plans/:planId/play" element={<Practice />} />
          </Route>
        )
      )}
    />
  );
}

export default AppRouter;

import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import HomePage from "./sites/HomePage";
import PlanPage from "./sites/PlanPage";
import PracticePage from "./sites/PracticePage";

function AppRouter() {
  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="plans/:planId" element={<PlanPage />} />
            <Route path="plans/:planId/play" element={<PracticePage />} />
          </Route>
        )
      )}
    />
  );
}

export default AppRouter;

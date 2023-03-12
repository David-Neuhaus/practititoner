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
import Error from "./components/Error";
import LibraryPage from "./sites/LibraryPage";
import StatisticsPage from "./sites/StatisticsPage";

function AppRouter() {
  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <Route path="/" element={<App />} errorElement={<Error />}>
            <Route index element={<HomePage />} />
            <Route path="plans/:planId" element={<PlanPage />} />
            <Route path="practice" element={<PracticePage />} />
            <Route path="library" element={<LibraryPage />} />
            <Route path="statistics" element={<StatisticsPage />} />
          </Route>
        )
      )}
    />
  );
}

export default AppRouter;

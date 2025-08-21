import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Layout from "../layout";
import { viewRoute } from "./viewRoute";
import { createRoute } from "./createRoutes";
import { ErrorPage } from "../../pages/ui/errorPage";
import { addRoute } from "./addRoute";
import { adminRoute } from "./adminRoute";
import { playRoute } from "./playRoutes";

export default createBrowserRouter ([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      viewRoute,
      createRoute,
      addRoute,
      adminRoute,
      playRoute
    ]
  },

])
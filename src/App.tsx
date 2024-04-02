import React from "react";
import { ConfigProvider, theme } from "antd";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import Loading from "./pages/Loading";

const Mainlayout = React.lazy(() => import("./layouts/MainLayout"));
const Home = React.lazy(() => import("./pages/Home"));
const Login = React.lazy(() => import("./pages/Login"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Mainlayout>
        <Suspense fallback={<Loading />}>
          <Home />
        </Suspense>
      </Mainlayout>
    ),
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<Loading />}>
        <Login />
      </Suspense>
    ),
  },
]);

function App() {
  return (
    <>
      <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
        <RouterProvider router={router} />
      </ConfigProvider>
    </>
  );
}

export default App;

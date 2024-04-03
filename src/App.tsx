import React from "react";
import { ConfigProvider, theme } from "antd";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import Loading from "./pages/Loading";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import createStore from "react-auth-kit/createStore";
import AuthProvider from "react-auth-kit";

const store = createStore({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === "https:",
});

const queryClient = new QueryClient();

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
      <AuthProvider store={store}>
        <QueryClientProvider client={queryClient}>
          <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
            <RouterProvider router={router} />
          </ConfigProvider>
        </QueryClientProvider>
      </AuthProvider>
    </>
  );
}

export default App;

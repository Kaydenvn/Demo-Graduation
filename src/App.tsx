import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider, theme } from "antd";
import React, { Suspense } from "react";
import AuthProvider from "react-auth-kit";
import createStore from "react-auth-kit/createStore";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Loading from "./pages/Loading";
import ScrollToTop from "./utils/ScrollToTop";

const store = createStore({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === "https:",
});

const queryClient = new QueryClient();

const Mainlayout = React.lazy(() => import("./layouts/MainLayout"));
const DashboardLayout = React.lazy(() => import("./layouts/DashboardLayout"));
const Home = React.lazy(() => import("./pages/Home"));
const Login = React.lazy(() => import("./pages/Login"));
const Products = React.lazy(() => import("./pages/Products"));
const Subject = React.lazy(() => import("./pages/Subject"));
const Introduction = React.lazy(() => import("./pages/Introduction"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));

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
  {
    path: "/products",
    element: (
      <Mainlayout>
        <Suspense fallback={<Loading />}>
          <ScrollToTop />
          <Products />
        </Suspense>
      </Mainlayout>
    ),
  },
  {
    path: "/subject",
    element: (
      <Mainlayout>
        <Suspense fallback={<Loading />}>
          <ScrollToTop />
          <Subject />
        </Suspense>
      </Mainlayout>
    ),
  },
  {
    path: "/introduction",
    element: (
      <Mainlayout>
        <Suspense fallback={<Loading />}>
          <ScrollToTop />
          <Introduction />
        </Suspense>
      </Mainlayout>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <DashboardLayout>
        <Suspense fallback={<Loading />}>
          <ScrollToTop />
          <Dashboard />
        </Suspense>
      </DashboardLayout>
    ),
  },
]);

function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <AuthProvider store={store}>
          <QueryClientProvider client={queryClient}>
            <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
              <RouterProvider router={router} />
            </ConfigProvider>
          </QueryClientProvider>
        </AuthProvider>
      </Suspense>
    </>
  );
}

export default App;

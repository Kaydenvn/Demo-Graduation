import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthProvider";
import Loading from "./pages/Loading";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider, theme } from "antd";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <Suspense fallback={<Loading />}>
        <QueryClientProvider client={queryClient}>
          <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
            <BrowserRouter>
              <Routes>
                <Route path="/*" element={<App />} />
              </Routes>
            </BrowserRouter>
          </ConfigProvider>
        </QueryClientProvider>
      </Suspense>
    </AuthProvider>
  </React.StrictMode>
);

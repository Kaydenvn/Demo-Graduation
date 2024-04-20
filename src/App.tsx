import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import RequireAuth from "./utils/RequireAuth";

const Mainlayout = React.lazy(() => import("./layouts/MainLayout"));
const DashboardLayout = React.lazy(() => import("./layouts/DashboardLayout"));
const Home = React.lazy(() => import("./pages/Home"));
const Login = React.lazy(() => import("./pages/Login"));
const Products = React.lazy(() => import("./pages/Products"));
const Subject = React.lazy(() => import("./pages/Subject"));
const Introduction = React.lazy(() => import("./pages/Introduction"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const PersistantLogin = React.lazy(() => import("./pages/PersistantLogin"));

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<PersistantLogin />}>
        <Route path="/" element={<Mainlayout />}>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/subject" element={<Subject />} />
            <Route path="/introduction" element={<Introduction />} />
          </Route>
        </Route>
        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

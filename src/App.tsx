import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import RequireAuth from "./utils/RequireAuth";

const Mainlayout = React.lazy(() => import("./layouts/MainLayout"));
const DashboardLayout = React.lazy(() => import("./layouts/DashboardLayout"));
const Home = React.lazy(() => import("./pages/Home"));
const Login = React.lazy(() => import("./pages/Login"));
const Model = React.lazy(() => import("./pages/Model"));
const Subject = React.lazy(() => import("./pages/Subject"));
const Introduction = React.lazy(() => import("./pages/Introduction"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const PersistantLogin = React.lazy(() => import("./pages/PersistantLogin"));
const UserDashboard = React.lazy(() => import("./pages/UserDashboard"));
const ModelDashboard = React.lazy(() => import("./pages/ModelDashboard"));
const SubjectDashboard = React.lazy(() => import("./pages/SubjectDashboard"));
const AllModel = React.lazy(() => import("./pages/AllModel"));
const AllSubject = React.lazy(() => import("./pages/AllSubject"));

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<PersistantLogin />}>
        <Route path="/" element={<Mainlayout />}>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />} />
            <Route path="/models" element={<AllModel />} />
            <Route path="/models/:id" element={<Model />} />
            <Route path="/subjects" element={<AllSubject />} />
            <Route path="/subjects/:id" element={<Subject />} />
            <Route path="/introduction" element={<Introduction />} />
          </Route>
        </Route>
        <Route element={<DashboardLayout />}>
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/users" element={<UserDashboard />} />
            <Route path="/dashboard/models" element={<ModelDashboard />} />
            <Route path="/dashboard/subjects" element={<SubjectDashboard />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

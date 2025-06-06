import LoginForm from "./components/loginForm";
import AssignMoreUnits from "./components/AssignMoreUnits";
import AssignUnitsForm from "./components/AssignUnitsForm";
import UploadDistributors from "./components/uploadDistributos";
import AdminLoginForm from "./components/AdminLoginForm";
import AmbassadorLoginForm from "./components/AmbassadorLoginForm";
import Dashboard from "./components/dashboard";
import CreateCustomer from "./components/createCustomers";
import PrivateRoute from "./components/PrivateRoute";
import userLogoutConfirmation from "./components/userLogoutConfirmation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Separate component to use hooks inside Router context
function AppRoutes() {
  userLogoutConfirmation(); // ✅ now inside Router context

  return (
    <Routes>
      {/* <Route path="/" element={<LoginForm />} /> */}
      {/*  */}
      <Route path="/" element={<AmbassadorLoginForm />} />
      {/*  */}
      <Route path="/admin" element={<AdminLoginForm />} />
      {/*  */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      {/*  */}
      <Route
        path="/upload-distributors"
        element={
          <PrivateRoute>
            <UploadDistributors />
          </PrivateRoute>
        }
      />
      {/*  */}
      {/* <Route path="/assign-more-to-an-ambassador" element={<AssignMoreUnits />} /> */}
      <Route
        path="/assign-more-to-an-ambassador"
        element={
          <PrivateRoute>
            <AssignMoreUnits />
          </PrivateRoute>
        }
      />
      {/*  */}
      {/* <Route path="/assign-units/:id" element={<AssignUnitsForm />} /> */}
      <Route
        path="/assign-units/:id"
        element={
          <PrivateRoute>
            <AssignUnitsForm />
          </PrivateRoute>
        }
      />
      {/*  */}
      <Route
        path="/create-customer"
        element={
          <PrivateRoute>
            <CreateCustomer />
          </PrivateRoute>
        }
      />
      {/*  */}
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;

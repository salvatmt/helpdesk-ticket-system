import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import LoginPage from "../pages/auth/LoginPage";

import DashboardPage from "../pages/dashboard/DashboardPage";

import ProtectedRoute from "./ProtectedRoute";

import DashboardLayout from "../layouts/DashboardLayout";

import TicketsPage from "../pages/tickets/TicketsPage";


function AppRouter() {

  return (

    <BrowserRouter>

      <Routes>

        {/* LOGIN */}

        <Route
          path="/login"
          element={<LoginPage />}
        />


        {/* DASHBOARD */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>

              <DashboardLayout>

                <DashboardPage />

              </DashboardLayout>

            </ProtectedRoute>
          }
        />

        <Route
  path="/tickets"
  element={
    <ProtectedRoute>

      <DashboardLayout>

        <TicketsPage />

      </DashboardLayout>

    </ProtectedRoute>
  }
/>


        {/* REDIRECT */}

        <Route
          path="*"
          element={<Navigate to="/login" />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default AppRouter;
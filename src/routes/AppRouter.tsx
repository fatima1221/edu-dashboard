import * as React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import LoginForm from "../features/auth/components/LoginForm";
import MainLayout from "../components/layout/MainLayout";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);
  return isAuth ? <>{children}</> : <Navigate to="/login" replace />;
}

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />{" "}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          {/* <Route index element={<Navigate to="universities" replace />} /> */}
          <Route path="universities" element={<div>Universities Page</div>} />
          <Route path="high-schools" element={<div>High Schools Page</div>} />
          <Route path="schools" element={<div>Schools Page</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

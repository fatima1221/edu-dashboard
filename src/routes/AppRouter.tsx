import * as React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import LoginForm from "../features/auth/components/LoginForm";
import MainLayout from "../components/layout/MainLayout";
import UniversitiesPage from "../features/universities/pages/UniversitiesPage";
import HighSchoolsPage from "../features/highSchools/pages/HighSchoolsPage";
import SchoolsPage from "../features/schools/pages/SchoolsPage";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);
  return isAuth ? <>{children}</> : <Navigate to="/login" replace />;
}

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<></>} />
          <Route path="universities" element={<UniversitiesPage />} />
          <Route path="high-schools" element={<HighSchoolsPage />} />
          <Route path="schools" element={<SchoolsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

import * as React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";

export const AppRouter: React.FC = () => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <BrowserRouter>
      <Routes>
        {isAuth ? (
          <>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            {/* Add more routes here */}
            <Route path="/dashboard" element={<div>Dashboard Page</div>} />
          </>
        ) : (
          <>
            <Route path="/login" element={<div>Login Page</div>} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

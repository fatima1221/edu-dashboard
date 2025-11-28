import * as React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

import Sidebar from "./Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

export default function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const { pathname } = useLocation();

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <Box component="main" sx={{ flexGrow: 1, p: 4, position: "relative" }}>
        {!isSidebarOpen && (
          <IconButton
            onClick={toggleSidebar}
            sx={{
              position: "fixed",
              top: 16,
              left: 16,
              zIndex: 10,
              backgroundColor: "white",
              border: "1px solid #ddd",
              "&:hover": { backgroundColor: "#f0f0f0" },
            }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {pathname === "/" && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" fontWeight={600} gutterBottom>
              Welcome to Edu Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Select an institution type from the left menu to manage
              Universities, Schools, or High Schools. Use filters on each page
              to search, sort, and narrow down results.
            </Typography>
          </Box>
        )}

        <Outlet />
      </Box>
    </Box>
  );
}

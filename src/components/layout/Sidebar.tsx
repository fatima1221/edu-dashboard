import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../../features/auth/authSlice";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import BusinessIcon from "@mui/icons-material/Business";
import SchoolIcon from "@mui/icons-material/School";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { NavLink } from "react-router";

const menuItems = [
  { label: "Universities", icon: <BusinessIcon />, to: "/universities" },
  { label: "High Schools", icon: <ApartmentIcon />, to: "/high-schools" },
  { label: "Schools", icon: <SchoolIcon />, to: "/schools" },
];
type SidebarProps = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const dispatch = useDispatch();
  const email = useSelector((state: RootState) => state.auth.email);

  return (
    <Drawer
      variant="persistent"
      open={isOpen}
      sx={{
        width: isOpen ? 240 : 70,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: isOpen ? 240 : 70,
          transition: "width 0.3s",
          overflowX: "hidden",
          boxSizing: "border-box",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 2,
          justifyContent: isOpen ? "space-between" : "center",
        }}
      >
        {isOpen && (
          <Box>
            <Typography variant="subtitle2">Logged in as:</Typography>
            <Typography variant="body1" fontWeight={600}>
              {email || "User"}
            </Typography>
          </Box>
        )}

        {isOpen && (
          <IconButton onClick={toggleSidebar}>
            <MenuIcon />
          </IconButton>
        )}
      </Box>

      <List>
        {menuItems.map(({ label, icon, to }) => (
          <ListItem disablePadding key={label}>
            <ListItemButton component={NavLink} to={to}>
              <ListItemIcon>{icon}</ListItemIcon>
              {isOpen && <ListItemText primary={label} />}
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ mt: "auto", p: 2 }}>
        <ListItemButton onClick={() => dispatch(logout())}>
          <ListItemIcon>
            <LogoutIcon color="error" />
          </ListItemIcon>
          {isOpen && <ListItemText primary="Logout" sx={{ color: "red" }} />}
        </ListItemButton>
      </Box>
    </Drawer>
  );
}

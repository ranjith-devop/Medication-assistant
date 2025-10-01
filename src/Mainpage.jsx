// src/MainPage.jsx
import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Grid,
  Card,
  CardContent,
  Fab,
} from "@mui/material";
import {
  Home as HomeIcon,
  People as PeopleIcon,
  Medication as MedicationIcon,
  Warning as WarningIcon,
  SmartToy as SmartToyIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  AddCircle as AddCircleIcon,
} from "@mui/icons-material";

const drawerWidth = 220;

export default function MainPage() {
  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "#E8F8F5",
          },
        }}
      >
        <Toolbar />
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon><HomeIcon color="primary" /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button>
            <ListItemIcon><PeopleIcon color="info" /></ListItemIcon>
            <ListItemText primary="Residents" />
          </ListItem>
          <ListItem button>
            <ListItemIcon><MedicationIcon color="primary" /></ListItemIcon>
            <ListItemText primary="Medicines" />
          </ListItem>
          <ListItem button>
            <ListItemIcon><WarningIcon color="warning" /></ListItemIcon>
            <ListItemText primary="Expiry Alerts" />
          </ListItem>
          <ListItem button>
            <ListItemIcon><SmartToyIcon color="error" /></ListItemIcon>
            <ListItemText primary="AI Assistant" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Header */}
        <AppBar
          position="static"
          elevation={0}
          sx={{ bgcolor: "white", color: "text.primary" }}
        >
          <Toolbar>
            <Typography variant="h5" sx={{ flexGrow: 1 }}>
              🏥 Medical Assistant
            </Typography>
            <IconButton>
              <NotificationsIcon />
            </IconButton>
            <IconButton>
              <SettingsIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Dashboard Section */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Quick Actions
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <Card sx={{ textAlign: "center", p: 2, bgcolor: "#E8F8F5" }}>
                <CardContent>
                  <AddCircleIcon color="primary" fontSize="large" />
                  <Typography variant="h6" sx={{ mt: 1 }}>Add Medicine</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card sx={{ textAlign: "center", p: 2, bgcolor: "#E8F8F5" }}>
                <CardContent>
                  <WarningIcon color="warning" fontSize="large" />
                  <Typography variant="h6" sx={{ mt: 1 }}>Expiry Check</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card sx={{ textAlign: "center", p: 2, bgcolor: "#E8F8F5" }}>
                <CardContent>
                  <PeopleIcon color="info" fontSize="large" />
                  <Typography variant="h6" sx={{ mt: 1 }}>Manage Residents</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card sx={{ textAlign: "center", p: 2, bgcolor: "#E8F8F5" }}>
                <CardContent>
                  <SmartToyIcon color="error" fontSize="large" />
                  <Typography variant="h6" sx={{ mt: 1 }}>AI Assistant</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Floating AI Assistant Button */}
        <Fab
          color="error"
          aria-label="ai"
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
          }}
        >
          <SmartToyIcon />
        </Fab>
      </Box>
    </Box>
  );
}

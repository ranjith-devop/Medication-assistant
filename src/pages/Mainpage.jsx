import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import ChatAssistant from "../components/Chatassistant/ChatAssistant";
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  AlertTriangle,
  Cpu,
  PlusCircle,
  Search,
  Pocket,
  
} from "lucide-react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  IconButton,
  Paper,
  InputBase,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Drawer,
  CssBaseline,
  Menu,
  MenuItem,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Grid,
  Card,
  Fab,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/system";

const drawerWidth = 260;

// Animated gradient container
const GradientBox = styled(Box, { shouldForwardProp: (p) => p !== "angle" })(({ angle }) => ({
  minHeight: "100vh",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
  // subtle rotating gradient
  backgroundImage: `linear-gradient(${angle}deg, rgba(99,102,241,0.06), rgba(34,197,94,0.03))`,
}));

// Card button with gradient (pass gradient like "#10B981,#14B8A6")
const CardButton = styled(Button, { shouldForwardProp: (p) => p !== "gradient" })(({ gradient }) => ({
  display: "flex",
  alignItems: "center",
  gap: 16,
  borderRadius: 12,
  padding: 14,
  flexDirection: "row",
  background: `linear-gradient(135deg, ${gradient})`,
  color: "#fff",
  justifyContent: "flex-start",
  textTransform: "none",
  width: "100%",
  boxShadow: "none",
  transition: "transform 0.15s ease, box-shadow 0.15s ease",
  '&:hover': {
    transform: "translateY(-4px)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  },
}));

export default function MedicalAssistantMainPage({ themeMode, setThemeMode }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [gradientAngle, setGradientAngle] = useState(0);
  const [query, setQuery] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [notifications] = useState([
    { id: 1, text: "Paracetamol expiring in 3 days (Room A)", type: "warn", time: new Date() },
    { id: 2, text: "New resident added: Mrs. Shanthi", type: "info", time: new Date(Date.now() - 1000 * 60 * 60) },
  ]);

  const stats = [
  { id: 1, title: "Residents", value: 24, icon: PersonIcon },
    { id: 2, title: "Medicines", value: 86, icon: Pocket },
    { id: 3, title: "Expiring Soon", value: 6, icon: AlertTriangle },
    { id: 4, title: "AI Actions", value: 12, icon: Cpu },
  ];

  const cards = [
    { id: "add", title: "Add Medicine", desc: "Quickly add medicine with expiry", icon: PlusCircle, color: "#10B981,#14B8A6" },
    { id: "check", title: "Expiry Check", desc: "Scan inventory and get alerts", icon: AlertTriangle, color: "#FBBF24,#F97316" },
  { id: "res", title: "Residents", desc: "View & manage residents' profiles", icon: PersonIcon, color: "#38BDF8,#6366F1" },
    { id: "ai", title: "AI Assistant", desc: "Ask the assistant to a or r meds", icon: Cpu, color: "#EC4899,#8B5CF6" },
  ];

  useEffect(() => {
    const t = setInterval(() => setGradientAngle((a) => (a + 2) % 360), 1800);
    return () => clearInterval(t);
  }, []);

  const filteredNotifications = notifications.filter((n) => n.text.toLowerCase().includes(query.toLowerCase()));

  const handleDrawerToggle = () => setMobileOpen((s) => !s);

  // Settings menu (theme switch)
  const [settingsAnchor, setSettingsAnchor] = useState(null);
  const openSettings = (e) => setSettingsAnchor(e.currentTarget);
  const closeSettings = () => setSettingsAnchor(null);
  const handleSetTheme = (mode) => {
    setThemeMode?.(mode);
    closeSettings();
  };

  // Sidebar contents extracted to reuse for drawer & persistent sidebar
  const SidebarContent = (
    <Box sx={{ width: { xs: 260 }, height: "100%", display: "flex", flexDirection: "column" }}>
      <Box p={2} borderBottom={`1px solid ${theme.palette.divider}`}>
        <Box display="flex" alignItems="center" gap={2}>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 2,
              backgroundImage: "linear-gradient(135deg,#10B981,#14B8A6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
            }}
          >
            <Home size={18} />
          </Box>
          <Box>
            <Typography variant="subtitle1" fontWeight={700}>
              MedAssist
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Elder care & medication
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box p={1} flex={1}>
        <List disablePadding>
          <ListItemButton
            onClick={() => {
              navigate('/profile');
              if (isMobile) setMobileOpen(false);
            }}
          >
            <ListItemIcon>
              <Home size={18} />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Residents" />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <Pocket size={18} />
            </ListItemIcon>
            <ListItemText primary="Medicines" />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <AlertTriangle size={18} />
            </ListItemIcon>
            <ListItemText primary="Expiry Alerts" />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <Cpu size={18} />
            </ListItemIcon>
            <ListItemText primary="AI Assistant" />
          </ListItemButton>
        </List>
      </Box>

      <Box p={2} borderTop={`1px solid ${theme.palette.divider}`}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="caption">Notifications</Typography>
          <Typography variant="caption">{notifications.length}</Typography>
        </Box>
      </Box>
    </Box>
  );

  return (
    <GradientBox angle={gradientAngle}>
      <CssBaseline />

      {/* Top AppBar */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: (theme) => `rgba(${theme.palette.mode === 'dark' ? '6,6,8' : '255,255,255'},${theme.palette.mode === 'dark' ? 0.16 : 0.85})`,
          backdropFilter: "blur(6px)",
          color: "text.primary",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box display="flex" alignItems="center" gap={1}>
            {isMobile && (
              <IconButton edge="start" onClick={handleDrawerToggle} aria-label="menu">
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6" fontWeight={800} sx={{ display: { xs: "none", sm: "block" } }}>
              Medical Assistant — Elder Care
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, width: { xs: "100%", sm: "auto" } }}>
            <Paper
              component="form"
              sx={{ p: "2px 6px", display: "flex", alignItems: "center", width: { xs: "100%", sm: 320 }, mr: 1 }}
            >
              <Search size={16} style={{ marginRight: 8 }} />
              <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search notifications or medicines..." value={query} onChange={(e) => setQuery(e.target.value)} />
            </Paper>

            <IconButton aria-label="notifications">
              <NotificationsIcon />
            </IconButton>
            <IconButton aria-label="settings" onClick={openSettings} aria-controls={settingsAnchor ? 'settings-menu' : undefined} aria-haspopup="true">
              <SettingsIcon />
            </IconButton>
            <Menu
              id="settings-menu"
              anchorEl={settingsAnchor}
              open={Boolean(settingsAnchor)}
              onClose={closeSettings}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem selected={themeMode === 'light'} onClick={() => handleSetTheme('light')}>Light Theme</MenuItem>
              <MenuItem selected={themeMode === 'dark'} onClick={() => handleSetTheme('dark')}>Dark Theme</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar: persistent on md+, drawer on mobile */}
      <Box component="nav" aria-label="main mailbox folders">
        {/* Temporary drawer for mobile */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{ display: { xs: "block", md: "none" }, '& .MuiDrawer-paper': { width: drawerWidth } }}
        >
          {SidebarContent}
        </Drawer>

        {/* Persistent drawer for md+ */}
        <Drawer
          variant="permanent"
          sx={{ display: { xs: "none", md: "block" }, '& .MuiDrawer-paper': { width: drawerWidth, top: 64, height: 'calc(100% - 64px)' } }}
          open
        >
          {SidebarContent}
        </Drawer>
      </Box>

      {/* Main content area */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 9, ml: { md: `${drawerWidth}px` } }}>
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
          <Typography variant="h4" fontWeight={800} gutterBottom>
            Medical Assistant — Elder Care
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Fast, friendly, and focused on safety.
          </Typography>
        </motion.div>

        {/* Cards */}
        <Grid container spacing={2} mb={3}>
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <Grid item xs={12} sm={6} md={6} lg={3} key={c.id}>
                <CardButton
                  gradient={c.color}
                  onClick={() => {
                    if (c.id === 'add') {
                      navigate('/add-medicine');
                    } else if (c.id === 'check') {
                      navigate('/expiry-check');
                    } else {
                      setSelectedCard(c.id);
                    }
                  }}
                >
                  <Box sx={{ width: 48, height: 48, borderRadius: 1, background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={22} />
                  </Box>
                  <Box textAlign="left">
                    <Typography fontWeight={700}>{c.title}</Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>{c.desc}</Typography>
                  </Box>
                </CardButton>
              </Grid>
            );
          })}
        </Grid>

        {/* Stats */}
        <Grid container spacing={2} mb={3}>
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <Grid item xs={12} sm={6} md={3} key={s.id}>
                <Card sx={{ p: 2 }}>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Box sx={{ bgcolor: '#f3f4f6', borderRadius: 1, p: 1 }}>
                      <Icon size={20} color="#6b7280" />
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        {s.title}
                      </Typography>
                      <Typography variant="h6" fontWeight={700}>
                        {s.value}
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        {/* Notifications */}
        <Card sx={{ p: 2, mb: 3 }}>
          <Box display="flex" justifyContent="space-between" mb={2} alignItems="center">
            <Typography fontWeight={600}>Notifications</Typography>
            <Typography variant="caption" color="text.secondary">
              {filteredNotifications.length} results
            </Typography>
          </Box>

          <AnimatePresence>
            {filteredNotifications.map((n) => (
              <motion.div key={n.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0 }}>
                <Box display="flex" alignItems="start" gap={2} p={1} mb={1} sx={{ borderRadius: 1, '&:hover': { bgcolor: '#f9fafb' } }}>
                  <Box sx={{ width: 40, height: 40, borderRadius: 1, bgcolor: n.type === 'warn' ? '#FEF3C7' : '#E0F2FE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <AlertTriangle size={16} color={n.type === 'warn' ? '#F59E0B' : '#0284C7'} />
                  </Box>
                  <Box flex={1}>
                    <Typography variant="body2" fontWeight={600}>{n.text}</Typography>
                    <Typography variant="caption" color="text.secondary">Action recommended</Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary">{new Date(n.time).toLocaleString()}</Typography>
                </Box>
              </motion.div>
            ))}
          </AnimatePresence>
        </Card>

        {/* Inventory */}
        <Card sx={{ p: 2, mb: 6 }}>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography fontWeight={600}>Inventory Snapshot</Typography>
            <Typography variant="caption" color="text.secondary">Updated 2 hours ago</Typography>
          </Box>

          <Box sx={{ width: '100%', overflowX: 'auto' }}>
            <Table size="small" sx={{ minWidth: 600 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Qty</TableCell>
                  <TableCell>Expiry</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  { name: 'Paracetamol', qty: 20, expiry: '2025-10-04', stat: 'expiring' },
                  { name: 'Aspirin', qty: 60, expiry: '2026-01-12', stat: 'ok' },
                  { name: 'Insulin', qty: 8, expiry: '2025-10-20', stat: 'low' },
                ].map((r, i) => (
                  <TableRow key={i}>
                    <TableCell>{r.name}</TableCell>
                    <TableCell>{r.qty}</TableCell>
                    <TableCell>{r.expiry}</TableCell>
                    <TableCell>
                      <Box sx={{ px: 1, py: 0.5, borderRadius: 1, bgcolor: r.stat === 'expiring' ? '#FEF3C7' : r.stat === 'low' ? '#FEE2E2' : '#DCFCE7', color: r.stat === 'expiring' ? '#B45309' : r.stat === 'low' ? '#B91C1C' : '#15803D', display: 'inline-block', fontSize: '0.75rem' }}>
                        {r.stat}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Card>

        <ChatAssistant open={chatOpen} onClose={() => setChatOpen(false)} />
      </Box>
      
    </GradientBox>
    
  );
}   

import React from "react";
import { Box, Avatar, Typography, Button, Paper, IconButton, useTheme, useMediaQuery } from "@mui/material";
import { Edit, CameraAlt } from "@mui/icons-material";
import { motion } from "framer-motion";
import { styled, keyframes } from "@mui/system";

// Gradient background animation
const gradientAnim = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Floating particle animation
const floatAnim = keyframes`
  0%, 100% { transform: translateY(0px); opacity: 0.8; }
  50% { transform: translateY(-20px); opacity: 1; }
`;

const AnimatedBackground = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
  background: 'linear-gradient(135deg, #667eea, #764ba2, #ff7eb3, #ffb86b)',
  backgroundSize: '300% 300%',
  animation: `${gradientAnim} 15s ease infinite`,
  position: 'relative',
  overflow: 'hidden',
}));

const Particle = styled(motion.div)(({ size, x, y, delay }) => ({
  position: 'absolute',
  width: size,
  height: size,
  borderRadius: '50%',
  background: 'rgba(255,255,255,0.15)',
  top: y,
  left: x,
  animation: `${floatAnim} 6s ease-in-out infinite`,
  animationDelay: delay,
}));

export default function ProfilePage({ themeMode, setThemeMode }) {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AnimatedBackground>
      {/* Subtle floating particles */}
      {[...Array(10)].map((_, i) => (
        <Particle
          key={i}
          size={`${Math.random() * 20 + 10}px`}
          x={`${Math.random() * 100}%`}
          y={`${Math.random() * 100}%`}
          delay={`${Math.random() * 5}s`}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <motion.div
          whileHover={{ scale: 1.03, rotateX: 3, rotateY: 3 }}
          whileTap={{ scale: 0.97 }}
        >
          <Paper
            elevation={isSm ? 8 : 16}
            sx={{
              p: { xs: 3, sm: 6 },
              borderRadius: { xs: 3, sm: 5 },
              width: { xs: '92vw', sm: 480, md: 550 },
              maxWidth: '96vw',
              background: themeMode === 'light'
                ? 'rgba(255,255,255,0.85)'
                : 'rgba(20,20,30,0.85)',
              color: themeMode === 'light' ? '#0f172a' : '#e6eef8',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              backdropFilter: 'blur(10px)',
              boxShadow: themeMode === 'light'
                ? '0 8px 30px rgba(0,0,0,0.12)'
                : '0 8px 30px rgba(0,0,0,0.4)',
            }}
          >
            {/* Overlay highlight */}
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.05), transparent)',
              }}
            />

            {/* Avatar with gradient border */}
            <Box
              sx={{
                p: '3px',
                borderRadius: '50%',
                background: 'conic-gradient(#ff7eb3, #667eea, #764ba2, #ffb86b, #ff7eb3)',
                mb: 2,
              }}
            >
              <Avatar
                src="https://i.pravatar.cc/150?img=3"
                sx={{
                  width: { xs: 84, sm: 110 },
                  height: { xs: 84, sm: 110 },
                  border: `3px solid ${themeMode === 'light' ? '#fff' : '#111'}`,
                }}
              />
            </Box>

            <Typography variant={isSm ? 'h6' : 'h5'} sx={{ fontWeight: 900, mb: 0.5 }}>
              John Doe
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.85 }}>
              johndoe@example.com
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(102,126,234,0.6)' }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Edit />}
                  sx={{ borderRadius: 4, textTransform: 'none', px: 4 }}
                >
                  Edit Profile
                </Button>
              </motion.div>

              <motion.div whileHover={{ y: -4, scale: 1.1 }}>
                <IconButton
                  color="secondary"
                  sx={{
                    background: 'linear-gradient(45deg, #6a11cb, #2575fc)',
                    color: 'white',
                    p: 1.5,
                    '&:hover': { transform: 'scale(1.08)' },
                  }}
                  aria-label="upload-photo"
                >
                  <CameraAlt />
                </IconButton>
              </motion.div>
            </Box>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{ marginTop: '1rem', width: '100%' }}
            >
              <Typography variant="body1" sx={{ mb: 1 }}>
                📞 Phone: +91 9876543210
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                🏠 Address: 123 Medical St, Health City
              </Typography>
              <Typography variant="body1">📅 Member since: 2024</Typography>
            </motion.div>
          </Paper>
        </motion.div>
      </motion.div>
    </AnimatedBackground>
  );
}

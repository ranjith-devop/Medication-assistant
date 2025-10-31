import React, { useState } from "react";
import {
  Box,
  Paper,
  IconButton,
  TextField,
  Typography,
  Divider,
  Slide,
  Fab,
  useTheme,
  Button,
  Stack,
  Zoom,
} from "@mui/material";
import { Send, Chat as ChatIcon, Close } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";

// 🟣 Header
const ChatHeader = ({ onClose }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      p: 1.8,
      background: "linear-gradient(135deg, #6A0DAD 0%, #9A30D1 100%)",
      color: "#fff",
      backdropFilter: "blur(10px)",
      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
    }}
  >
    <Typography variant="subtitle1" fontWeight="bold">
      MedAssist
    </Typography>
    <IconButton size="small" onClick={onClose} color="inherit">
      <Close />
    </IconButton>
  </Box>
);

// 🟣 Action Bar (Add / Remove / Check)
const ChatActions = ({ onAction }) => (
  <Stack
    direction="row"
    justifyContent="space-around"
    sx={{
      p: 1,
      background: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(6px)",
    }}
  >
    {["Add", "Remove", "Check"].map((action) => (
      <Button
        key={action}
        onClick={() => onAction(action)}
        sx={{
          textTransform: "none",
          fontWeight: 600,
          color: "#fff",
          border: "1px solid rgba(155, 90, 255, 0.8)",
          borderRadius: 2,
          px: 2,
          transition: "all 0.3s ease",
          boxShadow: "0 0 10px rgba(155, 90, 255, 0.4)",
          "&:hover": {
            background: "rgba(155, 90, 255, 0.15)",
            boxShadow: "0 0 15px rgba(155, 90, 255, 0.7)",
          },
        }}
      >
        {action}
      </Button>
    ))}
  </Stack>
);

// 🟣 Messages
const ChatMessages = ({ messages }) => (
  <Box
    sx={{
      flex: 1,
      overflowY: "auto",
      p: 2,
      display: "flex",
      flexDirection: "column",
      gap: 1.5,
      background:
        "repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0, rgba(255,255,255,0.05) 2px, transparent 2px, transparent 10px), linear-gradient(135deg, #6A0DAD 0%, #9A30D1 100%)",
      backgroundSize: "cover",
    }}
  >
    <AnimatePresence initial={false}>
      {messages.map((msg, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
            <Box
            sx={{
              maxWidth: { xs: '86%', sm: '80%' },
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              p: 1.2,
              borderRadius: 2,
              bgcolor:
                msg.sender === "user"
                  ? "rgba(255, 255, 255, 0.2)"
                  : "rgba(255, 255, 255, 0.15)",
              color: "#fff",
              backdropFilter: "blur(6px)",
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            }}
          >
            <Typography variant="body2">{msg.text}</Typography>
          </Box>
        </motion.div>
      ))}
    </AnimatePresence>
  </Box>
);

// 🟣 Input Area
const ChatInputArea = ({ input, setInput, onSend }) => (
  <Box sx={{ display: "flex", alignItems: "center", p: 1.5, bgcolor: "rgba(255,255,255,0.08)", backdropFilter: "blur(6px)" }}>
    <TextField
      size="small"
      variant="outlined"
      placeholder="Type your message..."
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && onSend()}
      fullWidth
      sx={{
        input: { color: "#fff" },
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
          "&:hover fieldset": { borderColor: "#fff" },
          "&.Mui-focused fieldset": { borderColor: "#fff" },
        },
      }}
    />
    <IconButton onClick={onSend} sx={{ color: "#fff", ml: 1 }}>
      <Send />
    </IconButton>
  </Box>
);

const ChatAssistant = () => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hi, I'm MedAssist. How can I help you?" },
  ]);
  const [input, setInput] = useState("");

  const toggleChat = () => setIsOpen((prev) => !prev);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "✨ Got it! I'm here to help further." },
      ]);
    }, 600);
  };

  const handleAction = (type) => {
    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: `🔸 You clicked: ${type}` },
    ]);
  };

  return (
    <>
      {/* Neon Violet FAB */}
      {!isOpen && (
        <Zoom in={!isOpen}>
          <Fab
            sx={{
              position: "fixed",
              bottom: theme.spacing(5),
              right: theme.spacing(5),
              zIndex: 2000,
              background: "linear-gradient(135deg, #A020F0, #C040FF)",
              color: "#fff",
              boxShadow: "0 0 20px rgba(160, 32, 240, 0.8)",
              border: "1px solid rgba(255,255,255,0.2)",
              "& svg": {
                filter: "drop-shadow(0 0 6px #D580FF)",
              },
              "&:hover": {
                background: "linear-gradient(135deg, #B23FFF, #E080FF)",
                boxShadow: "0 0 25px rgba(200, 80, 255, 0.9)",
              },
            }}
            onClick={toggleChat}
          >
            <ChatIcon fontSize="medium" />
          </Fab>
        </Zoom>
      )}

      {/* Chat Panel */}
      <Slide direction="up" in={isOpen} mountOnEnter unmountOnExit>
        <Paper
          elevation={15}
          sx={(theme) => ({
            position: "fixed",
            bottom: theme.spacing(5),
            right: theme.spacing(5),
            width: { xs: '92vw', sm: 450 },
            height: { xs: '60vh', sm: 620 },
            display: "flex",
            flexDirection: "column",
            borderRadius: 4,
            overflow: "hidden",
            background: "rgba(20, 0, 30, 0.6)",
            backdropFilter: "blur(12px)",
            color: "#fff",
            zIndex: 2100,
          })}
        >
          <ChatHeader onClose={toggleChat} />
          <ChatActions onAction={handleAction} />
          <Divider sx={{ opacity: 0.15 }} />
          <ChatMessages messages={messages} />
          <Divider sx={{ opacity: 0.15 }} />
          <ChatInputArea input={input} setInput={setInput} onSend={handleSend} />
        </Paper>
      </Slide>
    </>
  );
};

export default ChatAssistant;

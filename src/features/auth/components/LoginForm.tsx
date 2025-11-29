import { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../authSlice";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isEmailValid = useMemo(() => EMAIL_REGEX.test(email), [email]);
  const isPasswordValid = useMemo(() => password.length >= 6, [password]);

  const isValid = isEmailValid && isPasswordValid;
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    if (isValid) {
      dispatch(loginSuccess({ token: "dummy-token", email }));
      navigate("/");
    }
  }
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: (theme) => theme.palette.background.default,
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        component="form"
        onSubmit={handleSubmit}
        sx={{ p: 4, width: 300 }}
      >
        <Typography variant="h5" component="h1" align="center" gutterBottom>
          Sign in to Edu Dashboard
        </Typography>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          required
          error={Boolean(!isEmailValid && submitted)}
          helperText={isEmailValid ? "" : "Invalid email address"}
          autoComplete="email"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          required
          error={Boolean(!isPasswordValid && submitted)}
          helperText={
            isPasswordValid ? "" : "Password must be at least 6 characters"
          }
          autoComplete="current-password"
        />
        <Button type="submit" disabled={!isValid} variant="contained" fullWidth>
          Sign In
        </Button>
      </Paper>
    </Box>
  );
};

export default LoginForm;

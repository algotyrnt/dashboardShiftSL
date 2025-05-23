import type React from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { TextField, Button, Box, Typography, Container } from "@mui/material"
import Logo from "../Components/logo"
import TeamIllustration from "../Components/Group"

import { useAuth } from '../context/AuthContext';

// Defining the Login Page with onLogin
const Login: React.FC = () => {
  // Variables for email, password and their error messages
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const navigate = useNavigate()
  const { login } = useAuth();

  // Validating the email format
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  // Validating the password length
  const validatePassword = (password: string) => {
    return password.length >= 6
  }

  // Handling the form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    let valid = true

    // Validating the email
    if (!validateEmail(email)) {
      setEmailError("Invalid email address")
      valid = false
    } else {
      setEmailError("")
    }

    // Validating the password
    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 6 characters")
      valid = false
    } else {
      setPasswordError("")
    }

    // If email and password valid handling the login logic
    if (valid) {
      await login(email, password);
      navigate("/dashboard")
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#ededed",
      }}
    >
      {/* Left Panel */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          width: "50%",
          backgroundColor: "#2b3c56",
          borderRadius: "16px",
          margin: "16px",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            maxWidth: "480px",
            textAlign: "center",
            marginBottom: "40px",
            zIndex: 1,
          }}
        >
          <Typography
            sx={{
              color: "#ffffff",
              fontWeight: 700,
              fontSize: "40px",
              lineHeight: 1.2,
              marginBottom: "16px",
            }}
          >
            Welcome !
          </Typography>
          <Typography
            sx={{
              color: "#ffffff",
              fontWeight: 400,
              fontSize: "32px",
              lineHeight: 1.2,
              marginBottom: "8px",
            }}
          >
            Please Sign in to your
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Typography
              sx={{
                color: "#459257",
                fontWeight: 600,
                fontSize: "32px",
                lineHeight: 1.2,
              }}
            >
              shiftSL
            </Typography>
            <Typography
              sx={{
                color: "#ffffff",
                fontWeight: 400,
                fontSize: "32px",
                lineHeight: 1.2,
                marginLeft: "8px",
              }}
            >
              Account
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            width: "100%",
            maxWidth: "400px",
            display: "flex",
            justifyContent: "center",
            zIndex: 1,
          }}
        >
          <TeamIllustration />
        </Box>
      </Box>

      {/* Right Panel */}
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#ffffff",
          borderRadius: { xs: "16px", md: "0 16px 16px 0" },
          margin: { xs: "16px", md: "16px 16px 16px 0" },
          padding: { xs: "24px", sm: "40px" },
        }}
      >
        <Container
          sx={{
            width: "100%",
            maxWidth: "400px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              marginBottom: "40px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Logo />
          </Box>

          <Typography
            sx={{
              textAlign: "center",
              fontWeight: 700,
              fontSize: "24px",
              marginBottom: "4px",
            }}
          >
            Sign In
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              marginBottom: "32px",
              color: "#666666",
              fontSize: "14px",
            }}
          >
            Hi ! Welcome back
          </Typography>

          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <Box sx={{ marginBottom: "16px", width: "100%" }}>
              <Typography
                sx={{
                  marginBottom: "8px",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                Email
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                error={!!emailError}
                helperText={emailError}
                InputProps={{
                  sx: {
                    backgroundColor: "#f9f9f9",
                    borderRadius: "8px",
                    height: "48px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "1px solid #ccc",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      border: "1px solid #bbb",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      border: "1px solid #2b3c56",
                    },
                  },
                }}
              />
            </Box>

            <Box sx={{ marginBottom: "8px", width: "100%" }}>
              <Typography
                sx={{
                  marginBottom: "8px",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                Password
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                error={!!passwordError}
                helperText={passwordError}
                InputProps={{
                  sx: {
                    backgroundColor: "#f9f9f9",
                    borderRadius: "8px",
                    height: "48px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "1px solid #ccc",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      border: "1px solid #bbb",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      border: "1px solid #2b3c56",
                    },
                  },
                }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: "24px",
                width: "100%",
              }}
            >
              <Link
                to="/forgot-password"
                style={{
                  fontSize: "14px",
                  color: "blue",
                  textDecoration: "underline",
                }}
              >
                Forgot Password?
              </Link>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "#2b3c56",
                color: "white",
                height: "48px",
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: 500,
                fontSize: "16px",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#1e2a3e",
                  boxShadow: "none",
                },
                marginBottom: "24px",
              }}
            >
              Sign In
            </Button>
          </form>
        </Container>
      </Box>
    </Box>
  )
}

export default Login;
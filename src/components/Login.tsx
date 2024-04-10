import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import {
  TextField,
  Button,
  CircularProgress,
  Card,
  CardContent,
  Grid,
  Box,
} from "@mui/material";
import AuthService from "../services/auth.service";
import * as Yup from "yup";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleLogin = async (values: { username: any; password: any }) => {
    setMessage("");
    setLoading(true);

    try {
      const loginData = await AuthService.login(
        values.username,
        values.password
      );
      console.log("Logged in user info:", loginData);
      navigate("/home");
      window.location.reload();
    } catch (error: any) {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      setMessage(resMessage);
    }

    setLoading(false);
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{
        height: "100vh",
        marginTop: "-15vh",
        backgroundColor: "#fffcfc",
      }}
    >
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Card variant="outlined">
          <CardContent>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              mb={2}
            >
              <img
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                alt="profile-img"
                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
              />
            </Box>
            <Formik
              initialValues={{ username: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleLogin}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Box mb={2}>
                    <Field
                      as={TextField}
                      type="text"
                      label="Username"
                      name="username"
                      autoComplete={"off"}
                      fullWidth
                      variant="outlined"
                    />
                  </Box>
                  <Box mb={2}>
                    <Field
                      as={TextField}
                      type="password"
                      label="Password"
                      name="password"
                      fullWidth
                      variant="outlined"
                    />
                  </Box>
                  <Box mb={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      type="submit"
                      disabled={isSubmitting || loading}
                      startIcon={
                        isSubmitting || loading ? (
                          <CircularProgress size={20} />
                        ) : null
                      }
                    >
                      Login
                    </Button>
                  </Box>
                  {message && (
                    <Box mb={2}>
                      <div className="alert alert-danger" role="alert">
                        {message}
                      </div>
                    </Box>
                  )}
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Login;

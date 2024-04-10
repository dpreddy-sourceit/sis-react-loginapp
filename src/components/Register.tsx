import React, { useState } from "react";
import {
  TextField,
  Button,
  CircularProgress,
  Card,
  CardContent,
  Grid,
  Box,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthService from "../services/auth.service";

const Register = () => {
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must be at most 20 characters"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must be at most 40 characters"),
  });

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const handleRegister = async (
    values: { username: any; email: any; password: any },
    { setSubmitting }: any
  ) => {
    setMessage("");
    setSuccessful(false);

    try {
      await AuthService.register(
        values.username,
        values.email,
        values.password
      );
      setMessage("Registration successful!");
      setSuccessful(true);
    } catch (error: any) {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      setMessage(resMessage);
      setSuccessful(false);
    }

    setSubmitting(false);
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh", backgroundColor: "#fffcfc" }}
    >
      <Grid item xs={12} sm={8} md={6} lg={4} style={{ marginTop: "-15vh" }}>
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
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleRegister}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Box mb={2}>
                    <Field
                      as={TextField}
                      type="text"
                      label="Username"
                      name="username"
                      fullWidth
                      variant="outlined"
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="invalid-feedback d-block"
                    />
                  </Box>
                  <Box mb={2}>
                    <Field
                      as={TextField}
                      type="text"
                      label="Email"
                      name="email"
                      fullWidth
                      variant="outlined"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="invalid-feedback d-block"
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
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="invalid-feedback d-block"
                    />
                  </Box>
                  <Box mb={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      type="submit"
                      disabled={isSubmitting}
                      startIcon={
                        isSubmitting ? <CircularProgress size={20} /> : null
                      }
                    >
                      Sign Up
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
            {message && (
              <div
                className={`alert ${
                  successful ? "alert-success" : "alert-danger"
                }`}
                role="alert"
              >
                {message}
              </div>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Register;

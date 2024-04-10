import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  IconButtonProps,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Field, Form, Formik } from "formik";
import DisplayData from "./DisplayData";
import * as Yup from "yup";
import { MouseEvent } from "react";
const handleSubmit = async (values: any) => {
  console.log("form submitted");
};

const handleChangePassword = async (values: {
  currentPassword: any;
  newPassword: any;
  confirmPassword: any;
}) => {
  console.log(values.currentPassword);
};

const ChangePasswordButton: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showcomponent, setshowcomponent] = useState(false);

  const handlecancelclick = () => {
    setshowcomponent(true);
  };

  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required("Current Password is required"),
    newPassword: Yup.string().required("New Password is required"),
    confirmPassword: Yup.string().required("Confirm Password is required"),
  });

  function handleclick(event: MouseEvent<HTMLButtonElement, MouseEvent>): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div>
      <Formik
        initialValues={{
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleChangePassword}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box mb={2}>
              <Field
                as={TextField}
                type="password"
                label="Current Password"
                name="currentPassword"
                fullWidth
                variant="outlined"
              />
            </Box>
            <Box mb={2}>
              <Field
                as={TextField}
                type="password"
                label="New Password"
                name="newPassword"
                fullWidth
                variant="outlined"
              />
            </Box>
            <Box mb={2}>
              <Field
                as={TextField}
                type="password"
                label="Confirm Password"
                name="confirmPassword"
                fullWidth
                variant="outlined"
              />
            </Box>
            <Box mb={2}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={handlecancelclick}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={isSubmitting || loading}
                startIcon={
                  isSubmitting || loading ? (
                    <CircularProgress size={20} />
                  ) : null
                }
              >
                Reset
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
    </div>
  );
};

export default ChangePasswordButton;

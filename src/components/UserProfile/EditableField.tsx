import React from "react";
import { TextField, Grid, Box } from "@mui/material";
import { ErrorMessage } from "formik";

interface EditableFieldProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string; // Make error prop optional
}

const EditableField: React.FC<EditableFieldProps> = ({
  label,
  value,
  onChange,
  error,
}) => {
  return (
    <Grid item xs={12}>
      <TextField
        name={label}
        value={value}
        onChange={onChange}
        fullWidth
        variant="outlined"
      />
      <ErrorMessage name={label} component="div" />
    </Grid>
  );
};

export default EditableField;

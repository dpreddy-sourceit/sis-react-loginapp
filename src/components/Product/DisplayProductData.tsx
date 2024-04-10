import { Formik, Form, ErrorMessage, Field } from "formik";
import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  Divider,
  Grid,
  MenuItem,
  TextField,
  Box,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import FormatMetadata from "../../util/FormatMetadata";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import axios from "axios";
import AuthService from "../../services/auth.service";
import ProductService from "../../services/product.service";
import TabBar from "./TabBar";

const useStyles = makeStyles((theme) => ({
  editButton: {
    position: "absolute",
    right: 0,
  },
}));

interface MappedProductData {
  [key: string]: string | null;
}

interface Field {
  fieldName: string;
  fieldLabel: string;
  ComponentTypeDescription: string;
  // Add other properties as needed
}

const DisplayProductData: React.FC<{ data: MappedProductData }> = ({
  data,
}) => {
  const productMetadata: any = useSelector(
    (state: RootState) => state.app.metaData
  );
  const classes = useStyles();
  console.log("product MetaData in display", productMetadata);
  console.log("data in displayProductData", data);
  const formFields: Field[] = FormatMetadata(productMetadata, "MD_PRODUCT");
  const [updateMessage, setUpdateMessage] = useState<string | null>(null);
  const handleSubmit = async (values: any) => {
    try {
      // Make POST request to saveProduct endpoint

      const postProductDetails: MappedProductData = { ...data };
      for (const [key, value] of Object.entries(values)) {
        postProductDetails[key] = value as string; // Explicitly cast value to string
      }
      ProductService.postProductDetails(postProductDetails);
      setUpdateMessage("Update successful");
      setTimeout(() => {
        setUpdateMessage(null);
        setIsEditing(false);
      }, 3000);
    } catch (error) {
      console.error("Error:", error);
      setUpdateMessage("Update failed");
    }
  };
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <div>
      {updateMessage && (
        <div
          style={{ color: updateMessage.includes("failed") ? "red" : "green" }}
        >
          {updateMessage}
        </div>
      )}
      <div
        style={{
          backgroundColor: "#f0f8ff",
          padding: "5px",
          marginBottom: "5px",
        }}
      >
        <Typography variant="subtitle1" style={{ marginBottom: "5px" }}>
          Product: {data["fprodId"]}, {data["fprodTxt"]}
        </Typography>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h6" style={{ marginRight: "10px" }}>
          Product Details
        </Typography>
        <div style={{ flexGrow: 1 }}></div>
        <Divider style={{ marginBottom: "20px" }} />
        <IconButton
          style={{ marginRight: "100px" }}
          className={classes.editButton}
          onClick={() => setIsEditing((prev) => !prev)}
        >
          <EditIcon fontSize="small" />
        </IconButton>
      </div>
      <Divider style={{ marginBottom: "20px", marginTop: "10px" }} />
      <Formik
        initialValues={Object.fromEntries(
          formFields.map((field) => [
            field.fieldName,
            data[field.fieldName] || "",
          ])
        )}
        onSubmit={(values, actions) => {
          console.log("Form submitted with values:", values);
          actions.setSubmitting(false);
          handleSubmit(values);
        }}
      >
        {(formikProps) => (
          <Form>
            <Grid container spacing={2}>
              {formFields.map((field) => (
                <Grid item xs={6} key={field.fieldName}>
                  {isEditing ? (
                    <>
                      {(field.ComponentTypeDescription === "Text Element" ||
                        field.ComponentTypeDescription ===
                          "Text Element with Popup") && (
                        <TextField
                          name={field.fieldName}
                          label={field.fieldLabel}
                          fullWidth
                          variant="outlined"
                          value={formikProps.values[field.fieldName]}
                          onChange={formikProps.handleChange}
                          error={
                            formikProps.touched[field.fieldName] &&
                            Boolean(formikProps.errors[field.fieldName])
                          }
                          helperText={<ErrorMessage name={field.fieldName} />}
                        />
                      )}
                      {field.ComponentTypeDescription === "Drop Down" && (
                        <TextField
                          select
                          name={field.fieldName}
                          label={field.fieldLabel}
                          fullWidth
                          variant="outlined"
                          value={formikProps.values[field.fieldName]}
                          onChange={formikProps.handleChange}
                          error={
                            formikProps.touched[field.fieldName] &&
                            Boolean(formikProps.errors[field.fieldName])
                          }
                          helperText={<ErrorMessage name={field.fieldName} />}
                        >
                          <MenuItem value={formikProps.values[field.fieldName]}>
                            {formikProps.values[field.fieldName]}
                          </MenuItem>
                        </TextField>
                      )}
                      {field.ComponentTypeDescription === "Check Box" && (
                        <label>
                          <Field
                            type="checkbox"
                            name={field.fieldName}
                            checked={formikProps.values[field.fieldName]}
                            onChange={formikProps.handleChange}
                          />
                          {field.fieldLabel}
                        </label>
                      )}
                    </>
                  ) : (
                    <Box
                      key={field.fieldName}
                      display="flex"
                      alignItems="center"
                      marginBottom="8px"
                    >
                      <Typography
                        variant="subtitle1"
                        gutterBottom
                        style={{
                          fontWeight: "bold",
                          marginRight: "10px",
                          minWidth: "150px",
                          display: "inline-block",
                        }}
                      >
                        {field.fieldLabel}:
                      </Typography>
                      {field.ComponentTypeDescription === "Check Box" ? (
                        <Field
                          type="checkbox"
                          name={field.fieldName}
                          checked={formikProps.values[field.fieldName]}
                          disabled
                        />
                      ) : (
                        <Typography
                          variant="body1"
                          style={{ marginLeft: "5px" }}
                        >
                          {formikProps.values[field.fieldName]}
                        </Typography>
                      )}
                    </Box>
                  )}
                </Grid>
              ))}
            </Grid>
            {isEditing ? (
              <div style={{ marginTop: "40px" }}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  style={{ marginRight: "10px" }}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setIsEditing(false)}
                  style={{ marginRight: "10px" }}
                >
                  Cancel
                </Button>
              </div>
            ) : null}
          </Form>
        )}
      </Formik>

      <div style={{ paddingTop: "100px", paddingBottom: "1000px" }}>
        <TabBar />
      </div>
    </div>
  );
};

export default DisplayProductData;

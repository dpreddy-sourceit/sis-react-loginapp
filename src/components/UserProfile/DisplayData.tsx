import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  IconButton,
  TextField,
  Grid,
  Box,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Formik, Form, ErrorMessage } from "formik";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import UserService from "../../services/user.service";
import { remapUserData } from "../../util/UserProfileDataMapper";
import * as Yup from "yup";
import AuthService from "../../services/auth.service";
import { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { setUserProfile } from "../../store/app/appSlice";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "relative",
  },
  editButton: {
    position: "absolute",
    right: 0,
  },
  changePasswordButton: {
    position: "absolute",
    right: "-160px",
  },
}));

interface MappedUserData {
  [key: string]: { key: string; value: string };
}
interface DisplayDataProps {
  data: MappedUserData;
  onSubmit: (updatedUserData: any) => Promise<void>;
}
const DisplayData: React.FC<DisplayDataProps> = ({ data, onSubmit }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [isEditing, setIsEditing] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [dateFormat, setDateFormat] = useState([""]);
  const [currentDateFormat, setCurrentDateFormat] = useState("");
  const newUserProfile: any = useSelector(
    (state: RootState) => state.app.userProfile
  );
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape(
    Object.keys(data).reduce((schema: any, key) => {
      schema[key] = Yup.string();
      return schema;
    }, {})
  );
  const handleDateFormat = async () => {
    try {
      const res = await UserService.getDataFormatMetadata();
      console.log("dateFormat --", res);
      setDateFormat([...res.data]);
    } catch (error: any) {
      console.log("api failed");
    }
  };
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const [showMessage, setShowMessage] = useState(false);
  const [updateError, setUpdateError] = useState(false);

  const handleSubmit = async (values: any) => {
    try {
      const remappedValues: any = remapUserData(values);
      remappedValues.dateFormat = currentDateFormat;
      const response = await UserService.updateUserByEmail(
        AuthService.getCurrentUser().email,
        "updateprofile",
        remappedValues
      );
      const updatedProfile = { ...newUserProfile };
      for (const [key, value] of Object.entries(remappedValues)) {
        updatedProfile[key] = value;
      }
      dispatch(setUserProfile(updatedProfile));

      setIsEditing(false);
      setShowMessage(true);

      setTimeout(() => {
        setShowMessage(false);
        onSubmit(updatedProfile);
      }, 3000);
    } catch (error: any) {
      console.error("Failed to update user data:", error.message);
      setUpdateError(true);
      setTimeout(() => {
        setUpdateError(false);
      }, 3000);
    }
  };

  const replaceNull = (value: string | null) => {
    return value !== null ? value : "--";
  };

  useEffect(() => {
    if (isEditing) {
      handleDateFormat();
      console.log(isEditing, "state udpate");
    }
  }, [isEditing]);
  useEffect(() => {
    if (updateSuccess) {
      // Hide success message after 3 seconds
      const timer = setTimeout(() => {
        setUpdateSuccess(false);
      }, 1000000);
      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [updateSuccess]);
  const moveToChangePassword = async () => {
    navigate("/changepassword");
    setAnchorEl(null);
  };
  return (
    <div
      className={classes.root}
      style={{
        marginTop: "25px",
      }}
    >
      {showMessage && (
        <div style={{ color: "green", marginTop: "10px" }}>
          Update successful!
        </div>
      )}

      {updateError && (
        <div style={{ color: "red", marginTop: "10px" }}>
          Update failed. Please try again later.
        </div>
      )}
      <Formik
        initialValues={data}
        // validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange }) => {
          console.log(values);
          return (
            <Form>
              <Stack direction="row" justifyContent={"space-between"}>
                <Typography variant="h5" component="div" gutterBottom>
                  User Account Information
                </Typography>
                <IconButton
                  className={classes.editButton}
                  onClick={handleEditClick}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <Button
                  className={classes.changePasswordButton}
                  onClick={moveToChangePassword}
                >
                  Change Password
                </Button>
              </Stack>
              <Divider
                style={{
                  marginBottom: "25px",
                }}
              />

              {isEditing ? (
                <Grid container direction="row" alignItems="center" spacing={2}>
                  {Object.entries(values).map(([key, value]) => (
                    <Grid item xs={4} key={key}>
                      {value.key == "dateFormat" && dateFormat ? (
                        <>
                          <InputLabel id="demo-simple-select-label">
                            Date Format
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="dataFormatSelect"
                            value={currentDateFormat}
                            label="Date Format"
                            fullWidth
                            variant="outlined"
                            onChange={(e) =>
                              setCurrentDateFormat(e.target.value as string)
                            }
                          >
                            {dateFormat.map((item, index) => (
                              <MenuItem key={item + index} value={item || ""}>
                                {item}
                              </MenuItem>
                            ))}
                          </Select>
                        </>
                      ) : (
                        <TextField
                          name={key}
                          label={key}
                          value={value.value}
                          onChange={handleChange}
                          fullWidth
                          variant="outlined"
                        />
                      )}
                      <ErrorMessage
                        name={key}
                        render={() => (
                          <div
                            style={{ fontSize: "10px", color: "#dc3545" }}
                          >{`* ${key} is required`}</div>
                        )}
                      />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Grid container direction="row" alignItems="center" spacing={3}>
                  {Object.entries(values).map(([key, value]) => (
                    <Grid item xs={4} key={key}>
                      <Box
                        style={{
                          color: "#63718d",
                          display: "flex",
                          fontSize: "12px",
                          lineHeight: "16px",
                          marginBottom: "4px",
                        }}
                      >
                        {key}
                      </Box>
                      <Box
                        style={{
                          fontSize: "14px",
                          lineHeight: "20px",
                          color: "#2a303c",
                          fontWeight: "400",
                        }}
                      >
                        {typeof value.value === "object"
                          ? JSON.stringify(value.value)
                          : replaceNull(value.value)}
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              )}

              {isEditing && (
                <>
                  <Button
                    variant="contained"
                    type="submit"
                    style={{
                      marginTop: "25px",
                    }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => setIsEditing(false)}
                    style={{
                      marginTop: "25px",
                      marginLeft: "25px",
                    }}
                  >
                    Cancel
                  </Button>
                </>
              )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default DisplayData;

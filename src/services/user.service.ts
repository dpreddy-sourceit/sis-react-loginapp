import axios from "axios";

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/`;

const getPublicContent = () => {
  return axios.get(API_URL + "users/all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "users/user");
};
const getDataFormatMetadata = () => {
  return axios.get(API_URL + "test/metadata/dateformat");
};
const getUserDetails = async (email: string, action: string) => {
  try {
    const response = await axios.post(
      API_URL + "users/email",
      {
        updatedUserDto: {
          city: "string",
          country: "string",
          dateFormat: "string",
          decimalFormat: "string",
          email: email,
          firstName: "string",
          gender: "string",
          houseNumber: "string",
          id: 0,
          language: "string",
          lastName: "string",
          mobileNumber: 0,
          officeNumber: 0,
          password: "string",
          state: "string",
          streetAddress: "string",
          timeFormat: "string",
          timeZone: "string",
        },
      },
      {
        params: {
          email: email,
          action: action,
        },
      }
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};

const updateUserByEmail = async (
  email: string,
  action: string,
  updatedUserDto: any
) => {
  try {
    console.log("updated", updatedUserDto);
    const response = await axios.post(
      API_URL + "users/email",
        updatedUserDto,
      {
        params: {
          email: email,
          action: action,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod");
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin");
};

const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  getUserDetails,
  updateUserByEmail,
  getDataFormatMetadata
};

export default UserService;

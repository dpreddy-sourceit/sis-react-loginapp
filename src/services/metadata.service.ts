import axios from "axios";

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/metadata/`;

const getMetadata = async () => {
  try {
    const response = await axios.get(`${API_URL}metadata`);
    return response.data;
  } catch (err: any) {
    console.error(err); // Log the entire error for debugging
    if (err.response && err.response.data) {
      console.log(err.response.data); // Log the error response data if available
    } else {
      console.log("Error occurred:", err.message); // Log the error message
    }
  }
};

export default getMetadata;
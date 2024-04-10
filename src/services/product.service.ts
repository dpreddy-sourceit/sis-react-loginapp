import axios from "axios";

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/products/`;
const TEST_API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/test/products/`;
 
const getProductDetailsGeneral = async (productId: string) => {
  try {
    const response = await axios.get(`${API_URL}products/${productId}`);
    console.log("response", response);
    return response.data;
  } catch (err: any) {
    console.error(err); // Log the entire error for debugging
    if (err.response && err.response.data) {
      console.log(err.response.data); // Log the error response data if available
    } else {
      console.log("Error occurred:", err.message); // Log the error message
    }
    // Handle error
  }
};
const postProductDetails = async (postProductDetails:any)=>{
    console.log("postProductDetails in service", postProductDetails)
    try {
      const response = await axios.post(API_URL+"prodgeninfo/update", postProductDetails);
      console.log("response", response);
    } catch (err: any) {
      console.error(err); // Log the entire error for debugging
      if (err.response && err.response.data) {
        console.log(err.response.data); // Log the error response data if available
      } else {
        console.log("Error occurred:", err.message); // Log the error message
      }
      // Handle error
    }

}

const getProductUomData = async ()=>{
  try {
    const response = await axios.get(TEST_API_URL+"uomdata");
    // console.log("response in UOM", response.data);
    return response.data;
  } catch (err: any) {
    console.error(err); // Log the entire error for debugging
    if (err.response && err.response.data) {
      console.log(err.response.data); // Log the error response data if available
    } else {
      console.log("Error occurred:", err.message); // Log the error message
    }
    // Handle error
  }
}

const getProductHistoryData = async ()=>{
  try {
    const response = await axios.get(TEST_API_URL+"history");
    // console.log("response in History", response.data);
    return response.data;
  } catch (err: any) {
    console.error(err); // Log the entire error for debugging
    if (err.response && err.response.data) {
      console.log(err.response.data); // Log the error response data if available
    } else {
      console.log("Error occurred:", err.message); // Log the error message
    }
}
}

const ProductService = {
  getProductDetailsGeneral,
  postProductDetails,
  getProductUomData,
  getProductHistoryData,
}
export default ProductService;

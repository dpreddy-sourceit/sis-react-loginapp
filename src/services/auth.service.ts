import axios from "axios";

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/auth/`;

const register = (username: any, email: any, password: any) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = (username: any, password: any) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.username) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};


const logout = () => {
  localStorage.removeItem("user");
  return axios.post(API_URL + "signout").then((response) => {
    return response.data;
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user") as any);
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;

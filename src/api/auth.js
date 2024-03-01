import axios from "axios";

const backend_Url = "http://localhost:7000/api/v1";

//Handling Register API
export const handleUserRegistration = async ({ name, email, password }) => {
  try {
    const reqUrl = `${backend_Url}/auth/register`;
    const reqPayload = { name, email, password };
    const response = await axios.post(reqUrl, reqPayload);
    return response;
  } catch (error) {
    return error?.response;
  }
};

//Hndling Login API
export const handleUserLogin = async ({ email, password }) => {
  try {
    const reqUrl = `${backend_Url}/auth/login`;
    const reqPayload = { email, password };
    const response = await axios.post(reqUrl, reqPayload);
    return response;
  } catch (error) {
    return error?.response;
  }
};

//Protected Url
export const protectedUrl = async () => {
  try {
    //setting header
    const token = JSON.parse(localStorage.getItem("Token"));
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const result = await axios.get(`${backend_Url}/auth/protected`);
    return result;
  } catch (error) {
    return error?.response;
  }
}


export const updateProfile = async (body) => {
  try {
    //setting header
    const token = JSON.parse(localStorage.getItem("Token"));
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const result = await axios.put(`${backend_Url}/auth/update`, body);
    return result;
  } catch (error) {
    return error?.response;
  }
}

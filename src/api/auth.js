import axios from "axios";

const backend_Url = "http://localhost:7000/api/v1";

//Handling Register API
export const handleUserRegistration = async ({ name, email, password }) => {
  try {
    const reqUrl = `${backend_Url}/auth/register`;
    const reqPayload = { name, email, password };
    const response = await axios.post(reqUrl, reqPayload);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//Hndling Login API
export const handleUserLogin = async ({ email, password }) => {
  try {
    const reqUrl = `${backend_Url}/auth/login`;
    const reqPayload = { email, password };
    const response = await axios.post(reqUrl, reqPayload);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

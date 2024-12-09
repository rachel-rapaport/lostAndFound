import axios from "axios";
export async function loginAuthenticationCookies(
  email: string,
  password: string
) {
  try {
    console.log("in login service function");
    console.log(email,password);
    
    
    const response = await axios.post(
      "http://localhost:3000/api/login",
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );

    console.log("response", response);

    if (response.data.token) {
      console.log(response.data.token);

      return true;
    }
  } catch (error) {
    console.log("error from service", error);
    return false;
  }
}

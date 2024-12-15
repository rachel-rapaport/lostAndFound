import axios from "axios";
export async function loginAuthenticationCookies(
  email: string,
  password: string
) {

  try {
    console.log("in login service function");
    console.log("in service",email,password);
    
    const response = await axios.post(
      '/api/sign/signIn',
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
    else if(response.status===200){
      console.log("User already logged in");
      return true;
      
    }
  } catch (error) {
    console.log("error from service", error);
    return false;
  }
}

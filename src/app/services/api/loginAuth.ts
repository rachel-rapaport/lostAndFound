import axios from "axios";
export async function loginAuthenticationCookies(
  email: string,
  password: string
) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

  try {
    console.log("in login service function");
    console.log(email,password);
    
    
    const response = await axios.post(
      `${baseUrl}/api/login`,
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

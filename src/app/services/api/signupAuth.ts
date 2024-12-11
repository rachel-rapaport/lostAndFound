import axios from "axios";
export async function signupAuthenticationCookies(
  email: string,
  phone: string,
  fullName: string,
  password: string
) {
  try {
    // console.log("in service sign up", email, 'password',password, fullName, 'phone',phone);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

    const response = await axios.post(
      `${baseUrl}/api/signup`, 
      {
        email,
        password,
        fullName,
        phone,
      } ,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json", 
        },
      }
    );

    console.log("response", response);

    if (response && response.data && response.data.token) {
      return true;
    }
  } catch (error) {
    console.error(
      "Error in signupAuthenticationCookies:",
      error
    );
    return false;
  }
}

import axios from "axios";
import { useAppStore } from "@/app/store/store";

const vercelUrl = useAppStore.getState().vercelUrl;

export async function signupAuthenticationCookies(
  email: string,
  phone: string,
  fullName: string,
  password: string
) {
  try {
    // console.log("in service sign up", email, 'password',password, fullName, 'phone',phone);

    const response = await axios.post(
      '/api/sign/signUp', 
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
          'X-Vercel-Url': vercelUrl,
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


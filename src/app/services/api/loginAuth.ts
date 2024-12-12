import axios from "axios";
import { useAppStore } from "@/app/store/store";

const vercelUrl = useAppStore.getState().vercelUrl;
export async function loginAuthenticationCookies(
  email: string,
  password: string
) {

  try {
    console.log("in login service function");
    console.log(email,password);
    
    
    const response = await axios.post(
      '/api/sign/signIn',
      {
        email,
        password,
      },
      {
        withCredentials: true,
        headers: {
          'X-Vercel-Url': vercelUrl,  // Add vercelUrl in the header
         
        },
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

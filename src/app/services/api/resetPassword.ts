import axios from "axios";

export const sendEmailTo = async (resetEmail:string, resetUrl:string) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

const response = await axios.post(
    `${baseUrl}/api/send-email`,
    {
      to: resetEmail,
      subject: "איפוס סיסמה",
      text: "שלום, לאיפוס סיסמה אנא השתמש בקישור שלהלן.",
      htmlContent: `
      <div dir="rtl">
          <h1>איפוס סיסמה אתר השבת אבידה</h1>
          <p>לאיפוס סיסמה היכנס לקישור הבא:</p>
          <p>
              <a href='${resetUrl}'  
              style='color:blue; text-decoration:underline;'>
                  איפוס סיסמה
              </a>
          </p>
          </div>
      `,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log(response);
  
}
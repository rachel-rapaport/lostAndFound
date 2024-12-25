import axios from "axios";

export const sendEmailToUser = async (
  userEmail: string,
  subject: string,
  content: string,
) => {
  try {
    if (!userEmail) {
      throw new Error("There is no recipient email");
    }
    const response = await axios.post("/api/send/email", {
      to: userEmail,
      subject,
      htmlContent: `
      <div dir="rtl">
        <p>${content}</p>
        <p>בברכה,</p>
        <p>צוות אתר מציאון.</p>
      </div>`,
    });

    if (response && response.status === 200) {
      console.log("Email was send successfully");
      alert("הקישור לאיפוס נשלח בהצלחה. בדוק את תיבת הדואר הנכנס שלך");
      return response.data;
    } else {
      throw new Error("Failed to send email: Received status code");
    }
  } catch (error) {
    console.log(error);

    throw new Error("Failed to send email. Please try again later.");
  }
};

export const sendEmailToAdmin = async (
  userEmail: string,
  subject: string,
  content: string
) => {
  try {
    // Indentation in each sentence (according to the periods)
    const formattedContent = content.replace(/\./g, ".<br>");

    const response = await axios.post("/api/send/email", {
      subject,
      htmlContent: `
      <div dir="rtl">
        <p>${formattedContent}</p>
        <p style="padding-bottom: 4vh;">השב לכתובת זו: ${userEmail.toLowerCase()}</p>
      </div>`,
    });

    if (response && response.status === 200) {
      console.log("Email was send successfully");
      return response.data;
    } else {
      throw new Error("Failed to send email");
    }
  } catch (error) {
    throw new Error("Failed to send email. Please try again later.", error.message);
  }
}

import axios from "axios"

export const sendEmailToUser = async (userEmail: string, subject: string, text: string) => {
    try {
        const response = await axios.post('/api/send/email',
            {
                to: userEmail, subject, text: `${text}
בברכה,
צוות אתר מציאון` })

        if (response && response.status === 200) {
            console.log("Email was send successfully");
            return response.data;
        }
        else {
            throw new Error('Failed to send email: Received status code');
        }
    }
    catch {
        throw new Error("Failed to send email. Please try again later.");
    }
}

export const sendEmailToAdmin = async (userEmail: string, subject: string, text: string) => {
    try {
        const response = await axios.post('/api/send/email',
            { to: process.env.NEXT_PUBLIC_TO_EMAIL, subject, text: `${text}\nנשלח ע"י: ${userEmail}` });

        if (response && response.status === 200) {
            console.log("Email was send successfully");
            return response.data;
        }
        else {
            throw new Error('Failed to send email: Received status code');
        }
    }
    catch {
        throw new Error("Failed to send email. Please try again later.");
    }
}
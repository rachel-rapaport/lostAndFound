import axios from "axios"

export const sendEmailToUser = async (userEmail: string, subject: string, text: string, htmlContent: string) => {
    try {
        if (!userEmail) {
            throw new Error('There is no recipient email');
        }
        const response = await axios.post('/api/send/email',
            {
                to: userEmail, subject, text: `${text}
בברכה,
צוות אתר מציאון` ,htmlContent})

        if (response && response.status === 200) {
            console.log("Email was send successfully");
            return response.data;
        }
        else {
            throw new Error('Failed to send email: Received status code');
        }
    }
    catch(error) {
        console.log(error);
        
        throw new Error("Failed to send email. Please try again later.");
    }
}

export const sendEmailToAdmin = async (userEmail: string, subject: string, text: string) => {
    try {
        const response = await axios.post('/api/send/email',
            { subject, text: `${text}\nנשלח ע"י: ${userEmail}` });

        if (response && response.status === 200) {
            console.log("Email was send successfully");
            return response.data;
        }
        else {
            throw new Error('Failed to send email');
        }
    }
    catch {
        throw new Error("Failed to send email. Please try again later.");
    }
}
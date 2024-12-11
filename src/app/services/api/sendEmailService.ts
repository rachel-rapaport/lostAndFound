import axios from "axios"

//send email to user
export const sendEmailToUser = async (userEmail: string, subject: string, text: string) => {
    try {
        console.log("shiraaaaaaaaaaaaaaaaaaaaaaaaaaa",userEmail);
        
        const response = await axios.post('/api/send/email',
            { to: userEmail, subject, text })

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
            { to: process.env.TO_EMAIL, subject: `${subject}\nUser email: ${userEmail}`, text });

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
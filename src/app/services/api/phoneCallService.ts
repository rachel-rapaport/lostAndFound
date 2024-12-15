import axios from "axios";

export const sendPhoneCall = async (phone: string, message: string) => {
    try {
        const response = await axios.post('/api/send/phone-call', { phone, message })

        if (response && response.status === 201) {
            console.log("Phone call was send successfully");
            return response.data;
        }
        else {
            throw new Error('Failed to send phone call');
        }
    }

    catch (error) {
        console.error("Failed to send phone call. Please try again later")
        throw error;
    }
}
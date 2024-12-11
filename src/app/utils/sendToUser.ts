import { User } from '@/app/types/props/user';
import { sendEmailToUser } from '../services/api/sendEmailService';
import { createAlert } from '../services/api/alertService';
import { sendPhoneCall } from '../services/api/phoneCallService';


export const afterFilter = (user: User, status: string, link: string) => {
    console.log("in after",user);
    
    const contentItem = {
        "subject": "נמצא פריט התואם לאבידה שלך – בדוק אותו!",
        "text":
            `היי,

רצינו לעדכן אותך כי מישהו העלה לאתר פריט שמצא, לאחר שבדקנו את הפרטים, נראה שהם תואמים לאבידה שלך.
אנא בדוק אם אכן מדובר באבידה שלך.

${link}`
    }
    const contentChat = {
        "subject": "מישהו מחכה לך בצ'אט!",
        "text":
            `היי,

אחד המשתמשים באתרנו איבד פריט הזהה לפריט שמצאת, והוא ענה על הסימנים נכונה.
כעת הוא מחכה לך בצ'אט לאימות סופי ולתיאום העברת הפריט.

אנא היכנס/י לצ'אט על מנת להשלים את התהליך.

${link}`
    }

    switch (status) {
        case "chat":
            sendEmailToUser(user.email, contentChat.subject, contentChat.text);
            sendPhoneCall(user.phone,contentChat.text)
            createAlert(String(user._id), contentChat.subject)
            break;
        case "foundItem":
            sendEmailToUser(user.email,contentItem.subject,contentItem.text);
            sendPhoneCall(user.phone,contentItem.text);
            createAlert(String(user._id), contentItem.subject)
            
    }

}



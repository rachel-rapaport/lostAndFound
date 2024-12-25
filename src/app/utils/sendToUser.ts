import { User } from '@/app/types/props/user';
import { sendEmailToUser } from '../services/api/sendEmailService';
import { createAlert } from '../services/api/alertService';
import { sendPhoneCall } from '../services/api/phoneCallService';


export const afterFilter = (user: User, status: string, link: string) => {
    const contentItem = {
        "subject": "נמצא פריט התואם לאבידה שלך – בדוק אותו!",
        "text": "שלום",
        "htmlContent":
            `היי,

רצינו לעדכן אותך כי מישהו העלה לאתר פריט שמצא, לאחר שבדקנו את הפרטים, נראה שהם תואמים לאבידה שלך.
אנא בדוק אם אכן מדובר באבידה שלך.

${link}`
    }
    const contentChat = {
        "subject": "מישהו מחכה לך בצ'אט!",
        "text": "שלום",
        "htmlContent":
            `היי,

אחד המשתמשים באתרנו איבד פריט הזהה לפריט שמצאת, והוא ענה על הסימנים נכונה.
כעת הוא מחכה לך בצ'אט לאימות סופי ולתיאום העברת הפריט.

אנא היכנס/י לצ'אט על מנת להשלים את התהליך.

${link}`
    }

    switch (status) {
        case "chat":
            sendEmailToUser(user.email, contentChat.subject, contentChat.text, contentChat.htmlContent);
            sendPhoneCall(user.phone, contentChat.text)
            createAlert(String(user._id), `contentChat.subject ${link}`)
            break;
        case "foundItem":
            sendEmailToUser(user.email, contentItem.subject, contentItem.text, contentItem.htmlContent);
            sendPhoneCall(user.phone, contentItem.text);
            createAlert(String(user._id), `contentItem.subject ${link}`)

    }

}

export const resetPassword = (email: string, link: string) => {
    const content = {
        "subject": "איפוס סיסמה",
        "text": "שלום, לאיפוס סיסמה אנא השתמש בקישור שלהלן.",
        "htmlContent": `
      <div dir="rtl">
          <h1>איפוס סיסמה אתר השבת אבידה</h1>
          <p>לאיפוס סיסמה היכנס לקישור הבא:</p>
          <p>
              <a href='${link}'  
              style='color:blue; text-decoration:underline;'>
                  איפוס סיסמה
              </a>
          </p>
          </div>
      `,
    }

     sendEmailToUser(email, content.subject, content.text, content.htmlContent);
   
}



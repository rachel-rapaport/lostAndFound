import { User } from '@/app/types/props/user';
import { createChatRoom } from '@/app/services/chat/chatFirebase';
import { sendEmailToUser } from '../services/api/sendEmailService';
import { Types } from 'mongoose';
import { createAlert } from '../services/api/alertService';



// //craete Link to item
// const initiateChat = async (currentUser: User, otherUser: User) =>{

//     const roomId = await createChatRoom(String(currentUser._id), String(otherUser._id));

//     const chatRoomLink = `${process.env.NEXT_PUBLIC_BASE_URL}/chat/${roomId}`;
// }




//const sa=linl to chat ${chatRoomLink};
//const sa=linl to chat ${chatRoomLink};


//SEND EMAIL
//   const res = await axios.post("/api/send-email",{
//     to: "9013825@gmail.com",
//     subject: "Test email sending",
//     text: `linl to chat ${chatRoomLink}`
// })

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
            createAlert(String(user._id), contentChat.subject)
            break;
        case "foundItem":
            sendEmailToUser(user.email,contentItem.subject,contentItem.text);
            createAlert(String(user._id), contentItem.subject)
            
    }

}



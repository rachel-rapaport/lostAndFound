import { NextRequest, NextResponse } from "next/server";
import twilio from 'twilio';

export async function POST(request: NextRequest) {
    try {
        const { phone, message } = await request.json();

        if (!phone || !message) {
            return NextResponse.json(
                { message: "Please provide both 'phone' and 'message' fields" },
                { status: 400 }
            );
        }
        const client = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

        // Creates and initiates a phone call with the provided parameters
        const call = await client.calls
            .create({
                twiml: `<Response><Say>${message}</Say></Response>`,
                to: phone,
                from: "13346414013",
            })

        if (call) {
            console.log(`Call SID: ${call.sid}`);
            const callDetails = await client.calls(call.sid).fetch();
            console.log(`Call Status: ${callDetails.status}`);
            return NextResponse.json(
                { message: "Call was initiated successfully!", data: callDetails },
                { status: 201 }
            );
        }
        else {
<<<<<<< HEAD
            return NextResponse.json({ message: "Failed to create the call" }, { status: 500 });
=======
            console.error("Failed to create the call");
            return NextResponse.json(
                { message: "Failed to create the call" },
                { status: 500 }
            );
>>>>>>> 93d3807d2de94825cd4bfa7fb3149e8e3a6bee16
        }

    } catch (error) {
<<<<<<< HEAD
        return NextResponse.json({ message: "Error occurred while making the call", error: error }, { status: 500 });
=======
        return NextResponse.json(
            { message: "Error occurred while making the call", error: error },
            { status: 500 }
        );
>>>>>>> 93d3807d2de94825cd4bfa7fb3149e8e3a6bee16
    }
}

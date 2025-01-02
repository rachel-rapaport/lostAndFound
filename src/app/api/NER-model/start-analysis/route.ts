// locally great vercel nooooooooo
import { getVercelUrl } from "@/app/utils/vercelUrl";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const railwayUrl = process.env.NEXT_PUBLIC_RAILWAY_URL;

export async function POST(request: NextRequest) {
  try {
    const vercelUrl = getVercelUrl(request);
    const { text } = await request.json(); // Parse the body content from the request
    const response = await axios.post(`${railwayUrl}/analyze`, {
      text,
      vercelUrl,
    });
    return NextResponse.json(response.data); // Send the response data back
  } catch (error: unknown) {
    console.log("Error during analysis:", error); // Detailed logging of the error

    return NextResponse.json(
      { error: "Failed to analyze text" },
      { status: 500 }
    );
  }
}

// option 2 polling
// import Result from "@/app/types/NER-model/result";
// import axios from "axios";
// import { NextRequest, NextResponse } from "next/server";

// export const dynamic = "force-dynamic";

// const railwayUrl = process.env.NEXT_PUBLIC_RAILWAY_URL;
// const taskStatuses: Record<string, { status: string; result?: Result }> = {};

// export async function POST(request: NextRequest) {
//   try {
//     const { text } = await request.json();

//     const taskId = Math.random().toString(36).substr(2, 9);

//     taskStatuses[taskId] = { status: "Processing" };

//     // Send the request to Railway to start the analysis (fire and forget)
//     axios.post(`${railwayUrl}/analyze`, { text })
//     .then((response) => {
//       // Simulate receiving the result
//       taskStatuses[taskId] = { status: "Completed", result: response.data };
//     })
//     .catch((error) => {
//       console.error("Error in Railway analysis:", error);
//       taskStatuses[taskId] = { status: "Failed" };
//     });

//     // Respond to the client with the task ID
//     return NextResponse.json({ status: "Processing started", taskId });

//   } catch (error) {
//     console.error("Error starting analysis:", error);
//     return NextResponse.json({ error: "Failed to start analysis" }, { status: 500 });
//   }
// }

// // async function logTaskResult(jobId: string) {
// //   try {
// //     // Simulate asynchronous behavior, e.g., waiting for a result via webhook or file, etc.
// //     await new Promise(resolve => setTimeout(resolve, 60000));  // Wait for 60 seconds
// //     console.log(`Task with Job ID has completed. Logging result...`);

// //     console.log("Final result for job ID", jobId);

// //   } catch (error) {
// //     console.error('Error while logging task result:', error);
// //   }
// // }

// option 1 - call back

// import axios from "axios";
// import { NextRequest, NextResponse } from "next/server";

// const railwayUrl = process.env.NEXT_PUBLIC_RAILWAY_URL;
// const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL;

// export async function POST(request: NextRequest) {
//   try {
//     const { text } = await request.json();

//     // Send a request to Railway
//     const response = await axios.post(`${railwayUrl}/analyze`, {
//       text,
//       callback: webhookUrl, // Add callback URL if supported by Railway
//     });

//     return NextResponse.json({ status: "Processing started", taskId: response.data.taskId });
//   } catch (error) {
//     console.error("Error starting analysis:", error);
//     return NextResponse.json({ error: "Failed to start analysis" }, { status: 500 });
//   }
// }

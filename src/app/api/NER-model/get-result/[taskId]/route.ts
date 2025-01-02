// option 2 polling
// import Result from "@/app/types/NER-model/result";
// import { NextRequest, NextResponse } from "next/server";

// // Simulated in-memory storage (use a database in production)
// const taskStatuses: Record<string, { status: string; result?: Result }> = {};

// export async function GET(request: NextRequest) {
//   try {
//     const url = new URL(request.url);
//     const taskId = url.pathname.split("/").pop();
//     console.log("--------------------",taskId, "---------------------");
    

//     if (!taskId) {
//       return NextResponse.json({ error: "Task ID is required" }, { status: 400 });
//     }

//     // Check if the task exists in the in-memory storage
//     const task = taskStatuses[taskId];
    
//     console.log("???????????????????",task);
    
//     if (!task) {
//       return NextResponse.json({ error: "Task not found" }, { status: 404 });
//     }

//     // Return the task's status and result
//     return NextResponse.json({
//       status: task.status,
//       result: task.result ?? null,
//     });
//   } catch (error) {
//     // Handle unexpected errors gracefully
//     return NextResponse.json(
//       { error: "An unexpected error occurred", details: (error as Error).message },
//       { status: 500 }
//     );
//   }
// }

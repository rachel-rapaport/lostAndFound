// locally great - vercel nooooo
import axios from "axios";
import Token from "../types/NER-model/token";

const analyzeTextWithModel = async (sentence: string) => {
  try {
    const response = await axios.post("/api/NER-model/start-analysis", {
      text: sentence,
    });
    const nouns: string = await response.data.embeddings[0].tokens
      .filter((token: Token) => token.morph.pos === "NOUN")
      .map((token: Token) => token.lex)
      .join(",");
    return nouns;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export default analyzeTextWithModel;

//option 2 polling
// import axios from "axios";

// export const analyzeTextAndLog = async (sentence: string) => {
//   try {
//     console.log("Starting analysis for:", sentence);

//     // Step 1: Start the analysis
//     const startResponse = await axios.post("/api/NER-model/start-analysis", {
//       text: sentence,
//     });

//     if (!startResponse.data.taskId) {
//       throw new Error("Failed to get task ID from the server.");
//     }

//     const taskId = startResponse.data.taskId;
//     console.log(`Task started. Task ID: ${taskId}`);

//     // Step 2: Poll for the result
//     const result = await pollForResult(taskId);

//     // Log the final result
//     console.log("Final Analysis Result:", result);
//   } catch (error) {
//     console.error("Error during analysis:", error);
//   }
// };

// const pollForResult = async (taskId: string) => {
//   const pollInterval = 20000; // 3 seconds
//   const maxAttempts = 10; // Max attempts to poll

//   for (let attempt = 0; attempt < maxAttempts; attempt++) {
//     try {
//       const resultResponse = await axios.get(`/api/NER-model/get-result/${taskId}`);

//       if (resultResponse.data.status === "Completed") {
//         return resultResponse.data.result; // Final result
//       } else if (resultResponse.data.status === "Failed") {
//         throw new Error("Analysis failed on the server.");
//       }
//     } catch (error) {
//       console.error(`Polling attempt ${attempt + 1} failed:`, error);
//     }

//     // Wait before the next poll
//     await new Promise((resolve) => setTimeout(resolve, pollInterval));
//   }

//   throw new Error("Analysis timeout: Task did not complete in time.");
// };

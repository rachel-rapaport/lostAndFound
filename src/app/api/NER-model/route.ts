// import axios from "axios";
// // import { after } from "lodash";

// interface NEREntity {
//   entity: string;
//   score: number;
//   start: number;
//   end: number;
//   word: string;
// }

// interface Token {
//   lex: string;
//   morph: {
//     feats: {
//       Gender: string;
//       Number: string;
//     };
//     pos: string;
//     prefixes: string[];
//     suffix: boolean;
//     token: string;
//   };
//   offsets: {
//     start: number;
//     end: number;
//   };
//   seg: string[];
//   syntax: {
//     dep_func: string;
//     dep_head: string;
//     dep_head_idx: number;
//     word: string;
//   };
//   token: string;
// }

// interface Embedding {
//   ner_entities: NEREntity[];
//   root_idx: number;
//   text: string;
//   tokens: Token[];
// }

// interface AnalysisResult {
//   embeddings: Embedding[];
// }

// const huggingFaceAPI =
//   "https://api-inference.huggingface.co/models/dicta-il/dictabert-joint";

// const analyzeTextWithModel = async (
//   sentence: string
// ): Promise<AnalysisResult | null> => {
//   console.log("before try");

//   try {
//     const response = await axios.post(
//       huggingFaceAPI,
//       { inputs: sentence },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`, // You need to set your API key in Vercel secrets
//         },
//       }
//     );
// console.log("after response",response);

//     if (response.data.error) {
//       console.error("Error:", response.data.error);
//       return null;
//     }

//     // Process the response to match your data structure
//     const data: AnalysisResult = {
//       embeddings: response.data.map((embedding: any) => ({
//         ner_entities: embedding.ner_entities || [], // Adjust according to response
//         root_idx: embedding.root_idx || 0, // Assuming default values if not available
//         text: embedding.text || sentence,
//         tokens: embedding.tokens.map((token: any) => ({
//           lex: token.lex || "",
//           morph: {
//             feats: token.morph.feats ,
//             pos: token.morph.pos ,
//             prefixes: token.morph.prefixes || [],
//             suffix: token.morph.suffix ,
//             token: token.morph.token ,
//           },
//           offsets: {
//             start: token.offsets.start ,
//             end: token.offsets.end ,
//           },
//           seg: token.seg || [token.lex],
//           syntax: {
//             dep_func: token.syntax.dep_func,
//             dep_head: token.syntax.dep_head ,
//             dep_head_idx: token.syntax.dep_head_idx ,
//             word: token.syntax.word ,
//           },
//           token: token.token ,
//         })),
//       })),
//     };

//     return data;
//   } catch (error) {
//     console.error("Error:", error);
//     return null;
//   }
// };

// // Vercel serverless function handler
// export default async function handler(req: any, res: any) {
//   if (req.method === "POST") {
//     const { text } = req.body;

//     if (!text) {
//       return res.status(400).json({ error: "No text provided" });
//     }

//     const result = await analyzeTextWithModel(text);
//     if (result) {
//       return res.status(200).json(result);
//     } else {
//       return res.status(500).json({ error: "Error processing the text" });
//     }
//   } else {
//     return res.status(405).json({ error: "Method Not Allowed" });
//   }
// }

import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Define the allowed origin (Railway URL from environment variables)
const railwayUrl = process.env.NEXT_PUBLIC_RAILWAY_URL;

export async function POST(request: NextRequest) {
  // Add CORS headers
  // const origin = request.headers.get("origin");
  // const allowedOrigins = [
  //   railwayUrl,
  //   "http://127.0.0.1:8080",
  //   "http://10.250.36.188:8080",
  // ]; // Allow only the Railway URL
  // if (origin && !allowedOrigins.includes(origin)) {
  //   return NextResponse.json(
  //     { message: "Origin not allowed" },
  //     { status: 403 }
  //   );
  // }

  // // Handle preflight requests for CORS (OPTIONS)
  // if (request.method === "OPTIONS") {
  //   return new NextResponse(null, {
  //     headers: {
  //       "Access-Control-Allow-Origin": origin || "*", // Allow origin or default to "*"
  //       "Access-Control-Allow-Methods": "GET,POST,OPTIONS", // Allowed HTTP methods
  //       "Access-Control-Allow-Headers": "Content-Type", // Allowed headers
  //       "Access-Control-Allow-Credentials": "true", // Allow credentials (cookies, authentication headers)
  //     },
  //   });
  // }

  try {
    const { text } = await request.json(); // Parse the body content from the request

    const response = await axios.post(`${railwayUrl}/analyze`, {
      text,
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

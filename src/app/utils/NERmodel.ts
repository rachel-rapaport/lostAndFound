import axios from "axios";

const analyzeTextWithModel = async (sentence: string)=> {
  try {
    const response = await axios.post("/api/NER-model", { text: sentence });
    console.log("response from the utils",response);
    
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export default analyzeTextWithModel;

import { GoogleGenAI, Type } from "@google/genai";

// Analyzes a trading log using Gemini and provides feedback as a Tamagotchi coach.
export const getAiFeedback = async (logContent: string) => {
  try {
    // Create a new GoogleGenAI instance right before the API call to ensure the latest API key is used.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `사용자의 트레이딩 일지를 분석하고 '트레이딩 다마고치'로서 조언을 해주세요. 
      사용자의 심리 상태를 파악하고, 다음의 JSON 형식으로 응답하세요:
      {
        "feedback": "격려 또는 따끔한 충고 (한국어)",
        "sentiment": "happy | neutral | sad"
      }
      
      일지 내용: "${logContent}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            feedback: { 
              type: Type.STRING,
              description: "The feedback message for the trader."
            },
            sentiment: { 
              type: Type.STRING, 
              enum: ['happy', 'neutral', 'sad'],
              description: "The sentiment classification based on the trade result and tone."
            }
          },
          required: ["feedback", "sentiment"]
        }
      }
    });

    // Directly access the text property as a string (getter).
    const jsonStr = response.text?.trim() || "{}";
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Gemini API Error:", error);
    return { feedback: "분석 중 오류가 발생했습니다.", sentiment: 'neutral' };
  }
};

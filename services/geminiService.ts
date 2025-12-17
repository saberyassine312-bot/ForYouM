import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY || '';
  // Note: In a real production app, ensure this key is securely handled.
  return new GoogleGenAI({ apiKey });
};

export const generateProductDescription = async (productName: string, category: string): Promise<string> => {
  try {
    const ai = getClient();
    
    const prompt = `
      اكتب وصفاً تسويقياً جذاباً ومختصراً باللغة العربية لمنتج تجارة إلكترونية.
      اسم المنتج: ${productName}
      التصنيف: ${category}
      
      اجعل الوصف يركز على الفوائد ويشجع العميل على الشراء. لا تزد عن 50 كلمة.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || 'عذراً، لم نتمكن من توليد الوصف حالياً.';
  } catch (error) {
    console.error("Gemini API Error:", error);
    return 'حدث خطأ أثناء الاتصال بخدمة الذكاء الاصطناعي.';
  }
};
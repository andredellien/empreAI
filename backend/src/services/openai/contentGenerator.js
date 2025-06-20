const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

class ContentGenerator {
  static async generateContent(business, type, platform) {
    try {
      const prompt = this.buildPrompt(business, type, platform);
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error generando contenido con Gemini:', error);
      throw new Error('Error al generar el contenido');
    }
  }

  static buildPrompt(business, type, platform) {
    return `Eres un especialista en marketing digital y redacción de contenido para redes sociales. Tu tarea es crear un ${type} para ${platform} para el negocio "${business.name}" que se dedica a ${business.category}.
    Descripción del negocio: ${business.description}
    El contenido debe ser:
    - Altamente persuasivo y atractivo
    - Adaptado a la plataforma ${platform}
    - Del tipo ${type}
    - Con un tono ${business.BusinessSettings?.tone || 'profesional'}
    - Dirigido a ${business.BusinessSettings?.targetAudience || 'el público general'}
    - Optimizado para maximizar el engagement y la conversión
    - Incluir hashtags relevantes y emojis apropiados
    Escribe el texto final, no des opciones ni explicaciones, solo el post listo para publicar.`;
  }
}

module.exports = ContentGenerator; 
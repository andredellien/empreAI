const openai = require('../../config/openai');
const cloudinary = require('../../config/cloudinary');

class ImageGenerator {
  static async generateImage(business, style) {
    try {
      const prompt = this.buildPrompt(business, style);
      
      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1024",
        quality: "standard",
        style: style
      });

      const imageUrl = response.data[0].url;
      
      // Descargar la imagen y subirla a Cloudinary
      const imageResponse = await fetch(imageUrl);
      const imageBuffer = await imageResponse.buffer();
      
      // Convertir el buffer a base64
      const base64Image = imageBuffer.toString('base64');
      const dataURI = `data:image/png;base64,${base64Image}`;
      
      // Subir a Cloudinary
      const uploadResponse = await cloudinary.uploader.upload(dataURI, {
        folder: `empreai/${business.id}`,
        resource_type: 'image',
        format: 'png'
      });

      return uploadResponse.secure_url;
    } catch (error) {
      console.error('Error generando imagen:', error);
      throw new Error('Error al generar la imagen');
    }
  }

  static buildPrompt(business, style) {
    return `Crea una imagen ${style} para el negocio "${business.name}" que se dedica a ${business.category}. 
    Descripción del negocio: ${business.description}
    
    La imagen debe ser:
    - Profesional y de alta calidad
    - Representativa del negocio
    - En estilo ${style}
    - Apropiada para redes sociales
    - Con colores que reflejen la identidad del negocio`;
  }
}

module.exports = ImageGenerator; 
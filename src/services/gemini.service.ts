
import { Injectable } from '@angular/core';
import { GoogleGenAI } from "@google/genai";

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  async getDetailedExplanation(topic: string, question: string, selectedAnswer: string, isCorrect: boolean): Promise<string> {
    const prompt = `
      Agisci come un professore di Fisica Medica.
      Argomento: ${topic}.
      Domanda: ${question}.
      L'utente ha risposto: "${selectedAnswer}". 
      Esito: ${isCorrect ? 'Corretto' : 'Errato'}.
      
      Spiega il principio fisico in modo conciso e applicalo alla clinica medica (es. emodinamica, flebo, edema). 
      Massimo 80 parole. Usa un linguaggio moderno per studenti di medicina.
    `;

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          thinkingConfig: { thinkingBudget: 0 }
        }
      });
      return response.text;
    } catch (error) {
      console.error('Gemini API Error:', error);
      return "Il principio di Stevino afferma che la pressione aumenta con la profondità. In clinica, questo spiega perché monitoriamo attentamente la posizione del paziente durante la misurazione della pressione arteriosa.";
    }
  }
}

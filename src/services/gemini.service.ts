
import { Injectable } from '@angular/core';
import { GoogleGenAI } from "@google/genai";

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private ai = new GoogleGenAI({ apiKey: (window as any).process?.env?.API_KEY || '' });

  async getDetailedExplanation(topic: string, question: string, selectedAnswer: string, isCorrect: boolean): Promise<string> {
    const prompt = `
      Agisci come un professore di Fisica Medica per studenti del primo anno di Medicina (20-25 anni).
      Argomento: ${topic}.
      Domanda: ${question}.
      L'utente ha risposto: "${selectedAnswer}". 
      Risultato: ${isCorrect ? 'Corretto' : 'Sbagliato'}.
      
      Spiega in modo dettagliato ma accessibile i principi fisici coinvolti (Stevino o Archimede). 
      Collega la spiegazione ad un esempio pratico in ambito medico (es. pressione sanguigna, flebo, edema, galleggiamento di organi).
      Usa un tono incoraggiante e scientificamente rigoroso. Massimo 150 parole.
    `;

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          thinkingConfig: { thinkingBudget: 0 } // Low latency for fast feedback
        }
      });
      return response.text;
    } catch (error) {
      console.error('Gemini API Error:', error);
      return "Spiacente, non ho potuto caricare la spiegazione dettagliata in questo momento. Ricorda che la legge di Stevino descrive come la pressione aumenta con la profondità, mentre Archimede spiega la spinta idrostatica.";
    }
  }
}

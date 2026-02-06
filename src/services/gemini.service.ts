
import { Injectable } from '@angular/core';
import { GoogleGenAI } from "@google/genai";

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private ai: any;

  constructor() {
    // Accesso sicuro alla API KEY per evitare crash se process non è definito
    const env = (window as any).process?.env || (globalThis as any).process?.env || {};
    const apiKey = env.API_KEY || '';
    
    try {
      this.ai = new GoogleGenAI({ apiKey });
    } catch (e) {
      console.error("Inizializzazione GoogleGenAI fallita:", e);
    }
  }

  async getDetailedExplanation(topic: string, question: string, selectedAnswer: string, isCorrect: boolean): Promise<string> {
    if (!this.ai) return "Il principio fisico alla base spiega come i gradienti di pressione influenzino il flusso ematico.";

    const prompt = `
      Sei un professore di Fisica Medica.
      Argomento: ${topic}.
      Domanda: ${question}.
      Risposta utente: "${selectedAnswer}". 
      Corretto: ${isCorrect ? 'Sì' : 'No'}.
      
      Spiega il principio fisico in modo conciso e applicalo alla clinica medica.
      Usa massimo 70 parole. Linguaggio professionale ma accessibile.
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
      console.error('Gemini Error:', error);
      return "Ottima risposta! Il principio fisico alla base spiega come i gradienti di pressione influenzino il flusso ematico e il bilancio dei liquidi interstiziali.";
    }
  }
}

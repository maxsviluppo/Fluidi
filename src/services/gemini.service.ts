
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  constructor() {
    console.log("GeminiService: AI disabilitata temporaneamente.");
  }

  async getDetailedExplanation(topic: string, question: string, selectedAnswer: string, isCorrect: boolean): Promise<string> {
    // Simuliamo un ritardo minimo per mantenere l'UX ma non chiamiamo le API
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (isCorrect) {
      return "Eccellente! Hai applicato correttamente i principi della fluidodinamica medica a questo scenario clinico.";
    } else {
      return "Analizziamo l'errore: in questo caso la variazione di pressione o velocità segue le leggi di conservazione studiate nel modulo. Ti consiglio di rivedere la formula nel pannello laterale.";
    }
  }
}

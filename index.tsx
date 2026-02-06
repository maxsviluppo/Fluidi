
import '@angular/compiler';
import { bootstrapApplication } from '@angular/platform-browser';
import * as core from '@angular/core';
import { AppComponent } from './src/app.component.ts';

// Tenta di recuperare la funzione per la modalità Zoneless dal modulo Angular Core.
// In Angular 18/19+ è stabile, ma in alcune build ESM potrebbe essere ancora sotto il prefisso experimental.
const coreObj = core as any;
const provideZoneless = coreObj.provideZonelessChangeDetection || 
                        coreObj.provideExperimentalZonelessChangeDetection;

if (!provideZoneless) {
  throw new Error("FATAL: Impossibile trovare provideZonelessChangeDetection in @angular/core. L'applicazione richiede Angular 18+.");
}

bootstrapApplication(AppComponent, {
  providers: [
    provideZoneless()
  ]
}).catch(err => {
  console.error("Errore durante il bootstrap dell'applicazione:", err);
});

// AI Studio entry point

// AI Studio always uses an `index.tsx` file for all project types.

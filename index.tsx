
import '@angular/compiler';
import { bootstrapApplication } from '@angular/platform-browser';
import * as core from '@angular/core';
import { AppComponent } from './src/app.component.ts';

/**
 * Accediamo a provideZonelessChangeDetection in modo dinamico.
 * Questo evita il SyntaxError: "Importing binding name not found" che avviene 
 * quando il bundle ESM del CDN non esporta correttamente il nome statico.
 */
const coreAny = core as any;
const zonelessProviderFunc = coreAny.provideZonelessChangeDetection || 
                             coreAny.provideExperimentalZonelessChangeDetection;

if (!zonelessProviderFunc) {
  throw new Error("Errore Fatale: provideZonelessChangeDetection non trovato. Verifica la versione di Angular.");
}

bootstrapApplication(AppComponent, {
  providers: [
    zonelessProviderFunc()
  ]
}).catch(err => {
  console.error("Errore durante il bootstrap di FluidMed:", err);
});

// AI Studio always uses an `index.tsx` file for all project types.

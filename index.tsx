
import '@angular/compiler';
import { bootstrapApplication } from '@angular/platform-browser';
import * as core from '@angular/core';
import { AppComponent } from './src/app.component.ts';

/**
 * Risolviamo il SyntaxError accedendo dinamicamente al modulo core.
 * Questo è necessario perché alcune distribuzioni ESM non espongono il nome
 * come export statico ma solo come proprietà del namespace.
 */
const coreAny = core as any;
const provideZoneless = coreAny.provideZonelessChangeDetection || 
                        coreAny.provideExperimentalZonelessChangeDetection;

if (!provideZoneless) {
  console.error("Critical: provideZonelessChangeDetection non trovato.");
}

bootstrapApplication(AppComponent, {
  providers: [
    provideZoneless ? provideZoneless() : []
  ]
}).catch(err => {
  console.error("Errore fatale durante il bootstrap dell'app:", err);
});

// AI Studio always uses an `index.tsx` file for all project types.

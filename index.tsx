
import '@angular/compiler';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { AppComponent } from './src/app.component.ts';

bootstrapApplication(AppComponent, {
  providers: [
    provideExperimentalZonelessChangeDetection()
  ]
}).catch(err => {
  console.error("Errore fatale:", err);
  const text = document.getElementById('loading-text');
  if (text) text.innerHTML = "Errore di avvio. Controlla la console.";
});

// AI Studio always uses an `index.tsx` file for all project types.

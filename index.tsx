
import '@angular/compiler';
import { bootstrapApplication } from '@angular/platform-browser';
import * as core from '@angular/core';
import { AppComponent } from './src/app.component.ts';

/**
 * Funzione di bootstrap sicura per evitare loop e crash silenziosi.
 */
async function startApp() {
  try {
    const coreAny = core as any;
    // Cerchiamo il provider zoneless in tutte le sue possibili nomenclature ESM
    const zonelessProvider = coreAny.provideZonelessChangeDetection || 
                             coreAny.provideExperimentalZonelessChangeDetection ||
                             (core as any)['provideZonelessChangeDetection'];

    const providers = [];
    if (zonelessProvider) {
      providers.push(zonelessProvider());
    } else {
      console.warn("Zoneless provider non trovato, l'app potrebbe richiedere Zone.js o funzionare in modalità degradata.");
    }

    await bootstrapApplication(AppComponent, { providers });
    console.log("FluidMed avviata correttamente.");
  } catch (error) {
    console.error("Errore critico durante l'avvio di FluidMed:", error);
    const loadingText = document.getElementById('loading-text');
    if (loadingText) {
      loadingText.innerText = "Errore durante l'avvio. Controlla la console.";
      loadingText.classList.remove('animate-pulse');
      loadingText.classList.add('text-red-500');
    }
  }
}

startApp();

// AI Studio always uses an `index.tsx` file for all project types.

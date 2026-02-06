
import { Component, input, signal, computed, effect, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fluid-lab',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="lab-container rounded-[2rem] p-6 shadow-2xl relative overflow-hidden flex flex-col items-center text-slate-100">
      <!-- Badge Stato -->
      <div class="absolute top-4 right-6 flex items-center gap-2">
        <span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
        <span class="text-[10px] text-emerald-400 font-black uppercase tracking-widest">Live Simulation</span>
      </div>

      <h3 class="text-blue-400 text-sm font-bold uppercase mb-4 tracking-tighter">
        Laboratorio: {{ subtopic() === 'Stevin' ? 'Legge di Stevino' : subtopic() === 'Archimede' ? 'Principio di Archimede' : 'Dinamica dei Vasi' }}
      </h3>
      
      <!-- Visualizzatore Principale -->
      <div class="relative w-full max-w-[280px] h-48 border-x-4 border-b-4 border-blue-200/20 rounded-b-3xl bg-slate-900/40 backdrop-blur-sm shadow-inner overflow-hidden">
        
        <!-- Fluid Level -->
        <div 
          class="absolute bottom-0 w-full bg-gradient-to-t from-blue-600/40 to-blue-400/30 transition-all duration-500"
          [style.height.%]="waterLevel()"
        >
          <div class="absolute -top-1 left-0 w-full h-2 bg-blue-300/30 wave-animation"></div>
        </div>

        <!-- SIMULAZIONE STEVIN -->
        @if (subtopic() === 'Stevin') {
          <div 
            class="absolute left-1/2 -translate-x-1/2 w-0.5 bg-slate-500 transition-all duration-300"
            [style.height.%]="interactiveDepth()"
            [style.top]="0"
          >
            <div class="absolute bottom-0 -left-2 w-4 h-4 bg-red-500 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.6)] border-2 border-white flex items-center justify-center">
               <div class="w-1 h-1 bg-white rounded-full"></div>
            </div>
            <div class="absolute -right-20 bottom-0 bg-slate-800 text-white text-[10px] px-2 py-1 rounded-md font-mono border border-slate-700">
              P: {{ calculatedPressure() }} mmHg
            </div>
          </div>
        }

        <!-- SIMULAZIONE ARCHIMEDE -->
        @if (subtopic() === 'Archimede') {
          <div 
            class="absolute left-1/2 -translate-x-1/2 w-14 h-14 rounded-2xl border-2 transition-all duration-1000 flex items-center justify-center text-white font-bold text-[10px]"
            [class]="objectIsFloating() ? 'bg-amber-500 border-amber-300 shadow-lg' : 'bg-slate-700 border-slate-500'"
            [style.bottom.%]="objectDisplayPos()"
          >
            {{ objectIsFloating() ? 'Galleggia' : 'Affonda' }}
            <div class="absolute -top-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
               <div class="w-0.5 h-6 bg-emerald-400 relative">
                  <div class="absolute -top-1 -left-1 border-4 border-transparent border-b-emerald-400"></div>
               </div>
               <span class="text-[8px] text-emerald-400">Spinta</span>
            </div>
          </div>
        }

        <!-- SIMULAZIONE DINAMICA -->
        @if (subtopic() === 'Fluidodinamica') {
          <div class="absolute inset-0 flex items-center px-2">
             <div class="w-full flex items-center justify-between gap-0 h-16 bg-blue-900/20 border-y-2 border-blue-400/30 relative">
                @for (p of particles(); track $index) {
                  <div 
                    class="absolute w-2 h-2 bg-red-500/60 rounded-full blur-[1px]"
                    [style.left.%]="p.pos"
                    [style.top.%]="p.top"
                  ></div>
                }
                <div 
                  class="absolute left-1/2 -translate-x-1/2 w-16 bg-slate-900/80 transition-all duration-500"
                  [style.height.%]="stenosisLevel()"
                  style="top: 0;"
                ></div>
                <div 
                  class="absolute left-1/2 -translate-x-1/2 w-16 bg-slate-900/80 transition-all duration-500"
                  [style.height.%]="stenosisLevel()"
                  style="bottom: 0;"
                ></div>
             </div>
          </div>
        }
      </div>

      <!-- CONTROLLI INTERATTIVI -->
      <div class="w-full mt-6 bg-white/5 rounded-2xl p-4 border border-white/10 space-y-4">
        @if (subtopic() === 'Stevin') {
          <div class="space-y-3">
            <div class="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              <span>Profondità (h)</span>
              <span class="text-blue-400">{{ interactiveDepth() }}%</span>
            </div>
            <input type="range" min="5" max="95" [value]="interactiveDepth()" 
              (input)="updateDepth($event)"
              class="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500">
            
            <div class="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <div class="flex items-center gap-2 mb-1 text-blue-400">
                <span class="text-xs">🩺</span>
                <h4 class="text-[10px] font-black uppercase tracking-tighter">Correlazione Clinica</h4>
              </div>
              <p class="text-[11px] text-slate-300 leading-tight">
                {{ stevinAnalysis().text }}
              </p>
            </div>
          </div>
        }

        @if (subtopic() === 'Archimede') {
          <div class="space-y-2">
            <div class="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              <span>Densità Oggetto</span>
              <span class="text-amber-400">{{ objectDensity() }} kg/m³</span>
            </div>
            <input type="range" min="500" max="1500" [value]="objectDensity()" 
              (input)="updateDensity($event)"
              class="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500">
            <p class="text-[10px] text-slate-500 italic">Acqua ≈ 1000 kg/m³.</p>
          </div>
        }

        @if (subtopic() === 'Fluidodinamica') {
          <div class="space-y-2">
            <div class="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              <span>Stenosi</span>
              <span class="text-cyan-400">{{ stenosisLevel() * 2 }}%</span>
            </div>
            <input type="range" min="0" max="40" [value]="stenosisLevel()" 
              (input)="updateStenosis($event)"
              class="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500">
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    input[type='range']::-webkit-slider-thumb {
      appearance: none;
      width: 14px;
      height: 14px;
      background: white;
      border-radius: 50%;
      cursor: pointer;
    }
  `]
})
export class FluidLabComponent {
  subtopic = input<'Stevin' | 'Archimede' | 'Fluidodinamica'>('Stevin');
  waterLevel = signal(80);

  // Stevin
  interactiveDepth = signal(20);
  calculatedPressure = computed(() => 80 + (this.interactiveDepth() * 0.8));
  stevinAnalysis = computed(() => {
    const h = this.interactiveDepth();
    if (h > 70) return { text: "Pressione Venosa Alta (Arti Inferiori): Rischio EDEMA declive." };
    if (h > 30) return { text: "Pressione Media (Tronco): Ritorno venoso bilanciato." };
    return { text: "Pressione Bassa (Vicina al Cuore): Riempimento atriale agevolato." };
  });

  // Archimede
  objectDensity = signal(800);
  objectIsFloating = computed(() => this.objectDensity() <= 1000);
  objectDisplayPos = computed(() => this.objectIsFloating() ? 50 : 0);

  // Dinamica
  stenosisLevel = signal(10);
  flowSpeed = computed(() => 1 + (this.stenosisLevel() / 10));
  particles = signal(Array.from({length: 8}, (_, i) => ({pos: i * 15, top: 20 + Math.random() * 60})));

  constructor() {
    effect((onCleanup) => {
      if (this.subtopic() === 'Fluidodinamica') {
        const interval = setInterval(() => {
          this.particles.update(pts => pts.map(p => ({
            ...p,
            pos: (p.pos + this.flowSpeed()) % 110
          })));
        }, 50);
        onCleanup(() => clearInterval(interval));
      }
    });
  }

  updateDepth(event: Event) { this.interactiveDepth.set(parseInt((event.target as HTMLInputElement).value)); }
  updateDensity(event: Event) { this.objectDensity.set(parseInt((event.target as HTMLInputElement).value)); }
  updateStenosis(event: Event) { this.stenosisLevel.set(parseInt((event.target as HTMLInputElement).value)); }
}

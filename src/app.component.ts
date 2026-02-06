
import { Component, signal, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeminiService } from './services/gemini.service.ts';
import { QUESTIONS, Question } from './data/questions.ts';
import { FluidLabComponent } from './components/fluid-lab.component.ts';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FluidLabComponent],
  providers: [GeminiService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<div class="flex min-h-screen bg-slate-50 font-['Plus_Jakarta_Sans'] text-slate-900">
  
  <!-- SIDEBAR -->
  <aside 
    class="fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 shadow-sm"
    [class.-translate-x-full]="!isSidebarOpen()"
  >
    <div class="h-full flex flex-col p-6">
      <div class="flex items-center gap-3 mb-10 px-2">
        <div class="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-200">F</div>
        <span class="text-xl font-bold text-slate-900 tracking-tight">FluidMed</span>
      </div>

      <nav class="space-y-2 flex-1">
        <button 
          (click)="navigateTo('landing')"
          class="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold"
          [class]="gameState() === 'landing' ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50'"
        >
          <span class="text-lg">🏠</span> Dashboard
        </button>
        <button 
          (click)="navigateTo('theory')"
          class="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold"
          [class]="gameState() === 'theory' ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50'"
        >
          <span class="text-lg">📖</span> Ripasso Teoria
        </button>
        <button 
          (click)="navigateTo('quiz')"
          class="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold"
          [class]="gameState() === 'quiz' ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50'"
        >
          <span class="text-lg">✏️</span> Esercitazione (30 Q)
        </button>
      </nav>

      <div class="mt-auto pt-6 border-t border-slate-100">
        <div class="bg-slate-900 rounded-2xl p-4 text-white shadow-xl">
          <p class="text-[10px] text-slate-400 font-black uppercase mb-2 tracking-widest">Progressi Studio</p>
          <div class="flex justify-between items-end mb-2">
             <p class="font-bold text-sm">Medicina Anno I</p>
             <p class="text-xs text-blue-400 font-mono">{{ (score() / questions().length * 100).toFixed(0) }}%</p>
          </div>
          <div class="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
            <div class="h-full bg-blue-500 transition-all duration-1000" [style.width.%]="progress()"></div>
          </div>
        </div>
        <button 
          (click)="navigateTo('landing')"
          class="w-full mt-4 flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all font-bold text-sm"
        >
          <span>🚪</span> ESCI DAL MODULO
        </button>
      </div>
    </div>
  </aside>

  <!-- MOBILE OVERLAY -->
  @if (isSidebarOpen()) {
    <div (click)="toggleSidebar()" class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"></div>
  }

  <!-- MAIN CONTENT AREA -->
  <main class="flex-1 flex flex-col min-w-0 overflow-hidden relative">
    
    <!-- TOP HEADER -->
    <header class="h-16 flex items-center justify-between px-6 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30">
      <div class="flex items-center gap-4">
        <button (click)="toggleSidebar()" class="p-2 lg:hidden text-slate-600 hover:bg-slate-100 rounded-lg">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
        <div class="text-sm font-bold text-slate-500 uppercase tracking-tighter">
          @if (gameState() === 'theory') { Focus: Fluidostatica Medica }
          @else if (gameState() === 'quiz') { Sessione Esame: Quesito {{currentQuestionIndex() + 1}}/30 }
          @else { Pannello di Controllo }
        </div>
      </div>

      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2 bg-blue-100 px-4 py-1.5 rounded-full text-blue-700 text-xs font-black">
          <span class="animate-pulse">💎</span> {{ score() * 10 }} XP
        </div>
        <div class="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 border-2 border-white shadow-sm flex items-center justify-center text-white text-xs font-bold">
          DR
        </div>
      </div>
    </header>

    <!-- CONTENT -->
    <div class="flex-1 overflow-y-auto p-4 md:p-10">
      
      <!-- LANDING -->
      @if (gameState() === 'landing') {
        <div class="max-w-5xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div class="bg-gradient-to-br from-indigo-700 via-blue-600 to-blue-500 rounded-[3rem] p-10 md:p-16 text-white relative overflow-hidden shadow-2xl">
            <div class="relative z-10 max-w-2xl">
              <span class="inline-block px-4 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black mb-6 tracking-widest uppercase">Target 20-25 Anni | Medicina</span>
              <h1 class="text-5xl md:text-6xl font-black mb-6 leading-[1.1] tracking-tighter">Domina la Fisica dei Fluidi.</h1>
              <p class="text-blue-50 text-xl mb-10 opacity-90 font-medium max-w-lg">Preparazione intensiva per il test di Medicina e l'esame di Fisica Medica con simulazioni 3D e tutoraggio AI.</p>
              <div class="flex flex-wrap gap-4">
                <button (click)="startTheory()" class="px-8 py-4 bg-white text-blue-700 rounded-2xl font-black hover:scale-105 transition-all shadow-xl shadow-blue-900/20 active:scale-95">Inizia Ripasso</button>
                <button (click)="startQuiz()" class="px-8 py-4 bg-blue-900/40 text-white rounded-2xl font-black border border-white/30 hover:bg-blue-900/60 transition-all backdrop-blur-sm">Simulazione Test (30 Domande)</button>
              </div>
            </div>
            <div class="absolute -right-20 -top-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="group p-8 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer" (click)="navigateTo('theory')">
              <div class="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-amber-100 transition-colors">⚓</div>
              <h3 class="font-black text-slate-900 text-xl tracking-tight">Statica Clinica</h3>
              <p class="text-slate-500 mt-3 leading-relaxed">Archimede e Stevino applicati alla docimasia e pressione venosa.</p>
            </div>
            <div class="group p-8 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer" (click)="navigateTo('theory')">
              <div class="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-blue-100 transition-colors">💓</div>
              <h3 class="font-black text-slate-900 text-xl tracking-tight">Emodinamica</h3>
              <p class="text-slate-500 mt-3 leading-relaxed">Bernoulli, Poiseuille e la viscosità del sangue in circolo.</p>
            </div>
            <div class="group p-8 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer" (click)="navigateTo('quiz')">
              <div class="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-emerald-100 transition-colors">📈</div>
              <h3 class="font-black text-slate-900 text-xl tracking-tight">Quiz 30 Quesiti</h3>
              <p class="text-slate-500 mt-3 leading-relaxed">Verifica completa con spiegazioni dettagliate generate dall'AI.</p>
            </div>
          </div>
        </div>
      }

      <!-- THEORY SECTION -->
      @if (gameState() === 'theory') {
        <div class="max-w-4xl mx-auto animate-in slide-in-from-bottom-8 duration-700">
          <div class="flex items-center justify-between mb-10">
            <h2 class="text-4xl font-black text-slate-900 tracking-tighter">Modulo 1: Fondamenti dei Fluidi</h2>
            <button (click)="navigateTo('landing')" class="p-3 bg-white border border-slate-200 rounded-xl font-bold hover:bg-slate-50 transition-all text-slate-500 hover:text-red-500">
              Chiudi ✕
            </button>
          </div>
          
          <div class="space-y-8">
            <div class="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100">
               <h3 class="text-2xl font-black text-blue-600 mb-6 flex items-center gap-3">
                 <span class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-sm">1</span>
                 La Legge di Stevino
               </h3>
               <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                 <div class="prose prose-slate">
                   <p class="text-slate-600 text-lg leading-relaxed">
                     In un fluido ideale in equilibrio, la pressione aumenta linearmente con la profondità. Questo principio è cruciale per comprendere la <strong>circolazione gravitazionale</strong>.
                   </p>
                   <div class="bg-slate-50 p-6 rounded-2xl border-l-4 border-blue-500 my-6">
                      <code class="text-2xl font-black text-blue-800">P = P₀ + ρgh</code>
                   </div>
                   <p class="text-sm text-slate-500 italic">
                     Esempio: Una flebo deve essere sollevata rispetto al paziente per generare una pressione idrostatica (ρgh) superiore alla pressione venosa.
                   </p>
                 </div>
                 <app-fluid-lab subtopic="Stevin"></app-fluid-lab>
               </div>
            </div>

            <div class="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100">
               <h3 class="text-2xl font-black text-amber-600 mb-6 flex items-center gap-3">
                 <span class="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center text-sm">2</span>
                 Spinta di Archimede
               </h3>
               <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                  <div class="prose prose-slate">
                    <p class="text-slate-600 text-lg leading-relaxed">
                      Ogni corpo immerso in un fluido riceve una spinta verso l'alto pari al peso del volume di fluido spostato.
                    </p>
                    <div class="bg-amber-50 p-6 rounded-2xl border-l-4 border-amber-500 my-6">
                      <code class="text-2xl font-black text-amber-800">S = ρ_fluido · V_imm · g</code>
                    </div>
                    <p class="text-sm text-slate-500 italic">
                      Applicazione: La docimasia polmonare per verificare la respirazione neonatale tramite galleggiamento in acqua.
                    </p>
                  </div>
                  <app-fluid-lab subtopic="Archimede"></app-fluid-lab>
               </div>
            </div>
          </div>

          <div class="mt-12 text-center pb-20">
            <button (click)="startQuiz()" class="px-12 py-5 bg-slate-900 text-white rounded-[2rem] font-black text-xl hover:bg-blue-600 transition-all shadow-2xl hover:scale-105 active:scale-95">
              Mettiti alla prova (30 Domande)
            </button>
          </div>
        </div>
      }

      <!-- QUIZ SECTION -->
      @if (gameState() === 'quiz') {
        <div class="max-w-6xl mx-auto grid grid-cols-1 xl:grid-cols-12 gap-10 animate-in fade-in duration-500">
          
          <!-- LEFT: VISUAL LAB -->
          <div class="xl:col-span-4 order-2 xl:order-1 space-y-6">
            <div class="sticky top-24">
              <app-fluid-lab [subtopic]="currentQuestion().subtopic"></app-fluid-lab>
              
              <div class="mt-6 p-6 bg-white rounded-3xl border border-slate-200 shadow-sm">
                <h4 class="font-black text-slate-900 text-sm uppercase tracking-widest mb-3 italic">Clinical Hint</h4>
                <p class="text-xs text-slate-500 leading-relaxed font-medium">
                  @if (currentQuestion().subtopic === 'Stevin') { 
                    Considera sempre il dislivello 'h'. In medicina, 'h' può essere la distanza tra cuore e piedi in un paziente eretto.
                  } @else if (currentQuestion().subtopic === 'Archimede') {
                    Il volume spostato è la chiave. Densità acqua ≈ 1 g/cm³.
                  } @else {
                    Bernoulli: Velocità ↑ Pressione ↓. Poiseuille: Raggio vasi ⁴ (potenza quarta!).
                  }
                </p>
              </div>

              <button (click)="navigateTo('landing')" class="w-full mt-6 py-4 border-2 border-slate-200 text-slate-400 rounded-2xl font-bold hover:bg-red-50 hover:border-red-100 hover:text-red-500 transition-all text-sm uppercase">
                Annulla Esercitazione
              </button>
            </div>
          </div>

          <!-- RIGHT: QUESTION & ANSWERS -->
          <div class="xl:col-span-8 order-1 xl:order-2 space-y-6">
            <div class="bg-white rounded-[3rem] p-10 shadow-xl border border-slate-100">
              <div class="flex items-center justify-between mb-10">
                <div class="flex items-center gap-3">
                  <span class="px-4 py-1.5 bg-blue-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest">
                    {{ currentQuestion().subtopic }}
                  </span>
                  <span class="text-slate-400 font-bold text-xs">QUESITO {{currentQuestionIndex() + 1}}/30</span>
                </div>
                <div class="h-2 w-32 bg-slate-100 rounded-full overflow-hidden">
                  <div class="h-full bg-blue-600 transition-all duration-700" [style.width.%]="progress()"></div>
                </div>
              </div>

              <h2 class="text-3xl md:text-4xl font-black text-slate-900 leading-[1.15] mb-10 tracking-tight">
                {{ currentQuestion().question }}
              </h2>

              <div class="grid grid-cols-1 gap-4">
                @for (option of currentQuestion().options; track $index) {
                  <button 
                    (click)="selectOption($index)"
                    [disabled]="hasAnswered()"
                    class="group relative p-6 text-left border-2 rounded-[1.5rem] transition-all duration-300"
                    [class.border-slate-100]="!hasAnswered() || (selectedOption() !== $index && currentQuestion().correctAnswer !== $index)"
                    [class.hover:border-blue-400]="!hasAnswered()"
                    [class.hover:bg-blue-50]="!hasAnswered()"
                    [class.border-green-500]="hasAnswered() && currentQuestion().correctAnswer === $index"
                    [class.bg-green-50]="hasAnswered() && currentQuestion().correctAnswer === $index"
                    [class.border-red-500]="hasAnswered() && selectedOption() === $index && currentQuestion().correctAnswer !== $index"
                    [class.bg-red-50]="hasAnswered() && selectedOption() === $index && currentQuestion().correctAnswer !== $index"
                  >
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-4">
                        <div class="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 font-black group-hover:bg-white transition-colors">
                           {{ ['A', 'B', 'C', 'D'][$index] }}
                        </div>
                        <span class="font-bold text-slate-700 pr-4 leading-tight">{{ option }}</span>
                      </div>
                      @if (hasAnswered() && currentQuestion().correctAnswer === $index) { 
                        <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg">✓</div>
                      }
                    </div>
                  </button>
                }
              </div>

              @if (hasAnswered()) {
                <div class="mt-10 p-10 rounded-[2.5rem] bg-slate-900 text-white shadow-2xl animate-in slide-in-from-top-6 duration-500 relative overflow-hidden">
                  <div class="relative z-10">
                    <div class="flex items-center gap-3 mb-6">
                      <span class="text-3xl">🤖</span>
                      <h4 class="font-black uppercase text-sm tracking-[0.2em] text-blue-400">Analisi Gemini AI</h4>
                    </div>
                    
                    @if (loadingAi()) {
                      <div class="flex items-center gap-4 text-slate-300 italic font-medium">
                        <div class="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        Il tuo tutor sta elaborando la correzione clinica...
                      </div>
                    } @else {
                      <p class="text-xl leading-relaxed font-serif italic text-blue-50">"{{ aiExplanation() }}"</p>
                    }

                    <button 
                      (click)="nextQuestion()"
                      class="w-full mt-10 py-5 bg-white text-slate-900 rounded-2xl font-black text-lg hover:bg-blue-500 hover:text-white transition-all shadow-xl active:scale-95"
                    >
                      {{ currentQuestionIndex() === questions().length - 1 ? 'Vedi Report Finale' : 'Prossimo Quesito' }}
                    </button>
                  </div>
                  <!-- Background Glow -->
                  <div class="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
                </div>
              }
            </div>
          </div>
        </div>
      }

      <!-- RESULT SCREEN -->
      @if (gameState() === 'result') {
        <div class="max-w-4xl mx-auto text-center py-20 animate-in zoom-in-95 duration-1000">
          <div class="inline-block p-10 rounded-[4rem] bg-white shadow-2xl mb-12 border border-slate-50">
            <div class="text-8xl mb-8">🩺</div>
            <h2 class="text-5xl font-black text-slate-900 mb-4 tracking-tighter uppercase">Modulo Superato</h2>
            <p class="text-slate-500 text-xl font-medium">Hai dimostrato ottime basi di fisica medica applicata.</p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 px-10">
            <div class="p-10 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm">
              <div class="text-5xl font-black text-blue-600 mb-2">{{ score() }}</div>
              <div class="text-xs font-black text-slate-400 uppercase tracking-widest">Risposte Esatte</div>
            </div>
            <div class="p-10 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm">
              <div class="text-5xl font-black text-indigo-500 mb-2">{{ (score() / questions().length * 100).toFixed(0) }}%</div>
              <div class="text-xs font-black text-slate-400 uppercase tracking-widest">Precisione</div>
            </div>
            <div class="p-10 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm">
              <div class="text-5xl font-black text-emerald-500 mb-2">{{ score() * 10 }}</div>
              <div class="text-xs font-black text-slate-400 uppercase tracking-widest">XP Guadagnati</div>
            </div>
          </div>

          <div class="flex flex-col md:flex-row gap-6 justify-center items-center px-10">
             <button (click)="navigateTo('landing')" class="w-full md:w-auto px-16 py-6 bg-slate-900 text-white rounded-[2rem] font-black text-xl hover:bg-slate-800 transition-all shadow-2xl hover:scale-105">
               Torna alla Home
             </button>
             <button (click)="startQuiz()" class="w-full md:w-auto px-16 py-6 border-4 border-slate-200 text-slate-400 rounded-[2rem] font-black text-xl hover:bg-white hover:text-blue-600 transition-all">
               Riprova Test
             </button>
          </div>
        </div>
      }
    </div>
  </main>
</div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class AppComponent {
  private gemini = inject(GeminiService);

  gameState = signal<'landing' | 'theory' | 'quiz' | 'result'>('landing');
  isSidebarOpen = signal(false);

  currentQuestionIndex = signal(0);
  score = signal(0);
  selectedOption = signal<number | null>(null);
  hasAnswered = signal(false);
  isCorrect = signal(false);
  aiExplanation = signal<string>('');
  loadingAi = signal(false);

  questions = signal<Question[]>(QUESTIONS);
  currentQuestion = computed(() => this.questions()[this.currentQuestionIndex()]);
  progress = computed(() => ((this.currentQuestionIndex() + 1) / this.questions().length) * 100);

  toggleSidebar() {
    this.isSidebarOpen.update(v => !v);
  }

  navigateTo(state: 'landing' | 'theory' | 'quiz' | 'result') {
    if (state === 'quiz') {
      this.resetAnswerState();
      this.currentQuestionIndex.set(0);
      this.score.set(0);
    }
    this.gameState.set(state);
    this.isSidebarOpen.set(false);
  }

  startTheory() { this.navigateTo('theory'); }
  startQuiz() { this.navigateTo('quiz'); }

  async selectOption(index: number) {
    if (this.hasAnswered()) return;

    this.selectedOption.set(index);
    this.hasAnswered.set(true);
    
    const correct = index === this.currentQuestion().correctAnswer;
    this.isCorrect.set(correct);
    if (correct) {
      this.score.update(s => s + 1);
    }

    this.loadingAi.set(true);
    const expl = await this.gemini.getDetailedExplanation(
      this.currentQuestion().topic,
      this.currentQuestion().question,
      this.currentQuestion().options[index],
      correct
    );
    this.aiExplanation.set(expl);
    this.loadingAi.set(false);
  }

  nextQuestion() {
    if (this.currentQuestionIndex() < this.questions().length - 1) {
      this.currentQuestionIndex.update(i => i + 1);
      this.resetAnswerState();
    } else {
      this.gameState.set('result');
    }
  }

  resetAnswerState() {
    this.selectedOption.set(null);
    this.hasAnswered.set(false);
    this.aiExplanation.set('');
  }
}

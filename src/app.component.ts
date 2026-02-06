
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
          <span class="text-lg">✏️</span> Quiz (30 Quesiti)
        </button>
      </nav>

      <div class="mt-auto pt-6 border-t border-slate-100">
        <div class="bg-slate-900 rounded-2xl p-4 text-white shadow-xl mb-4">
          <p class="text-[10px] text-slate-400 font-black uppercase mb-2 tracking-widest text-center">Progresso Modulo</p>
          <div class="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
            <div class="h-full bg-blue-500 transition-all duration-1000" [style.width.%]="progress()"></div>
          </div>
        </div>
        
        <!-- VOCE RIPRISTINATA: ESCI -->
        <button 
          (click)="navigateTo('landing')"
          class="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all font-bold"
        >
          <span class="text-lg">🚪</span> Esci dal Corso
        </button>
      </div>
    </div>
  </aside>

  <!-- MOBILE OVERLAY -->
  @if (isSidebarOpen()) {
    <div (click)="toggleSidebar()" class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"></div>
  }

  <!-- MAIN CONTENT -->
  <main class="flex-1 flex flex-col min-w-0 overflow-hidden relative">
    <header class="h-16 flex items-center justify-between px-6 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30">
      <button (click)="toggleSidebar()" class="p-2 lg:hidden text-slate-600 hover:bg-slate-100 rounded-lg">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
      </button>
      <div class="flex items-center gap-4">
        <div class="text-xs font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{{ score() }} / 30 CORRETTE</div>
      </div>
    </header>

    <div class="flex-1 overflow-y-auto p-4 md:p-10">
      @if (gameState() === 'landing') {
        <div class="max-w-5xl mx-auto space-y-12 py-10">
          <!-- HERO -->
          <div class="bg-blue-600 rounded-[3rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
            <div class="relative z-10">
              <h1 class="text-4xl md:text-5xl font-black mb-6 tracking-tighter leading-none">Fisica Medica: Fluidi.</h1>
              <p class="text-blue-100 text-lg md:text-xl mb-10 max-w-lg">Preparazione mirata per il primo anno di Medicina con tutoraggio AI basato su Gemini 2.5 Flash.</p>
              <div class="flex flex-wrap gap-4">
                <button (click)="startTheory()" class="px-8 py-4 bg-white text-blue-600 rounded-2xl font-bold shadow-lg hover:scale-105 transition-all">Inizia Teoria</button>
                <button (click)="startQuiz()" class="px-8 py-4 bg-blue-900/40 text-white rounded-2xl font-bold border border-white/20 hover:bg-blue-900/60 transition-all">Test 30 Quesiti</button>
              </div>
            </div>
          </div>

          <!-- 3-CARD LAYOUT RIPRISTINATO -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="p-8 bg-white rounded-3xl border border-slate-200 hover:shadow-xl transition-all cursor-pointer group" (click)="startTheory()">
              <div class="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">⚖️</div>
              <h3 class="font-bold text-xl text-slate-900">Archimede</h3>
              <p class="text-slate-500 text-sm mt-2">Dalla densità polmonare al galleggiamento dei tessuti nel corpo umano.</p>
            </div>
            
            <div class="p-8 bg-white rounded-3xl border border-slate-200 hover:shadow-xl transition-all cursor-pointer group" (click)="startTheory()">
              <div class="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">🌡️</div>
              <h3 class="font-bold text-xl text-slate-900">Statica e Stevino</h3>
              <p class="text-slate-500 text-sm mt-2">Pressione arteriosa, flebo e gradienti gravitazionali nell'emodinamica.</p>
            </div>

            <div class="p-8 bg-white rounded-3xl border border-slate-200 hover:shadow-xl transition-all cursor-pointer group" (click)="startQuiz()">
              <div class="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">🧠</div>
              <h3 class="font-bold text-xl text-slate-900">Simulazione Esame</h3>
              <p class="text-slate-500 text-sm mt-2">30 quesiti selezionati con feedback AI in tempo reale per la tua preparazione.</p>
            </div>
          </div>
        </div>
      }

      @if (gameState() === 'theory') {
        <div class="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom duration-500">
          <h2 class="text-4xl font-black tracking-tighter">Modulo Teorico</h2>
          <div class="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm space-y-10">
             <section class="prose prose-slate">
                <h3 class="text-2xl font-bold text-blue-600">Principio di Stevino</h3>
                <p class="text-slate-600 leading-relaxed text-lg">In un fluido ideale la pressione aumenta con la profondità: <span class="font-mono bg-slate-100 px-2 py-1 rounded">P = P0 + ρgh</span>. Fondamentale per capire perché la pressione arteriosa cambia tra cuore e piedi.</p>
                <app-fluid-lab subtopic="Stevin"></app-fluid-lab>
             </section>
          </div>
          <button (click)="startQuiz()" class="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-xl hover:bg-blue-600 transition-all shadow-xl">Passa al Quiz di Verifica</button>
        </div>
      }

      @if (gameState() === 'quiz') {
        <div class="max-w-5xl mx-auto grid grid-cols-1 xl:grid-cols-12 gap-10">
          <div class="xl:col-span-4 space-y-6 order-2 xl:order-1">
             <app-fluid-lab [subtopic]="currentQuestion().subtopic"></app-fluid-lab>
          </div>
          <div class="xl:col-span-8 order-1 xl:order-2 space-y-6">
            <div class="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-100">
               <div class="mb-8 flex justify-between items-center">
                 <span class="text-[10px] font-black uppercase tracking-widest text-blue-500 bg-blue-50 px-3 py-1 rounded-full">DOMANDA {{currentQuestionIndex() + 1}} / 30</span>
                 <div class="w-24 h-1 bg-slate-100 rounded-full overflow-hidden">
                    <div class="h-full bg-blue-500" [style.width.%]="progress()"></div>
                 </div>
               </div>
               <h2 class="text-3xl font-bold mb-10 leading-tight">{{ currentQuestion().question }}</h2>
               <div class="grid gap-4">
                 @for (opt of currentQuestion().options; track $index) {
                   <button 
                    (click)="selectOption($index)"
                    [disabled]="hasAnswered()"
                    class="p-6 text-left border-2 rounded-2xl transition-all font-medium"
                    [class.border-slate-100]="!hasAnswered()"
                    [class.border-green-500]="hasAnswered() && currentQuestion().correctAnswer === $index"
                    [class.bg-green-50]="hasAnswered() && currentQuestion().correctAnswer === $index"
                    [class.border-red-500]="hasAnswered() && selectedOption() === $index && currentQuestion().correctAnswer !== $index"
                   >
                     {{ opt }}
                   </button>
                 }
               </div>

               @if (hasAnswered()) {
                 <div class="mt-8 p-8 bg-slate-900 rounded-3xl text-white animate-in zoom-in-95 duration-300">
                    <div class="flex items-center gap-2 mb-4">
                      <span class="text-2xl">🪄</span>
                      <span class="text-xs font-black uppercase tracking-widest text-blue-400">Tutor Gemini Flash</span>
                    </div>
                    @if (loadingAi()) {
                      <div class="flex items-center gap-3 text-slate-400 italic">
                        <div class="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                        Analisi clinica in corso...
                      </div>
                    } @else {
                      <p class="text-lg leading-relaxed font-serif italic">"{{ aiExplanation() }}"</p>
                    }
                    <button (click)="nextQuestion()" class="w-full mt-8 py-4 bg-white text-slate-900 rounded-xl font-black hover:bg-blue-400 hover:text-white transition-all shadow-lg">Continua</button>
                 </div>
               }
            </div>
          </div>
        </div>
      }

      @if (gameState() === 'result') {
        <div class="max-w-2xl mx-auto text-center py-20 space-y-8 animate-in zoom-in-95">
          <div class="text-7xl">🩺</div>
          <h2 class="text-5xl font-black tracking-tighter">Test Completato!</h2>
          <div class="text-3xl font-bold text-blue-600">Punteggio: {{ score() }} / 30</div>
          <p class="text-slate-500">Ottimo lavoro! La tua comprensione della fluidodinamica medica sta progredendo.</p>
          <button (click)="navigateTo('landing')" class="px-12 py-5 bg-slate-900 text-white rounded-2xl font-black hover:scale-105 transition-all shadow-2xl">Ricomincia Percorso</button>
        </div>
      }
    </div>
  </main>
</div>
  `,
  styles: [`:host { display: block; }`]
})
export class AppComponent {
  private gemini = inject(GeminiService);
  gameState = signal<'landing' | 'theory' | 'quiz' | 'result'>('landing');
  isSidebarOpen = signal(false);
  currentQuestionIndex = signal(0);
  score = signal(0);
  selectedOption = signal<number | null>(null);
  hasAnswered = signal(false);
  aiExplanation = signal<string>('');
  loadingAi = signal(false);
  questions = signal<Question[]>(QUESTIONS);
  currentQuestion = computed(() => this.questions()[this.currentQuestionIndex()]);
  progress = computed(() => ((this.currentQuestionIndex() + 1) / this.questions().length) * 100);

  toggleSidebar() { this.isSidebarOpen.update(v => !v); }
  navigateTo(state: 'landing' | 'theory' | 'quiz' | 'result') {
    if (state === 'quiz') { this.resetQuiz(); }
    this.gameState.set(state);
    this.isSidebarOpen.set(false);
  }
  startTheory() { this.navigateTo('theory'); }
  startQuiz() { this.navigateTo('quiz'); }
  resetQuiz() {
    this.currentQuestionIndex.set(0);
    this.score.set(0);
    this.resetAnswerState();
  }
  async selectOption(index: number) {
    if (this.hasAnswered()) return;
    this.selectedOption.set(index);
    this.hasAnswered.set(true);
    const correct = index === this.currentQuestion().correctAnswer;
    if (correct) this.score.update(s => s + 1);
    this.loadingAi.set(true);
    this.aiExplanation.set(await this.gemini.getDetailedExplanation(
      this.currentQuestion().topic,
      this.currentQuestion().question,
      this.currentQuestion().options[index],
      correct
    ));
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


export interface Question {
  id: number;
  topic: string;
  subtopic: 'Stevin' | 'Archimede' | 'Fluidodinamica';
  question: string;
  options: string[];
  correctAnswer: number;
  baseExplanation: string;
  medicalContext: string;
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    topic: 'Fluidostatica',
    subtopic: 'Stevin',
    question: "In un paziente in piedi, la pressione venosa ai piedi rispetto al cuore è:",
    options: ["Maggiore di circa 90 mmHg", "Minore per gravità", "Uguale", "Zero"],
    correctAnswer: 0,
    baseExplanation: "P = rho*g*h",
    medicalContext: "Spiega l'edema declive."
  },
  {
    id: 2,
    topic: 'Fluidostatica',
    subtopic: 'Archimede',
    question: "Un polmone sano galleggia in acqua perché:",
    options: ["La sua densità è < 1 g/cm³", "È fatto di muscolo", "L'aria non pesa", "Per osmosi"],
    correctAnswer: 0,
    baseExplanation: "S > P",
    medicalContext: "Docimasia idrostatica."
  },
  {
    id: 3,
    topic: 'Fluidodinamica',
    subtopic: 'Fluidodinamica',
    question: "Se il raggio di un'arteria si dimezza, la resistenza al flusso (Poiseuille):",
    options: ["Aumenta di 16 volte", "Raddoppia", "Si dimezza", "Resta uguale"],
    correctAnswer: 0,
    baseExplanation: "R proporzionale a 1/r⁴",
    medicalContext: "Ipertensione da stenosi."
  },
  {
    id: 4,
    topic: 'Fluidostatica',
    subtopic: 'Stevin',
    question: "Una flebo posta a 1.36m di altezza genera una pressione di circa:",
    options: ["100 mmHg", "10 mmHg", "1000 mmHg", "1 mmHg"],
    correctAnswer: 0,
    baseExplanation: "h=1.36m H2O = 100 mmHg",
    medicalContext: "Pressione di infusione."
  },
  {
    id: 5,
    topic: 'Fluidodinamica',
    subtopic: 'Fluidodinamica',
    question: "L'effetto Venturi spiega perché in una stenosi arteriosa:",
    options: ["La pressione laterale diminuisce", "La velocità diminuisce", "Il sangue si ferma", "La pressione aumenta"],
    correctAnswer: 0,
    baseExplanation: "Bernoulli",
    medicalContext: "Aneurismi e stenosi."
  },
  {
    id: 6,
    topic: 'Fluidostatica',
    subtopic: 'Archimede',
    question: "La spinta di Archimede su un corpo immerso dipende da:",
    options: ["Volume spostato", "Peso del corpo", "Forma del corpo", "Colore del fluido"],
    correctAnswer: 0,
    baseExplanation: "S = rho*V*g",
    medicalContext: "Galleggiamento organi."
  },
  {
    id: 7,
    topic: 'Fluidodinamica',
    subtopic: 'Fluidodinamica',
    question: "Il numero di Reynolds indica se un flusso è:",
    options: ["Laminare o turbolento", "Veloce o lento", "Caldo o freddo", "Denso o fluido"],
    correctAnswer: 0,
    baseExplanation: "Re = rho*v*d/eta",
    medicalContext: "Soffi cardiaci."
  },
  {
    id: 8,
    topic: 'Fluidostatica',
    subtopic: 'Stevin',
    question: "La pressione idrostatica agisce:",
    options: ["In tutte le direzioni", "Solo verso il basso", "Solo lateralmente", "Solo verso l'alto"],
    correctAnswer: 0,
    baseExplanation: "Legge di Pascal",
    medicalContext: "Pressione intra-addominale."
  },
  {
    id: 9,
    topic: 'Fluidostatica',
    subtopic: 'Stevin',
    question: "Se la densità di un fluido aumenta, la pressione a parità di h:",
    options: ["Aumenta", "Diminuisce", "Resta uguale", "Scompare"],
    correctAnswer: 0,
    baseExplanation: "P = rho*g*h",
    medicalContext: "Liquido radiopaco."
  },
  {
    id: 10,
    topic: 'Fluidodinamica',
    subtopic: 'Fluidodinamica',
    question: "La viscosità del sangue dipende principalmente da:",
    options: ["Ematocrito", "Colesterolo", "Globuli bianchi", "Piastrine"],
    correctAnswer: 0,
    baseExplanation: "Ematocrito influenza eta",
    medicalContext: "Policitemia."
  },
  {
    id: 11,
    topic: 'Fluidostatica',
    subtopic: 'Archimede',
    question: "Un subacqueo che gonfia il GAV aumenta il volume e quindi:",
    options: ["Aumenta la spinta", "Affonda", "Pesa di più", "Diminuisce la pressione"],
    correctAnswer: 0,
    baseExplanation: "V aumenta -> S aumenta",
    medicalContext: "Embolia gassosa."
  },
  {
    id: 12,
    topic: 'Fluidodinamica',
    subtopic: 'Fluidodinamica',
    question: "In un condotto a sezione variabile, la portata è:",
    options: ["Costante", "Variabile", "Crescente", "Decrescente"],
    correctAnswer: 0,
    baseExplanation: "Equazione continuità",
    medicalContext: "Portata cardiaca."
  },
  {
    id: 13,
    topic: 'Fluidostatica',
    subtopic: 'Stevin',
    question: "Qual è l'unità di misura della pressione nel SI?",
    options: ["Pascal", "mmHg", "Bar", "Atmosfere"],
    correctAnswer: 0,
    baseExplanation: "1 Pa = 1 N/m²",
    medicalContext: "Standard internazionali."
  },
  {
    id: 14,
    topic: 'Fluidodinamica',
    subtopic: 'Fluidodinamica',
    question: "La legge di Poiseuille è valida per:",
    options: ["Flusso laminare", "Flusso turbolento", "Gas perfetti", "Fluidi ideali"],
    correctAnswer: 0,
    baseExplanation: "Viscosità costante",
    medicalContext: "Microcircolo."
  },
  {
    id: 15,
    topic: 'Fluidostatica',
    subtopic: 'Archimede',
    question: "Se un corpo affonda, la sua densità è:",
    options: ["Maggiore del fluido", "Minore del fluido", "Uguale", "Zero"],
    correctAnswer: 0,
    baseExplanation: "P > S",
    medicalContext: "Sedimentazione."
  },
  {
    id: 16,
    topic: 'Fluidostatica',
    subtopic: 'Stevin',
    question: "La pressione atmosferica a livello del mare è circa:",
    options: ["760 mmHg", "100 mmHg", "10 mmHg", "1000 Pa"],
    correctAnswer: 0,
    baseExplanation: "Esperimento Torricelli",
    medicalContext: "Respirazione."
  },
  {
    id: 17,
    topic: 'Fluidodinamica',
    subtopic: 'Fluidodinamica',
    question: "La tensione superficiale negli alveoli è ridotta da:",
    options: ["Surfante", "Ossigeno", "Acqua", "Azoto"],
    correctAnswer: 0,
    baseExplanation: "Legge di Laplace",
    medicalContext: "Atelectasia."
  },
  {
    id: 18,
    topic: 'Fluidostatica',
    subtopic: 'Archimede',
    question: "La bilancia idrostatica misura:",
    options: ["La densità", "La massa", "La velocità", "La pressione"],
    correctAnswer: 0,
    baseExplanation: "Variazione peso apparente",
    medicalContext: "Composizione corporea."
  },
  {
    id: 19,
    topic: 'Fluidodinamica',
    subtopic: 'Fluidodinamica',
    question: "Un fluido non viscoso è detto:",
    options: ["Ideale", "Reale", "Newtoniano", "Plasmatico"],
    correctAnswer: 0,
    baseExplanation: "Assenza attriti interni",
    medicalContext: "Approssimazione Bernoulli."
  },
  {
    id: 20,
    topic: 'Fluidostatica',
    subtopic: 'Stevin',
    question: "In una siringa, la pressione applicata si trasmette:",
    options: ["Integralmente (Pascal)", "Solo alla punta", "Si dimezza", "Si perde"],
    correctAnswer: 0,
    baseExplanation: "Trasmissione pressione",
    medicalContext: "Iniezione."
  },
  {
    id: 21,
    topic: 'Fluidostatica',
    subtopic: 'Archimede',
    question: "Perché l'edema polmonare ostacola gli scambi?",
    options: ["Aumenta densità alveolare", "Diminuisce pressione", "Aumenta velocità", "È freddo"],
    correctAnswer: 0,
    baseExplanation: "Liquido negli alveoli",
    medicalContext: "Insufficienza respiratoria."
  },
  {
    id: 22,
    topic: 'Fluidodinamica',
    subtopic: 'Fluidodinamica',
    question: "La velocità critica di Reynolds dipende da:",
    options: ["Raggio del vaso", "Colore del sangue", "Temperatura esterna", "Pressione arteriosa"],
    correctAnswer: 0,
    baseExplanation: "v_crit = Re*eta/(rho*r)",
    medicalContext: "Turbine aortico."
  },
  {
    id: 23,
    topic: 'Fluidostatica',
    subtopic: 'Stevin',
    question: "La pressione di 1 cmH2O equivale a circa:",
    options: ["0.74 mmHg", "10 mmHg", "1 mmHg", "100 Pa"],
    correctAnswer: 0,
    baseExplanation: "Conversione unità",
    medicalContext: "Pressione venosa centrale."
  },
  {
    id: 24,
    topic: 'Fluidodinamica',
    subtopic: 'Fluidodinamica',
    question: "Il sangue è un fluido:",
    options: ["Non Newtoniano", "Newtoniano", "Ideale", "Gassoso"],
    correctAnswer: 0,
    baseExplanation: "Viscosità variabile",
    medicalContext: "Fisica del sangue."
  },
  {
    id: 25,
    topic: 'Fluidostatica',
    subtopic: 'Archimede',
    question: "La spinta di Archimede in assenza di gravità è:",
    options: ["Zero", "Massima", "Invariata", "Infinita"],
    correctAnswer: 0,
    baseExplanation: "g=0 -> S=0",
    medicalContext: "Medicina spaziale."
  },
  {
    id: 26,
    topic: 'Fluidodinamica',
    subtopic: 'Fluidodinamica',
    question: "L'ematocrito alto rende il sangue:",
    options: ["Più viscoso", "Meno viscoso", "Più veloce", "Più diluito"],
    correctAnswer: 0,
    baseExplanation: "Attrito interno aumenta",
    medicalContext: "Doping e salute."
  },
  {
    id: 27,
    topic: 'Fluidostatica',
    subtopic: 'Stevin',
    question: "La pressione esercitata dal peso della testa sul collo è:",
    options: ["Pressione meccanica", "Idrostatica", "Dinamica", "Osmotica"],
    correctAnswer: 0,
    baseExplanation: "Forza/Area",
    medicalContext: "Ortopedia."
  },
  {
    id: 28,
    topic: 'Fluidodinamica',
    subtopic: 'Fluidodinamica',
    question: "Se la velocità raddoppia, la pressione dinamica:",
    options: ["Quadruplica", "Raddoppia", "Resta uguale", "Dimezza"],
    correctAnswer: 0,
    baseExplanation: "1/2 rho v²",
    medicalContext: "Carico sulle valvole."
  },
  {
    id: 29,
    topic: 'Fluidostatica',
    subtopic: 'Archimede',
    question: "Un embolo gassoso sale verso l'alto per:",
    options: ["Archimede", "Stevino", "Venturi", "Poiseuille"],
    correctAnswer: 0,
    baseExplanation: "Densità gas << sangue",
    medicalContext: "Embolia gassosa."
  },
  {
    id: 30,
    topic: 'Fluidodinamica',
    subtopic: 'Fluidodinamica',
    question: "La legge di Laplace (P=2T/r) spiega:",
    options: ["Stabilità alveolare", "Pressione venosa", "Galleggiamento", "Velocità sangue"],
    correctAnswer: 0,
    baseExplanation: "Pressione, tensione, raggio",
    medicalContext: "Sindrome distress respiratorio."
  }
];

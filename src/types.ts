export interface StepItem {
  step: string;
  correct: boolean;
  notes: string;
}

export interface QuestionEvaluation {
  questionNumber: number;
  questionText: string;
  maxMarks: number;
  awardedMarks: number;
  studentSolutionExtracted: string;
  conceptAssessed: string;
  isConceptCorrect: boolean;
  feedback: string;
  stepBreakdown: StepItem[];
}

export interface ConceptMasteryItem {
  concept: string;
  score: number;
  status: "Mastered" | "Proficient" | "Needs Review" | "Critical Gap";
}

export interface PracticeRecommendation {
  topic: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Medium-Hard";
  sampleQuestion: string;
}

export interface EvaluationResult {
  studentName: string;
  subject: string;
  topic: string;
  overallScore: number;
  maxScore: number;
  percentage: number;
  grade: string;
  confidenceScore: number;
  summaryFeedback: string;
  strengths: string[];
  weaknesses: string[];
  conceptMastery: ConceptMasteryItem[];
  questions: QuestionEvaluation[];
  targetedPracticeRecommendations: PracticeRecommendation[];
  teacherNotes: string;
}

export interface SampleExamPaper {
  id: string;
  title: string;
  subject: string;
  topic: string;
  studentName: string;
  gradeLevel: string;
  handwrittenPreview: string; // SVG or Canvas drawing representation
  questionPrompt: string;
  rubric: string;
  defaultResult: EvaluationResult;
}

export interface PracticeProblem {
  id: string;
  question: string;
  difficulty: "Easy" | "Medium" | "Hard";
  conceptFocus: string;
  hint: string;
  stepByStepSolution: string[];
  correctAnswer: string;
  userAnswer?: string;
  isSubmitted?: boolean;
}

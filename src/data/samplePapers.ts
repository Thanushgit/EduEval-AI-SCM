import { SampleExamPaper } from "../types";

export const SAMPLE_PAPERS: SampleExamPaper[] = [
  {
    id: "math-quadratics",
    title: "Mid-Term Math Exam: Quadratic Equations & Parabolas",
    subject: "Mathematics",
    topic: "Quadratic Equations, Discriminants & Vertex Form",
    studentName: "A. Khan",
    gradeLevel: "Grade 10 - Advanced Math",
    questionPrompt: "Section A: 1. Factorize 2x² + 5x - 3 = 0. 2. Find discriminant of 3x² - 4x + 2 = 0. 3. Convert y = x² - 6x + 5 into vertex form.",
    rubric: "10 pts each. Credit for deductive reasoning, factoring by grouping, accurate discriminant sign classification, and completing the square.",
    handwrittenPreview: "math-paper-khan",
    defaultResult: {
      studentName: "A. Khan",
      subject: "Mathematics",
      topic: "Quadratic Equations & Parabolas",
      overallScore: 28,
      maxScore: 30,
      percentage: 93,
      grade: "A",
      confidenceScore: 98,
      summaryFeedback: "Strong analytical grasp of quadratic decomposition and discriminant behavior. Shows clean intermediate working with clear deductive flow.",
      strengths: [
        "Flawless application of factoring by grouping without skipping intermediate steps",
        "Exact classification of non-real roots using negative discriminant evaluation",
        "Structured completion of the square to isolate vertex coordinates"
      ],
      weaknesses: [
        "Minor lack of explicit axis of symmetry definition statement in Question 3",
        "Could include domain constraints for quadratic functions"
      ],
      conceptMastery: [
        { concept: "Factoring & Grouping", score: 100, status: "Mastered" },
        { concept: "Discriminant & Nature of Roots", score: 95, status: "Mastered" },
        { concept: "Completing the Square & Vertex", score: 85, status: "Proficient" },
        { concept: "Algebraic Deductive Rigor", score: 92, status: "Mastered" }
      ],
      questions: [
        {
          questionNumber: 1,
          questionText: "Solve the quadratic equation: 2x² + 5x - 3 = 0 using factorization.",
          maxMarks: 10,
          awardedMarks: 10,
          studentSolutionExtracted: "2x² + 6x - x - 3 = 0\n2x(x + 3) - 1(x + 3) = 0\n(2x - 1)(x + 3) = 0\nx = 1/2 or x = -3",
          conceptAssessed: "Factoring quadratic polynomials by grouping",
          isConceptCorrect: true,
          feedback: "Q1: Excellent reasoning! Proper split of middle term (6x, -x) and clean grouping into (2x-1)(x+3).",
          stepBreakdown: [
            { step: "Split middle term into 6x - x", correct: true, notes: "Correct product sum (ac = -6, b = 5)" },
            { step: "Grouped terms 2x(x+3) - (x+3)", correct: true, notes: "Identified common binomial factor" },
            { step: "Zero product property (2x-1)(x+3)=0", correct: true, notes: "Correct solutions x = 1/2, x = -3" }
          ]
        },
        {
          questionNumber: 2,
          questionText: "Determine the discriminant and nature of roots for 3x² - 4x + 2 = 0.",
          maxMarks: 10,
          awardedMarks: 10,
          studentSolutionExtracted: "a = 3, b = -4, c = 2\nΔ = b² - 4ac = (-4)² - 4(3)(2)\nΔ = 16 - 24 = -8\nSince Δ < 0, roots are complex conjugates (non-real).",
          conceptAssessed: "Discriminant calculation and root classification",
          isConceptCorrect: true,
          feedback: "Q2: Accurate calculation of negative discriminant Δ = -8 and sound conceptual interpretation of complex roots.",
          stepBreakdown: [
            { step: "Identified coefficients accurately", correct: true, notes: "a=3, b=-4, c=2" },
            { step: "Computed Δ = 16 - 24 = -8", correct: true, notes: "Precise arithmetic" },
            { step: "Stated root behavior (non-real / complex)", correct: true, notes: "Mathematically rigorous terminology" }
          ]
        },
        {
          questionNumber: 3,
          questionText: "Find the vertex and axis of symmetry of y = x² - 6x + 5 by completing the square.",
          maxMarks: 10,
          awardedMarks: 8,
          studentSolutionExtracted: "y = (x - 3)² - 9 + 5\ny = (x - 3)² - 4\nVertex = (3, -4)",
          conceptAssessed: "Completing the square & vertex form",
          isConceptCorrect: true,
          feedback: "Q3: Good algebraic manipulation. Correct vertex coordinates (3, -4). Did not explicitly write axis equation x = 3.",
          stepBreakdown: [
            { step: "Computed (b/2)² = (-3)² = 9", correct: true, notes: "Half-linear coefficient squared" },
            { step: "Transformed to vertex form (x-3)² - 4", correct: true, notes: "Simplified constant terms accurately" },
            { step: "Stated vertex (3, -4)", correct: true, notes: "Coordinates extracted properly" }
          ]
        }
      ],
      targetedPracticeRecommendations: [
        {
          topic: "Discriminant with Parameter Bounds",
          description: "Solve for parameter 'k' in quadratic equations with single repeated root condition",
          difficulty: "Medium",
          sampleQuestion: "For what values of k does 4x² + kx + 9 = 0 have exactly one real root?"
        },
        {
          topic: "Parabola Word Problem Modeling",
          description: "Translating real-world kinematics trajectory into vertex coordinate pairs",
          difficulty: "Medium-Hard",
          sampleQuestion: "A ball thrown upwards follows h(t) = -4.9t² + 19.6t + 1. Find time to maximum height."
        }
      ],
      teacherNotes: "Strong overall performance. Student demonstrates deep concept retention. Ready for advanced polynomial roots & calculus derivatives."
    }
  },
  {
    id: "physics-mechanics",
    title: "Physics Unit Exam: Newton's Laws & Friction",
    subject: "Physics",
    topic: "Classical Mechanics, Free Body Diagrams & Incline Planes",
    studentName: "S. Patel",
    gradeLevel: "Grade 11 - AP Physics 1",
    questionPrompt: "Section B: A 5kg block rests on a 30° incline with coefficient of friction μ = 0.2. Calculate normal force, maximum static friction, and net acceleration down the incline.",
    rubric: "10 pts per sub-question. Credit for proper coordinate axis rotation, vector decomposition (mg sin θ, mg cos θ), and Newton's second law formulation.",
    handwrittenPreview: "physics-paper-patel",
    defaultResult: {
      studentName: "S. Patel",
      subject: "Physics",
      topic: "Mechanics & Incline Friction",
      overallScore: 26,
      maxScore: 30,
      percentage: 87,
      grade: "B+",
      confidenceScore: 96,
      summaryFeedback: "Solid grasp of vector components along inclined coordinates. Small arithmetic rounding discrepancy on friction magnitude.",
      strengths: [
        "Clean tilted free-body diagram with labeled gravitational vectors",
        "Correct identification of normal force as N = mg cos(30°)",
        "Applied ΣF = ma correctly along parallel axis"
      ],
      weaknesses: [
        "Premature intermediate rounding in trigonometric cos(30°) step",
        "Need to review static vs kinetic friction transition condition"
      ],
      conceptMastery: [
        { concept: "Free Body Diagram Vectors", score: 98, status: "Mastered" },
        { concept: "Normal Force Resolution", score: 90, status: "Mastered" },
        { concept: "Friction & Thresholds", score: 78, status: "Needs Review" },
        { concept: "Newton's 2nd Law (ΣF=ma)", score: 88, status: "Proficient" }
      ],
      questions: [
        {
          questionNumber: 1,
          questionText: "Calculate the normal force on the 5kg block on a 30° incline.",
          maxMarks: 10,
          awardedMarks: 10,
          studentSolutionExtracted: "N = mg cos(30°) = (5 kg)(9.8 m/s²)(cos 30°) = 49 * 0.866 = 42.43 N",
          conceptAssessed: "Perpendicular force balance on inclined plane",
          isConceptCorrect: true,
          feedback: "Accurate perpendicular component resolution and proper SI units.",
          stepBreakdown: [
            { step: "Perpendicular equilibrium ΣFy = 0", correct: true, notes: "N = mg cos θ" },
            { step: "Cos 30° evaluation", correct: true, notes: "0.8660 substituted" },
            { step: "Final magnitude 42.4 N", correct: true, notes: "Units correctly stated in Newtons" }
          ]
        },
        {
          questionNumber: 2,
          questionText: "Determine the maximum static friction force if μs = 0.2.",
          maxMarks: 10,
          awardedMarks: 8,
          studentSolutionExtracted: "f_s,max = μs * N = 0.2 * 42.43 N = 8.49 N",
          conceptAssessed: "Static friction equation",
          isConceptCorrect: true,
          feedback: "Correct formula and calculation. Did not compare f_s,max with parallel gravity component mg sin(30°) = 24.5 N to confirm slippage.",
          stepBreakdown: [
            { step: "Formula f_max = μ * N", correct: true, notes: "Proper relationship" },
            { step: "Evaluation 8.49 N", correct: true, notes: "Correct product" },
            { step: "Verification of slip condition", correct: false, notes: "Omitted comparison with mg sin θ" }
          ]
        },
        {
          questionNumber: 3,
          questionText: "Calculate net acceleration down the incline assuming kinetic friction μk = 0.15.",
          maxMarks: 10,
          awardedMarks: 8,
          studentSolutionExtracted: "ΣFx = mg sin 30° - fk = m * a\n(5)(9.8)(0.5) - (0.15)(42.43) = 5a\n24.5 - 6.36 = 5a\n18.14 = 5a => a = 3.63 m/s²",
          conceptAssessed: "Net parallel force and acceleration",
          isConceptCorrect: true,
          feedback: "Clear and coherent application of Newton's second law. Result is accurate.",
          stepBreakdown: [
            { step: "Parallel force equation", correct: true, notes: "mg sin θ - fk = ma" },
            { step: "Kinetic friction computation", correct: true, notes: "fk = 6.36 N" },
            { step: "Acceleration value", correct: true, notes: "a = 3.63 m/s²" }
          ]
        }
      ],
      targetedPracticeRecommendations: [
        {
          topic: "Static vs Kinetic Friction Transitions",
          description: "Determine whether objects remain stationary or slip under varying incline angles",
          difficulty: "Medium",
          sampleQuestion: "At what critical angle θ will a block with μs = 0.35 begin to slide down an incline?"
        }
      ],
      teacherNotes: "Strong spatial comprehension of force vectors. Encourage writing conceptual check steps before calculating acceleration."
    }
  },
  {
    id: "chem-stoich",
    title: "Chemistry Examination: Stoichiometry & Gas Laws",
    subject: "Chemistry",
    topic: "Molar Ratios, Limiting Reactants & Ideal Gas Law",
    studentName: "E. Rodriguez",
    gradeLevel: "Grade 11 - Honors Chemistry",
    questionPrompt: "Reaction: 2H₂ + O₂ -> 2H₂O. If 8.0 g of H₂ reacts with 32.0 g of O₂, find the limiting reactant and mass of water produced.",
    rubric: "10 pts for molar conversion, 10 pts for limiting reactant justification, 10 pts for theoretical yield calculation.",
    handwrittenPreview: "chem-paper-rodriguez",
    defaultResult: {
      studentName: "E. Rodriguez",
      subject: "Chemistry",
      topic: "Stoichiometry & Limiting Reactants",
      overallScore: 29,
      maxScore: 30,
      percentage: 97,
      grade: "A+",
      confidenceScore: 99,
      summaryFeedback: "Exceptional mastery of stoichiometric dimensional analysis and molar ratios. Clear step labeling with unit cancellations.",
      strengths: [
        "Explicit molar mass calculations (H₂ = 2.016 g/mol, O₂ = 32.00 g/mol)",
        "Flawless limiting reactant deduction comparing available vs required mole ratios",
        "Clear unit cancellation notation throughout working"
      ],
      weaknesses: [
        "Include significant figures discussion in final answer rounded digits"
      ],
      conceptMastery: [
        { concept: "Molar Mass & Mole Conversion", score: 100, status: "Mastered" },
        { concept: "Limiting Reactant Identification", score: 98, status: "Mastered" },
        { concept: "Theoretical Yield Calculation", score: 96, status: "Mastered" }
      ],
      questions: [
        {
          questionNumber: 1,
          questionText: "Convert 8.0 g H₂ and 32.0 g O₂ into moles.",
          maxMarks: 10,
          awardedMarks: 10,
          studentSolutionExtracted: "n(H₂) = 8.0 g / 2.016 g/mol = 3.97 mol\nn(O₂) = 32.0 g / 32.00 g/mol = 1.00 mol",
          conceptAssessed: "Mass to mole conversion",
          isConceptCorrect: true,
          feedback: "Accurate conversions using precise atomic weights.",
          stepBreakdown: [
            { step: "Moles of Hydrogen", correct: true, notes: "3.97 mol H₂" },
            { step: "Moles of Oxygen", correct: true, notes: "1.00 mol O₂" }
          ]
        },
        {
          questionNumber: 2,
          questionText: "Identify the limiting reactant with justification based on stoichiometry.",
          maxMarks: 10,
          awardedMarks: 10,
          studentSolutionExtracted: "Stoichiometric ratio H₂:O₂ is 2:1.\nTo react completely with 1.00 mol O₂, we require 2.00 mol H₂.\nWe have 3.97 mol H₂, so H₂ is in excess and O₂ is the limiting reactant.",
          conceptAssessed: "Stoichiometric mole ratio comparison",
          isConceptCorrect: true,
          feedback: "Rigorous logical justification comparing available versus required mole quantities.",
          stepBreakdown: [
            { step: "Stated balanced equation ratio (2:1)", correct: true, notes: "Clearly cited 2H₂ + O₂" },
            { step: "Identified required H₂ (2.0 mol)", correct: true, notes: "Compared against 3.97 mol available" },
            { step: "Concluded O₂ is limiting", correct: true, notes: "Sound deduction" }
          ]
        },
        {
          questionNumber: 3,
          questionText: "Calculate the theoretical yield of H₂O in grams.",
          maxMarks: 10,
          awardedMarks: 9,
          studentSolutionExtracted: "1.00 mol O₂ * (2 mol H₂O / 1 mol O₂) = 2.00 mol H₂O\nMass H₂O = 2.00 mol * 18.02 g/mol = 36.04 g H₂O",
          conceptAssessed: "Theoretical yield calculation",
          isConceptCorrect: true,
          feedback: "Accurate yield calculation based on limiting reactant.",
          stepBreakdown: [
            { step: "Mole product from limiting reactant", correct: true, notes: "2.00 mol H₂O" },
            { step: "Mass conversion with molar mass 18.02", correct: true, notes: "36.04 grams" }
          ]
        }
      ],
      targetedPracticeRecommendations: [
        {
          topic: "Percent Yield & Gas Volume under STP",
          description: "Calculating experimental recovery percentage and gas volume using PV = nRT",
          difficulty: "Medium",
          sampleQuestion: "If the experiment yielded 32.5 g H₂O, calculate the percent yield."
        }
      ],
      teacherNotes: "Mastery demonstrated across all stoichiometric foundations. Ready for equilibrium and thermochemistry."
    }
  }
];

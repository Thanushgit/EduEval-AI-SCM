import React, { useState } from "react";
import {
  CheckCircle2,
  ArrowRight,
  UploadCloud,
  BrainCircuit,
  Scan,
  Download,
  X,
} from "lucide-react";

type FlowStep = "step1" | "step2" | "step3" | "processing" | "results";

type Evaluation = {
  studentName?: string;
  overallScore?: number;
  maxScore?: number;
  percentage?: number;
  grade?: string;
  confidenceScore?: number;
  summaryFeedback?: string;
  strengths?: string[];
  weaknesses?: string[];
  rubricAnalysis?: Array<{
    criterion?: string;
    maximumMarks?: number;
    awardedMarks?: number;
    status?: "satisfied" | "partially_satisfied" | "not_satisfied";
    evidence?: string;
    feedback?: string;
  }>;
  questions?: Array<{
    questionNumber?: number;
    maxMarks?: number;
    awardedMarks?: number;
    studentSolutionExtracted?: string;
    conceptAssessed?: string;
    isConceptCorrect?: boolean;
    feedback?: string;
    stepBreakdown?: Array<{
      step?: string;
      correct?: boolean;
      notes?: string;
    }>;
  }>;
};

const API_URL = "/api/evaluate";

interface CreateEvaluationViewProps {
  teacherId?: number | null;
}

export const CreateEvaluationView: React.FC<CreateEvaluationViewProps> = ({ teacherId }) => {
  const [step, setStep] = useState<FlowStep>("step1");

  const [question, setQuestion] = useState(
    "Explain Newton's Second Law and provide a real-life example."
  );

  const [maxMarks, setMaxMarks] = useState("5");

  const [criteria, setCriteria] = useState([
    { text: "F = ma mentioned", marks: "1" },
    { text: "Terms explained", marks: "1" },
    { text: "Correct concept", marks: "2" },
    { text: "Real-life example", marks: "1" },
  ]);

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");
  const [processingStage, setProcessingStage] = useState(0);
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);

  const selectFile = (selected: File | undefined) => {
    if (!selected) return;

    setError("");

    if (!selected.type.startsWith("image/")) {
      setError("Please upload a PNG, JPG, JPEG or WEBP image.");
      return;
    }

    if (selected.size > 15 * 1024 * 1024) {
      setError("Image is too large. Please upload an image below 15 MB.");
      return;
    }

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const removeFile = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setFile(null);
    setPreview(null);
    setError("");
  };

  const handleStartProcessing = async () => {
    if (!file) {
      setError("Please upload the student's handwritten answer first.");
      return;
    }

    if (!question.trim()) {
      setError("Please enter the question.");
      setStep("step1");
      return;
    }

    const totalRubricMarks = criteria.reduce(
      (sum, item) => sum + (Number(item.marks) || 0),
      0
    );

    const totalMaxMarks = Number(maxMarks) || 0;

    if (totalRubricMarks !== totalMaxMarks) {
      setError(
        `Rubric marks (${totalRubricMarks}) must equal Max Marks (${totalMaxMarks}).`
      );
      setStep("step2");
      return;
    }

    if (
      criteria.some(
        (item) => !item.text.trim() || Number(item.marks) <= 0
      )
    ) {
      setError(
        "Please make sure every rubric criterion has a name and marks greater than 0."
      );
      setStep("step2");
      return;
    }

    setError("");
    setEvaluation(null);
    setStep("processing");
    setProcessingStage(1);

    const formData = new FormData();

    formData.append("questionPrompt", question);
    formData.append(
      "rubric",
      criteria
        .map((c) => `${c.text}: ${c.marks} mark(s)`)
        .join("; ")
    );
    formData.append("maxMarks", maxMarks);
    formData.append("image", file);

    if (teacherId) {
      formData.append("teacherId", String(teacherId));
    }

    try {
      setProcessingStage(2);

      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success || !data.evaluation) {
        throw new Error(
          data.details ||
            data.error ||
            `Evaluation failed (${response.status})`
        );
      }

      setProcessingStage(3);

      await new Promise((resolve) => setTimeout(resolve, 350));

      setProcessingStage(4);

      await new Promise((resolve) => setTimeout(resolve, 350));

      setEvaluation(data.evaluation);

      setProcessingStage(5);

      await new Promise((resolve) => setTimeout(resolve, 350));

      setStep("results");
    } catch (err: any) {
      console.error("EduEval evaluation error:", err);

      setError(
        err?.message ||
          "Evaluation failed. Please check that the AI server is running."
      );

      setStep("step3");
    }
  };

  const score = evaluation?.overallScore ?? 0;

  const maxScore =
    (evaluation?.maxScore ?? Number(maxMarks)) || 0;

  const percentage =
    evaluation?.percentage ??
    (maxScore
      ? Math.round((score / maxScore) * 100)
      : 0);

  const rawConfidence = evaluation?.confidenceScore;

  const confidence =
    rawConfidence == null
      ? null
      : rawConfidence <= 1
        ? rawConfidence * 100
        : rawConfidence;

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20 animate-fade-in">

      {/* Progress */}
      {["step1", "step2", "step3"].includes(step) && (
        <div className="flex items-center gap-2 text-sm font-bold text-slate-500 mb-8">

          <span
            className={`px-2.5 py-1 rounded-md ${
              step === "step1"
                ? "bg-[#0284c7] text-white"
                : "bg-slate-200"
            }`}
          >
            1. Question
          </span>

          <span className="w-4 h-px bg-slate-300" />

          <span
            className={`px-2.5 py-1 rounded-md ${
              step === "step2"
                ? "bg-[#0284c7] text-white"
                : "bg-slate-200"
            }`}
          >
            2. Rubric
          </span>

          <span className="w-4 h-px bg-slate-300" />

          <span
            className={`px-2.5 py-1 rounded-md ${
              step === "step3"
                ? "bg-[#0284c7] text-white"
                : "bg-slate-200"
            }`}
          >
            3. Upload
          </span>
        </div>
      )}

      {/* STEP 1 */}
      {step === "step1" && (
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-[#dce9f8] shadow-sm space-y-6">

          <h2 className="font-heading font-extrabold text-2xl text-[#0b192c]">
            Step 1: Enter Question
          </h2>

          <div>
            <label className="block text-xs font-bold text-[#0b192c] uppercase mb-2">
              Question
            </label>

            <textarea
              rows={4}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0284c7]/30 bg-[#fbfdff]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0b192c] uppercase mb-2">
              Maximum Marks
            </label>

            <input
              type="number"
              min="1"
              value={maxMarks}
              onChange={(e) => setMaxMarks(e.target.value)}
              className="w-32 px-4 py-3 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0284c7]/30 bg-[#fbfdff]"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">

            <button
              onClick={() => setStep("step2")}
              className="inline-flex items-center gap-2 bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold py-3 px-6 rounded-xl"
            >
              Next Step
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>
        </div>
      )}

      {/* STEP 2 */}
      {step === "step2" && (
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-[#dce9f8] shadow-sm space-y-6">

          <h2 className="font-heading font-extrabold text-2xl text-[#0b192c]">
            Step 2: Marking Scheme
          </h2>

          <div className="bg-[#f0f7ff] p-4 rounded-xl border border-[#bae6fd] text-sm text-[#0369a1] font-medium flex gap-3">

            <BrainCircuit className="w-5 h-5 shrink-0" />

            <p>
              AI evaluates concepts, reasoning and correctness rather than exact wording.
            </p>

          </div>

          <div className="space-y-3">

            <label className="block text-xs font-bold text-[#0b192c] uppercase">
              Evaluation Criteria
            </label>

            {criteria.map((c, i) => (
              <div
                key={i}
                className="flex gap-3 items-center"
              >

                <input
                  type="text"
                  value={c.text}
                  onChange={(e) => {
                    const updated = [...criteria];

                    updated[i] = {
                      ...updated[i],
                      text: e.target.value,
                    };

                    setCriteria(updated);
                  }}
                  className="flex-1 px-4 py-2.5 text-sm rounded-xl border border-slate-300 bg-white"
                  placeholder="Enter evaluation criterion"
                />

                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={c.marks}
                  onChange={(e) => {
                    const updated = [...criteria];

                    updated[i] = {
                      ...updated[i],
                      marks: e.target.value,
                    };

                    setCriteria(updated);
                  }}
                  className="w-28 px-4 py-2.5 text-sm rounded-xl border border-slate-300 bg-white text-center"
                  placeholder="Marks"
                />

                <button
                  type="button"
                  onClick={() => {
                    setCriteria(
                      criteria.filter(
                        (_, index) => index !== i
                      )
                    );
                  }}
                  disabled={criteria.length <= 1}
                  className="px-3 py-2.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Delete
                </button>

              </div>
            ))}

          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-between">

            <button
              onClick={() => setStep("step1")}
              className="text-slate-500 font-bold px-4 py-2"
            >
              Back
            </button>

            <button
              onClick={() => setStep("step3")}
              className="inline-flex items-center gap-2 bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold py-3 px-6 rounded-xl"
            >
              Next Step
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>
        </div>
      )}

      {/* STEP 3 */}
      {step === "step3" && (
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-[#dce9f8] shadow-sm space-y-6">

          <h2 className="font-heading font-extrabold text-2xl text-[#0b192c]">
            Step 3: Upload Answer
          </h2>

          <input
            id="handwritten-exam-upload"
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp"
            className="hidden"
            onChange={(e) =>
              selectFile(e.target.files?.[0])
            }
          />

          <label
            htmlFor="handwritten-exam-upload"
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              selectFile(e.dataTransfer.files?.[0]);
            }}
            className={`border-2 border-dashed rounded-3xl p-12 flex flex-col items-center justify-center text-center transition-colors cursor-pointer ${
              dragging
                ? "border-[#0284c7] bg-[#e0f2fe]"
                : "border-[#bae6fd] bg-[#f0f7ff] hover:bg-[#e0f2fe]"
            }`}
          >

            <UploadCloud className="w-12 h-12 text-[#0284c7] mb-4" />

            <p className="font-heading font-bold text-lg text-[#0b192c]">
              Drag handwritten answer here
            </p>

            <p className="text-sm text-[#64748b] mt-1">
              or
            </p>

            <span className="mt-4 px-6 py-2 bg-white border border-[#0284c7] text-[#0284c7] font-bold rounded-full shadow-sm">
              Upload Image
            </span>

            <p className="text-xs text-slate-500 mt-3">
              PNG, JPG, JPEG or WEBP • Max 15 MB
            </p>

          </label>

          {preview && file && (
            <div className="flex items-center gap-4 p-3 border border-slate-200 rounded-xl bg-slate-50">

              <div className="w-24 h-28 rounded-lg overflow-hidden border bg-white shrink-0">
                <img
                  src={preview}
                  alt="Uploaded handwritten answer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="min-w-0 flex-1">

                <p className="font-bold text-sm text-slate-800 truncate">
                  {file.name}
                </p>

                <p className="text-xs text-slate-500 mt-1">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>

                <p className="text-xs text-emerald-600 font-semibold mt-2">
                  ✓ Ready for AI evaluation
                </p>

              </div>

              <button
                onClick={removeFile}
                className="p-2 rounded-lg hover:bg-white text-slate-500"
                title="Remove image"
              >
                <X className="w-5 h-5" />
              </button>

            </div>
          )}

          {error && (
            <div className="p-4 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 text-sm font-semibold">
              {error}
            </div>
          )}

          <div className="pt-4 border-t border-slate-100 flex justify-between">

            <button
              onClick={() => setStep("step2")}
              className="text-slate-500 font-bold px-4 py-2"
            >
              Back
            </button>

            <button
              onClick={handleStartProcessing}
              disabled={!file}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-extrabold py-3 px-8 rounded-xl shadow-md"
            >
              Analyse Answer
              <ArrowRight className="w-5 h-5" />
            </button>

          </div>
        </div>
      )}

      {/* PROCESSING */}
      {step === "processing" && (
        <div className="bg-white p-8 md:p-12 rounded-3xl border border-[#dce9f8] shadow-2xl max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[400px]">

          <div className="w-20 h-20 bg-[#0c2340] rounded-2xl flex items-center justify-center mb-8 relative">

            <Scan className="w-10 h-10 text-[#00d2ff] animate-pulse" />

            <div className="absolute inset-0 border-2 border-[#00d2ff] rounded-2xl animate-ping opacity-20" />

          </div>

          <h2 className="font-heading font-extrabold text-2xl text-[#0b192c] mb-8">
            AI Evaluation Pipeline
          </h2>

          <div className="w-full max-w-sm space-y-4">

            <PipelineItem
              label="Answer uploaded"
              active={processingStage >= 1}
              completed={processingStage > 1}
            />

            <PipelineItem
              label="Reading handwriting"
              active={processingStage >= 2}
              completed={processingStage > 2}
            />

            <PipelineItem
              label="Understanding concepts"
              active={processingStage >= 3}
              completed={processingStage > 3}
            />

            <PipelineItem
              label="Applying evaluation rubric"
              active={processingStage >= 4}
              completed={processingStage > 4}
            />

            <PipelineItem
              label="Generating feedback"
              active={processingStage >= 5}
              completed={processingStage > 5}
            />

          </div>
        </div>
      )}

      {/* RESULTS */}
      {step === "results" && evaluation && (
        <div className="space-y-6 animate-fade-in">

          <div className="bg-gradient-to-br from-[#0c2340] to-[#051329] text-white p-8 rounded-3xl shadow-2xl border border-[#0284c7]/30">

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">

              <div>

                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-wider text-[#38bdf8] mb-4">

                  <CheckCircle2 className="w-3.5 h-3.5" />

                  Real AI Evaluation

                </div>

                <div className="flex items-end gap-4">

                  <div className="font-heading font-black text-6xl md:text-8xl">

                    {score}

                    <span className="text-4xl text-slate-500">
                      {" "}
                      / {maxScore}
                    </span>

                  </div>

                  <div className="text-2xl md:text-3xl font-extrabold text-[#38bdf8] mb-2">
                    {percentage}%
                  </div>

                </div>

                {evaluation.grade && (
                  <p className="mt-2 text-slate-300">
                    Grade:{" "}
                    <strong className="text-white">
                      {evaluation.grade}
                    </strong>

                    {confidence != null
                      ? ` • Confidence: ${Math.round(
                          confidence
                        )}%`
                      : ""}
                  </p>
                )}

              </div>

              <div className="bg-white/5 border border-white/10 p-5 rounded-2xl md:w-96">

                <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-3">
                  Concept Analysis
                </h4>

                <div className="space-y-2">

                  {(evaluation.questions || []).map(
                    (q, i) => (
                      <div key={i}>

                        <ResultRow
                          label={
                            q.conceptAssessed ||
                            `Question ${
                              q.questionNumber || i + 1
                            }`
                          }
                          score={`${q.awardedMarks ?? 0}/${q.maxMarks ?? 0}`}
                          status={
                            q.isConceptCorrect
                              ? "correct"
                              : (q.awardedMarks || 0) > 0
                                ? "partial"
                                : "wrong"
                          }
                        />

                      </div>
                    )
                  )}

                </div>
              </div>
            </div>

            {evaluation.rubricAnalysis?.length ? (
              <div className="mt-6 bg-white/5 border border-white/10 p-5 rounded-2xl">

                <h4 className="text-sm font-bold text-[#38bdf8] mb-4">
                  Rubric-wise Marking
                </h4>

                <div className="space-y-3">

                  {evaluation.rubricAnalysis.map(
                    (item, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-xl bg-white/5 border border-white/10"
                      >

                        <div className="flex items-center justify-between gap-4">

                          <div className="font-semibold text-white">
                            {item.criterion ||
                              `Criterion ${i + 1}`}
                          </div>

                          <div className="font-mono font-bold text-white">
                            {item.awardedMarks ?? 0}/
                            {item.maximumMarks ?? 0}
                          </div>

                        </div>

                        {item.evidence && (
                          <p className="text-sm text-slate-300 mt-2">
                            <strong>Evidence:</strong>{" "}
                            {item.evidence}
                          </p>
                        )}

                        {item.feedback && (
                          <p className="text-sm text-slate-300 mt-1">
                            <strong>Feedback:</strong>{" "}
                            {item.feedback}
                          </p>
                        )}

                      </div>
                    )
                  )}

                </div>
              </div>
            ) : null}

            <div className="mt-8 bg-white/5 border border-white/10 p-5 rounded-2xl">

              <h4 className="text-sm font-bold text-[#38bdf8] mb-2 flex items-center gap-2">

                <BrainCircuit className="w-4 h-4" />

                AI Feedback

              </h4>

              <p className="text-sm md:text-base text-slate-200 leading-relaxed">
                {evaluation.summaryFeedback ||
                  "No summary feedback returned."}
              </p>

            </div>

            <div className="mt-6 flex justify-end">

              <button
                onClick={() =>
                  alert(
                    "PDF export can be connected next; the live AI result is already available."
                  )
                }
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-3 px-6 rounded-xl"
              >
                <Download className="w-5 h-5" />
                Export PDF
              </button>

            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Student answer */}
            <div className="bg-white rounded-3xl border border-[#dce9f8] shadow-sm overflow-hidden">

              <div className="px-6 py-4 border-b bg-[#f8fbff]">

                <h3 className="font-heading font-bold text-lg text-[#0b192c]">
                  Student's Answer
                </h3>

              </div>

              <div className="p-6 bg-slate-100">

                <img
                  src={preview || ""}
                  alt="Student handwritten answer"
                  className="w-full max-h-[500px] object-contain bg-white rounded-lg shadow-sm border border-slate-200"
                />

              </div>

            </div>

            {/* AI Understanding */}
            <div className="bg-white rounded-3xl border border-[#dce9f8] shadow-sm overflow-hidden">

              <div className="px-6 py-4 border-b bg-[#f0f7ff]">

                <h3 className="font-heading font-bold text-lg text-[#0369a1] flex items-center gap-2">

                  <Scan className="w-5 h-5" />

                  AI Understanding

                </h3>

              </div>

              <div className="p-6 space-y-5">

                <div>

                  {evaluation.questions?.map(
                    (q, i) => (
                      <div
                        key={i}
                        className="mb-4 p-4 rounded-xl bg-slate-50 border"
                      >

                        <div className="flex justify-between gap-4">

                          <strong className="text-sm">
                            {q.conceptAssessed ||
                              `Question ${
                                q.questionNumber || i + 1
                              }`}
                          </strong>

                          <span className="font-bold">
                            {q.awardedMarks ?? 0}/
                            {q.maxMarks ?? 0}
                          </span>

                        </div>

                        {q.studentSolutionExtracted && (
                          <p className="text-sm text-slate-600 mt-2">
                            {q.studentSolutionExtracted}
                          </p>
                        )}

                        {q.feedback && (
                          <p className="text-sm text-slate-700 mt-2">
                            <strong>Feedback:</strong>{" "}
                            {q.feedback}
                          </p>
                        )}

                      </div>
                    )
                  )}

                </div>

                <div>

                  <h4 className="text-xs font-bold text-emerald-700 uppercase mb-2">
                    Strengths
                  </h4>

                  <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">

                    {(evaluation.strengths || []).map(
                      (x, i) => (
                        <li key={i}>{x}</li>
                      )
                    )}

                  </ul>

                </div>

                <div>

                  <h4 className="text-xs font-bold text-amber-700 uppercase mb-2">
                    Weaknesses
                  </h4>

                  <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">

                    {(evaluation.weaknesses || []).map(
                      (x, i) => (
                        <li key={i}>{x}</li>
                      )
                    )}

                  </ul>

                </div>

              </div>
            </div>

          </div>

          <button
            onClick={() => {
              setEvaluation(null);
              setStep("step3");
            }}
            className="text-[#0284c7] font-bold hover:underline"
          >
            Evaluate another answer
          </button>

        </div>
      )}
    </div>
  );
};

const PipelineItem = ({
  label,
  active,
  completed,
}: {
  label: string;
  active: boolean;
  completed: boolean;
}) => (
  <div
    className={`flex items-center gap-4 p-3 rounded-xl ${
      active
        ? "bg-[#f0f7ff] border border-[#bae6fd]"
        : "opacity-40"
    }`}
  >
    <div
      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
        completed
          ? "bg-emerald-500 text-white"
          : active
            ? "border-2 border-[#0284c7]"
            : "border-2 border-slate-300"
      }`}
    >
      {completed && (
        <CheckCircle2 className="w-4 h-4" />
      )}
    </div>

    <span
      className={`font-semibold text-sm ${
        completed
          ? "text-emerald-700"
          : active
            ? "text-[#0369a1]"
            : "text-slate-500"
      }`}
    >
      {label}
    </span>
  </div>
);

const ResultRow = ({
  label,
  score,
  status,
}: {
  label: string;
  score: string;
  status: "correct" | "partial" | "wrong";
}) => (
  <div className="flex items-center justify-between text-sm py-1.5 border-b border-white/5">

    <div className="flex items-center gap-2">

      <span
        className={
          status === "correct"
            ? "text-emerald-400"
            : status === "partial"
              ? "text-amber-400"
              : "text-rose-400"
        }
      >
        {status === "correct"
          ? "✓"
          : status === "partial"
            ? "⚠"
            : "✗"}
      </span>

      <span className="text-slate-200">
        {label}
      </span>

    </div>

    <span className="font-mono font-bold text-white">
      {score}
    </span>

  </div>
);
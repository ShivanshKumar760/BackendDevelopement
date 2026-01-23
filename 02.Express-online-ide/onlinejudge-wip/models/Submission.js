import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  projectType: { type: String, required: true },
  taskId: { type: Number, required: true },
  code: { type: String, required: true },
  status: { type: String, default: "PENDING" },
  output: { type: String },
  testsPassed: { type: Number, default: 0 },
  testsTotal: { type: Number, default: 0 },
  submittedAt: { type: Date, default: Date.now },
  evaluatedAt: { type: Date },
});

export default mongoose.model("Submission", submissionSchema);

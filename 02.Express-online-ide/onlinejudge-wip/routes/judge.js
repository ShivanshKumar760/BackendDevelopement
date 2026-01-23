import express from "express";
import Submission from "../models/Submission.js";
import codeEvaluator from "../services/codeEvaluator.js";

const router = express.Router();

// Submit code for evaluation
router.post("/submit", async (req, res) => {
  try {
    const { projectType, taskId, code } = req.body;

    if (!projectType || !taskId || !code) {
      return res.status(400).json({
        error: "Missing required fields: projectType, taskId, code",
      });
    }

    // Create submission
    const submission = new Submission({
      projectType,
      taskId,
      code,
      status: "RUNNING",
    });

    await submission.save();

    // Evaluate code
    const testResults = codeEvaluator.evaluateCode(code, projectType, taskId);

    // Calculate results
    const passedCount = testResults.filter((r) => r.passed).length;
    const totalTests = testResults.length;
    const allPassed = passedCount === totalTests;

    // Build output
    let output = "";
    if (allPassed) {
      output = "✅ All tests passed! Excellent work!\n\n";
    } else {
      output = "❌ Some tests failed:\n\n";
    }

    testResults.forEach((result) => {
      output += result.message + "\n";
      if (!result.passed && result.expected) {
        output += `   Expected: ${result.expected}\n`;
      }
    });

    // Update submission
    submission.status = allPassed ? "PASSED" : "FAILED";
    submission.testsPassed = passedCount;
    submission.testsTotal = totalTests;
    submission.output = output;
    submission.evaluatedAt = new Date();

    await submission.save();

    // Send response
    res.json({
      submissionId: submission._id,
      status: submission.status,
      output: submission.output,
      testsPassed: submission.testsPassed,
      testsTotal: submission.testsTotal,
      allPassed,
    });
  } catch (error) {
    console.error("Error evaluating submission:", error);
    res.status(500).json({
      error: "Failed to evaluate code",
      message: error.message,
    });
  }
});

// Get submission by ID
router.get("/submission/:id", async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);
    if (!submission) {
      return res.status(404).json({ error: "Submission not found" });
    }
    res.json(submission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
router.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Express.js Online Judge is running!",
    timestamp: new Date(),
  });
});

export default router;

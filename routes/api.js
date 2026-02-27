const express = require("express");
const router = express.Router();
const analysisController = require("../controllers/analysisController");

// POST /api/analyze - Analyze and format text
router.post("/analyze", analysisController.analyzeText);

// GET /api/history - Get all analysis history
router.get("/history", analysisController.getHistory);

// GET /api/history/:id - Get specific analysis
router.get("/history/:id", analysisController.getAnalysisById);

// DELETE /api/history/:id - Delete analysis
router.delete("/history/:id", analysisController.deleteAnalysis);

// POST /api/refine/:id - Refine existing answer
router.post("/refine/:id", analysisController.refineAnswer);

module.exports = router;

const Analysis = require("../models/Analysis");
const examAnswerAgent = require("../services/openaiAgent");

/**
 * Analyze and format text into exam-ready answer
 */
exports.analyzeText = async (req, res) => {
  try {
    const { topic, content } = req.body;

    // Validation
    if (!topic || !content) {
      return res.status(400).json({
        success: false,
        message: "Please provide both topic and content",
      });
    }

    if (content.trim().length < 10) {
      return res.status(400).json({
        success: false,
        message: "Content is too short. Please provide more detailed content.",
      });
    }

    // Use the AI agent to format the answer
    console.log(`📝 Analyzing text for topic: ${topic}`);
    const formattedAnswer = await examAnswerAgent.formatAnswer(topic, content);

    // Save to database
    const analysis = new Analysis({
      topic,
      originalContent: content,
      formattedAnswer,
    });

    await analysis.save();
    console.log("✅ Analysis saved to database");

    // Return the formatted answer
    res.status(200).json({
      success: true,
      data: {
        id: analysis._id,
        topic,
        originalContent: content,
        formattedAnswer,
        createdAt: analysis.createdAt,
      },
    });
  } catch (error) {
    console.error("Error in analyzeText:", error);
    res.status(500).json({
      success: false,
      message: "Failed to analyze text",
      error: error.message,
    });
  }
};

/**
 * Get all analysis history
 */
exports.getHistory = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;

    const analyses = await Analysis.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .select("-__v");

    const total = await Analysis.countDocuments();

    res.status(200).json({
      success: true,
      data: analyses,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error in getHistory:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch history",
      error: error.message,
    });
  }
};

/**
 * Get specific analysis by ID
 */
exports.getAnalysisById = async (req, res) => {
  try {
    const { id } = req.params;

    const analysis = await Analysis.findById(id).select("-__v");

    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: "Analysis not found",
      });
    }

    res.status(200).json({
      success: true,
      data: analysis,
    });
  } catch (error) {
    console.error("Error in getAnalysisById:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch analysis",
      error: error.message,
    });
  }
};

/**
 * Delete analysis by ID
 */
exports.deleteAnalysis = async (req, res) => {
  try {
    const { id } = req.params;

    const analysis = await Analysis.findByIdAndDelete(id);

    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: "Analysis not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Analysis deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteAnalysis:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete analysis",
      error: error.message,
    });
  }
};

/**
 * Refine existing answer
 */
exports.refineAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const { refinementInstructions } = req.body;

    if (!refinementInstructions) {
      return res.status(400).json({
        success: false,
        message: "Please provide refinement instructions",
      });
    }

    // Get the original analysis
    const analysis = await Analysis.findById(id);

    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: "Analysis not found",
      });
    }

    // Refine the answer using the agent
    const refinedAnswer = await examAnswerAgent.refineAnswer(
      analysis.formattedAnswer,
      refinementInstructions,
    );

    // Update the analysis
    analysis.formattedAnswer = refinedAnswer;
    await analysis.save();

    res.status(200).json({
      success: true,
      data: {
        id: analysis._id,
        formattedAnswer: refinedAnswer,
      },
    });
  } catch (error) {
    console.error("Error in refineAnswer:", error);
    res.status(500).json({
      success: false,
      message: "Failed to refine answer",
      error: error.message,
    });
  }
};

const { Agent, run } = require("@openai/agents");

// Instructions for the AI Agent
const ASSISTANT_INSTRUCTIONS = `
Act as a Software Engineering professor preparing a model 10-mark university exam answer.

You MUST:
- Treat the provided Content as the ONLY source of truth.
- NOT add any new technical points, concepts, definitions, examples, or explanations that are not already present in the Content.
- Only restructure, summarize, and lightly rephrase what is already there.
- If something is missing in the Content, leave it missing instead of inventing or guessing.

Your job is to convert the given Content into:

- Proper headings
- Definition section (only if definition exists in the Content)
- Goal section (only if goal is mentioned in the Content)
- Structured tables (e.g., Worst to Best classification) using ONLY information from the Content
- Clear examples (ONLY if examples are present in the Content)
- Best practice notes (ONLY if described in the Content)
- Final combined importance explanation, using ONLY the ideas already present in the Content

Formatting requirements:
- Highly structured
- Easy to revise
- Examiner-friendly
- Neatly formatted with bullet points
- Academically correct but simple language
- Output must be in clear, readable markdown.

If the Content is very short or incomplete, still follow these rules and DO NOT add outside knowledge.
`;

/**
 * AI Agent for formatting exam answers using OpenAI Agents SDK
 */
class ExamAnswerAgent {
  constructor() {
    this.model = "gpt-4.1";

    // Single Agent instance configured with instructions and model
    this.agent = new Agent({
      name: "Exam Answer Formatter",
      instructions: ASSISTANT_INSTRUCTIONS,
      model: this.model,
    });
  }

  /**
   * Format text into exam-ready answer using the Agent runner
   * @param {string} topic - The topic name
   * @param {string} content - The content to format
   * @returns {Promise<string>} - Formatted answer
   */
  async formatAnswer(topic, content) {
    try {
      const userMessage = `Topic: ${topic}\n\nContent:\n${content}`;

      const result = await run(this.agent, userMessage);

      // Agents SDK returns finalOutput as the main text
      return result.finalOutput;
    } catch (error) {
      console.error("Error in ExamAnswerAgent.formatAnswer:", error);
      throw new Error(`Failed to format answer: ${error.message}`);
    }
  }

  /**
   * Refine an existing answer with additional instructions via the Agent runner
   * @param {string} previousAnswer - The previous answer
   * @param {string} refinementInstructions - Instructions for refinement
   * @returns {Promise<string>} - Refined answer
   */
  async refineAnswer(previousAnswer, refinementInstructions) {
    try {
      const prompt = `Here is the previous answer:\n\n${previousAnswer}\n\nPlease refine this answer with the following instructions: ${refinementInstructions}`;

      const result = await run(this.agent, prompt);

      return result.finalOutput;
    } catch (error) {
      console.error("Error in ExamAnswerAgent.refineAnswer:", error);
      throw new Error(`Failed to refine answer: ${error.message}`);
    }
  }
}

// Create a singleton instance
const examAnswerAgent = new ExamAnswerAgent();

module.exports = examAnswerAgent;

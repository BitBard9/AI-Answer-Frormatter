const { Agent, run } = require("@openai/agents");

// Instructions for the AI Agent
const ASSISTANT_INSTRUCTIONS = `Act as a Software Engineering professor preparing a model 10-mark university exam answer.

Convert the given content into:
- Proper headings
- Definition section
- Goal section
- Structured tables (Worst to Best classification)
- Clear examples
- Best practice notes
- Final combined importance explanation

Make it:
- Highly structured
- Easy to revise
- Examiner-friendly
- Neatly formatted with bullet points
- Academically correct but simple language

Format the answer in a clear, readable markdown format with proper sections, headings, and bullet points.`;

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

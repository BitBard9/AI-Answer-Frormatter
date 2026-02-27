require("dotenv").config();

module.exports = {
  port: process.env.PORT || 5000,
  mongoUri:
    process.env.MONGODB_URI || "mongodb://localhost:27017/ai-text-analyzer",
  openaiApiKey: process.env.OPENAI_API_KEY,
  openaiModel: "gpt-4-turbo-preview", // You can change this to gpt-3.5-turbo for lower cost
};

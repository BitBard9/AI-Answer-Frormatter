import React, { useState } from "react";
import "./TextAnalyzer.css";
import { analyzeText } from "../services/api";

const TextAnalyzer = ({ onAnalysisComplete }) => {
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!topic.trim() || !content.trim()) {
      setError("Please provide both topic and content");
      return;
    }

    if (content.trim().length < 10) {
      setError("Content is too short. Please provide more detailed content.");
      return;
    }

    setIsLoading(true);

    try {
      const result = await analyzeText(topic, content);

      if (result.success) {
        onAnalysisComplete(result.data);
        // Clear form
        setTopic("");
        setContent("");
      } else {
        setError(result.message || "Failed to analyze text");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to analyze text. Please try again.",
      );
      console.error("Analysis error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setTopic("");
    setContent("");
    setError("");
  };

  return (
    <div className="text-analyzer">
      <div className="analyzer-header">
        <h2>📝 Exam Answer Formatter</h2>
        <p>Convert your notes into exam-ready 10-mark answers</p>
      </div>

      <form onSubmit={handleSubmit} className="analyzer-form">
        <div className="form-group">
          <label htmlFor="topic">Topic Name *</label>
          <input
            type="text"
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Design Patterns, SOLID Principles, etc."
            disabled={isLoading}
            maxLength={200}
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">
            Content to Format *
            <span className="char-count">{content.length} characters</span>
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Paste your answer or notes here..."
            rows={12}
            disabled={isLoading}
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="form-actions">
          <button
            type="button"
            onClick={handleClear}
            className="btn btn-secondary"
            disabled={isLoading}
          >
            Clear
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Analyzing...
              </>
            ) : (
              "🤖 Analyze & Format"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TextAnalyzer;

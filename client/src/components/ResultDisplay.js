import React from "react";
import ReactMarkdown from "react-markdown";
import "./ResultDisplay.css";

const ResultDisplay = ({ result, onClose }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(result.formattedAnswer);
    alert("Formatted answer copied to clipboard!");
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([result.formattedAnswer], { type: "text/markdown" });
    element.href = URL.createObjectURL(file);
    element.download = `${result.topic.replace(/\s+/g, "_")}_formatted.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="result-display">
      <div className="result-header">
        <div>
          <h2>✅ Formatted Answer</h2>
          <p className="topic-name">Topic: {result.topic}</p>
        </div>
        <button onClick={onClose} className="close-btn" title="Close">
          ✕
        </button>
      </div>

      <div className="result-actions">
        <button onClick={handleCopy} className="action-btn">
          📋 Copy
        </button>
        <button onClick={handleDownload} className="action-btn">
          💾 Download
        </button>
      </div>

      <div className="result-content">
        <div className="markdown-preview">
          <ReactMarkdown>{result.formattedAnswer}</ReactMarkdown>
        </div>
      </div>

      <div className="original-content">
        <details>
          <summary>View Original Content</summary>
          <div className="original-text">{result.originalContent}</div>
        </details>
      </div>
    </div>
  );
};

export default ResultDisplay;

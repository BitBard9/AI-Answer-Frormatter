import React, { useState } from "react";
import "./App.css";
import TextAnalyzer from "./components/TextAnalyzer";
import ResultDisplay from "./components/ResultDisplay";

function App() {
  const [currentResult, setCurrentResult] = useState(null);

  const handleAnalysisComplete = (result) => {
    setCurrentResult(result);
  };

  const handleCloseResult = () => {
    setCurrentResult(null);
  };

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <h1>🎓 AI Exam Answer Formatter</h1>
          <p>Transform your notes into professional 10-mark exam answers</p>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          <TextAnalyzer onAnalysisComplete={handleAnalysisComplete} />

          {currentResult && (
            <ResultDisplay result={currentResult} onClose={handleCloseResult} />
          )}
        </div>
      </main>

      <footer className="app-footer">
        <p>Powered by OpenAI Assistants API • Built with MERN Stack</p>
      </footer>
    </div>
  );
}

export default App;

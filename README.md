# AI Text Analyzer - Exam Answer Formatter

An intelligent MERN stack application that converts text into exam-ready 10-mark university answers using OpenAI Agent SDK.

## Features

- 🤖 OpenAI Agent SDK integration for intelligent text analysis
- 📝 Converts unstructured content into well-formatted exam answers
- 💾 MongoDB database to store analysis history
- ⚛️ Modern React frontend with clean UI
- 🚀 Express backend with RESTful API

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- OpenAI API Key

### Backend Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

3. Add your OpenAI API key and MongoDB URI to `.env`:

```
OPENAI_API_KEY=your_openai_api_key_here
MONGODB_URI=mongodb://localhost:27017/ai-text-analyzer
PORT=5000
```

4. Start the backend server:

```bash
npm run dev
```

### Frontend Setup

1. Navigate to the client folder:

```bash
cd client
```

2. Install dependencies:

```bash
npm install
```

3. Start the React development server:

```bash
npm start
```

### Run Full Application

From the root directory:

```bash
npm run dev-full
```

This will start both backend (port 5000) and frontend (port 3000) concurrently.

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Enter your topic name
3. Paste the content/answer you want to format
4. Click "Analyze & Format"
5. Get your exam-ready 10-mark answer!

## API Endpoints

- `POST /api/analyze` - Analyze and format text
- `GET /api/history` - Get analysis history
- `GET /api/history/:id` - Get specific analysis by ID

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **AI**: OpenAI Agent SDK
- **Styling**: CSS3

## License

MIT

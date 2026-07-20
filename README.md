# 📧 SmartMail AI

SmartMail AI is an AI-powered web application that helps users generate professional emails in seconds. By providing a brief description of their situation and selecting a preferred tone, users receive a well-written email generated using Open AI.

---

## 🚀 Live Demo

**Live URL:** https://smartmail-ai-pi.vercel.app/ 

---

## 📂 GitHub Repository

https://github.com/shidoshidoshido/smartmail-ai.git

---

## ✨ Features

- 🤖 AI-powered email generation using Google Gemini
- 📝 Generate emails from a short description
- 🎯 Multiple writing tones
  - Professional
  - Friendly
  - Formal
  - Apology
  - Request
  - Follow-up
- 📱 Responsive web interface
- ⚡ Built with Next.js App Router
- 🔒 Secure API key management using environment variables

---

# 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 15 | Frontend & Backend |
| React | User Interface |
| TypeScript | Type Safety |
| Tailwind CSS | Styling |
| Google Gemini API | AI Email Generation |
| GitHub Actions | Continuous Integration |
| Vercel | Deployment |

---

# 📸 Application Preview

 

Example:

- Home Page
- Generated Email Output

# 📁 Project Structure

```
smartmail-ai/
│
├── app/
│   ├── api/
│   │   └── generate-email/
│   │       └── route.ts
│   ├── page.tsx
│   └── layout.tsx
│
├── public/
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── README.md
├── package.json
└── .env.local
```

---

# ⚙️ Installation

Clone the repository.

```bash
git clone https://github.com/shidoshidoshido/smartmail-ai.git
```

Go inside the project.

```bash
cd smartmail-ai
```

Install dependencies.

```bash
npm install
```

Create an environment file.

```
.env.local
```

Add your Gemini API key.

```env
OPENAI_API_KEY=YOUR_OPEN_AI_API_KEY
```

Start the development server.

```bash
npm run dev
```

Open

```
http://localhost:3000
```

---

# 💡 How It Works

1. User enters a short description of their situation.
2. User selects the desired email tone.
3. The application sends the request to the Next.js API route.
4. The API communicates with OPEN AI model.
5. Open AI generates a professional email.
6. The generated email is displayed to the user.

---

# 🔒 Environment Variables

The application requires:

```env
OPENAI_API_KEY=YOUR_API_KEY
```

Never commit `.env.local` to GitHub.

---

# 🧪 Testing

Run tests:

```bash
npm test
```

---

# 🚀 Deployment

The application is deployed using **Vercel**.

Every push to the `main` branch automatically triggers GitHub Actions to:

- Install dependencies
- Run tests
- Build the project

If successful, Vercel automatically deploys the latest version.

---

# 🔄 GitHub Actions

CI/CD pipeline includes:

- Install Dependencies
- Run Unit Tests
- Build Project

Workflow location:

```
.github/workflows/ci.yml
```

---

# 🔐 Security

This project follows security best practices:

- No hardcoded API keys
- Environment variables for secrets
- Input validation
- Error handling for API requests

---

# 📖 Future Improvements (v2)

- 📋 Copy generated email to clipboard
- 🌐 Multi-language email generation
- 📧 Export email as PDF
- ⭐ Save email history
- 🔑 User authentication
- 📂 Email templates
- 📎 Attachment suggestions

---

# 👨‍💻 Author

**Billy Joel Villanueva/Laraine Zyreen Marcelo**

Generative AI Course – Week 4 Mini Project

---

# 📄 License

This project is created for educational purposes as part of the Week 4 AI-Powered Web Application assignment.

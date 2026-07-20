"use client";

import { useState } from "react";

interface GeneratedEmail {
  subject: string;
  email: string;
}

export default function Home() {
  const [situation, setSituation] = useState("");
  const [tone, setTone] = useState("Professional");
  const [subject, setSubject] = useState("");
  const [generatedEmail, setGeneratedEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const generateEmail = async () => {
    const trimmedSituation = situation.trim();

    if (!trimmedSituation) {
      setError("Please describe the email situation first.");
      return;
    }

    setIsLoading(true);
    setError("");
    setCopied(false);

    try {
      const response = await fetch("/api/generate-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          situation: trimmedSituation,
          tone,
        }),
      });

      const data = (await response.json()) as GeneratedEmail & {
        error?: string;
      };

      if (!response.ok) {
        throw new Error(
          data.error || "The email could not be generated. Please try again."
        );
      }

      if (!data.subject || !data.email) {
        throw new Error("The AI returned an incomplete response.");
      }

      setSubject(data.subject);
      setGeneratedEmail(data.email);
    } catch (caughtError) {
      const message =
        caughtError instanceof Error
          ? caughtError.message
          : "Something went wrong while contacting the AI.";

      setError(message);
      setSubject("");
      setGeneratedEmail("");
    } finally {
      setIsLoading(false);
    }
  };

  const copyEmail = async () => {
    if (!generatedEmail) {
      return;
    }

    const content = `Subject: ${subject}\n\n${generatedEmail}`;

    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setError("The email could not be copied. Please copy it manually.");
    }
  };

  const clearForm = () => {
    setSituation("");
    setTone("Professional");
    setSubject("");
    setGeneratedEmail("");
    setError("");
    setCopied(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 px-6 py-12">
      <div className="mx-auto w-full max-w-3xl rounded-2xl bg-white p-8 shadow-2xl">
        <h1 className="text-center text-4xl font-bold text-gray-900">
          📧 SmartMail AI
        </h1>

        <p className="mb-8 mt-2 text-center text-gray-600">
          Generate professional emails in seconds using AI.
        </p>

        <div className="mb-6">
          <label
            htmlFor="situation"
            className="mb-2 block font-semibold text-gray-800"
          >
            Describe your situation
          </label>

          <textarea
            id="situation"
            rows={6}
            maxLength={2000}
            value={situation}
            onChange={(event) => {
              setSituation(event.target.value);

              if (error) {
                setError("");
              }
            }}
            placeholder="Example: Request leave tomorrow because I have a fever."
            className="w-full rounded-lg border border-gray-300 p-4 text-gray-900 outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
          />

          <p className="mt-1 text-right text-sm text-gray-500">
            {situation.length} / 2000
          </p>
        </div>

        <div className="mb-8">
          <label
            htmlFor="tone"
            className="mb-2 block font-semibold text-gray-800"
          >
            Select tone
          </label>

          <select
            id="tone"
            value={tone}
            onChange={(event) => setTone(event.target.value)}
            className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
          >
            <option value="Professional">Professional</option>
            <option value="Friendly">Friendly</option>
            <option value="Formal">Formal</option>
            <option value="Apology">Apology</option>
            <option value="Request">Request</option>
            <option value="Follow-up">Follow-up</option>
          </select>
        </div>

        {error && (
          <div
            role="alert"
            className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700"
          >
            {error}
          </div>
        )}

        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={generateEmail}
            disabled={isLoading}
            className="w-full rounded-lg bg-blue-600 py-4 text-lg font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            {isLoading ? "Generating..." : "Generate Email"}
          </button>

          <button
            type="button"
            onClick={clearForm}
            disabled={isLoading}
            className="w-full rounded-lg bg-gray-200 py-4 text-lg font-semibold text-gray-800 transition hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Clear
          </button>
        </div>

        {generatedEmail && (
          <section className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-6">
            <div className="mb-5">
              <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                Subject
              </p>
              <h2 className="mt-1 text-xl font-bold text-gray-900">
                {subject}
              </h2>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                Email
              </p>
              <div className="mt-2 whitespace-pre-wrap leading-7 text-gray-800">
                {generatedEmail}
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={copyEmail}
                className="rounded-lg bg-gray-900 px-5 py-3 font-semibold text-white transition hover:bg-gray-700"
              >
                {copied ? "Copied!" : "Copy Email"}
              </button>

              <button
                type="button"
                onClick={generateEmail}
                disabled={isLoading}
                className="rounded-lg border border-blue-600 px-5 py-3 font-semibold text-blue-600 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? "Regenerating..." : "Regenerate"}
              </button>
            </div>
          </section>
        )}

        <p className="mt-6 text-center text-sm text-gray-500">
          Review the generated email before sending. SmartMail AI may occasionally
          produce inaccurate or incomplete wording.
        </p>
      </div>
    </main>
  );
}


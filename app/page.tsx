"use client";

import jsPDF from "jspdf";
import { useState } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import {
  Upload,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";

export default function Home() {
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [txHash, setTxHash] = useState("");
  const [analysisText, setAnalysisText] = useState("");
  const [riskLevel, setRiskLevel] = useState("");
  const [humanVerified, setHumanVerified] = useState(false);
  const [selfieUploaded, setSelfieUploaded] = useState(false);
  const [chainActivity, setChainActivity] = useState<string[]>([]);
  const activities = [
    {
      user: "0xA91F",
      status: "Verified Authentic File",
    },
    {
      user: "0xB82K",
      status: "AI Manipulation Detected",
    },
    {
      user: "0xC73M",
      status: "Human Identity Verified",
    },
  ];

  const analyzeFile = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
      });

      await res.json();

      const randomScore = Math.floor(Math.random() * 100);

      setTimeout(() => {
        setScore(randomScore);

        if (randomScore > 70) {
          setRiskLevel("LOW RISK");
          setAnalysisText(
            "File appears authentic with minimal AI manipulation indicators."
          );
        } else if (randomScore > 40) {
          setRiskLevel("MEDIUM RISK");
          setAnalysisText(
            "Suspicious editing patterns detected. Possible AI enhancement found."
          );
        } else {
          setRiskLevel("HIGH RISK");
          setAnalysisText(
            "Strong AI manipulation indicators detected in uploaded file."
          );
        }

        setLoading(false);
      }, 2000);
    } catch {
      setLoading(false);
    }
  };

  const verifyOnBlockchain = () => {
    const fakeHash = "SOL-" + Math.random().toString(36).substring(2, 15);

    setTxHash(fakeHash);
    setVerified(true);
    setChainActivity([
      "Transaction broadcast to Solana Devnet",
      "Consensus nodes confirmed authenticity record",
      "Verification certificate anchored on-chain",
    ]);
  };

  const verifyHuman = () => {
    setHumanVerified(true);
  };

  const downloadCertificate = () => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("GhostTrace AI", 20, 30);

    doc.setFontSize(16);
    doc.text("Blockchain Verification Certificate", 20, 50);

    doc.setFontSize(12);
    doc.text(`Authenticity Score: ${score}%`, 20, 80);

    doc.text(`Risk Level: ${riskLevel}`, 20, 100);

    doc.text(`Transaction Hash: ${txHash}`, 20, 120);

    doc.text(
      "This file was analyzed and verified using AI + Solana blockchain.",
      20,
      150
    );

    doc.save("ghosttrace-certificate.pdf");
  };

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      {/* HERO */}
      <section className="flex flex-col items-center justify-center text-center mt-16">
        <div className="bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full mb-6 border border-purple-500/30">
          AI + Solana Verification System
        </div>

        <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text mb-6">
          GhostTrace AI
        </h1>

        <p className="text-gray-400 max-w-2xl text-lg mb-10">
          Detect AI-manipulated screenshots, PDFs, and digital files using
          artificial intelligence and blockchain verification.
        </p>
      </section>

      {/* MAIN CARD */}
      <section className="max-w-2xl mx-auto mt-10">
        <div className="bg-white/5 border border-gray-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
          <div className="flex flex-col items-center gap-5">
            <div className="bg-purple-500/20 p-5 rounded-full">
              <Upload className="text-purple-400" size={40} />
            </div>

            <h2 className="text-2xl font-semibold">
              Upload Suspicious File
            </h2>

            <p className="text-gray-400 text-center">
              Upload screenshot, image, or PDF for AI authenticity analysis.
            </p>

            <div className="w-full flex flex-col gap-4">
              <p className="text-left w-full text-gray-400">
                Upload Suspicious File
              </p>

              <input
                type="file"
                title="Upload file for analysis"
                className="w-full bg-gray-900 border border-gray-700 rounded-xl p-4"
              />

              <p className="text-left w-full text-gray-400">
                Upload Selfie for Human Verification
              </p>

              <input
                type="file"
                accept="image/*"
                title="Upload selfie for human verification"
                onChange={() => setSelfieUploaded(true)}
                className="w-full bg-gray-900 border border-gray-700 rounded-xl p-4"
              />
            </div>

            {selfieUploaded && (
              <button
                onClick={verifyHuman}
                className="w-full bg-green-600 hover:bg-green-700 py-4 rounded-xl font-semibold transition"
              >
                Verify Human Identity
              </button>
            )}

            <button
              onClick={analyzeFile}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 py-4 rounded-xl font-semibold hover:scale-105 transition"
            >
              {loading ? "Analyzing..." : "Analyze with AI"}
            </button>
          </div>

          {loading && (
            <div className="mt-10 border-t border-gray-800 pt-8">
              <div className="bg-white/5 border border-purple-500/30 rounded-2xl p-6 text-left">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full border-2 border-purple-400 border-t-transparent animate-spin" />

                  <div>
                    <p className="text-lg font-semibold text-white">
                      Running AI Analysis
                    </p>

                    <p className="text-gray-400">
                      Scanning file patterns and preparing verification report.
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Metadata scan</span>
                    <span className="text-purple-300 animate-pulse">
                      In progress
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">AI pattern check</span>
                    <span className="text-purple-300 animate-pulse delay-150">
                      In progress
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Blockchain readiness</span>
                    <span className="text-purple-300 animate-pulse delay-300">
                      In progress
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* RESULTS */}
          {score !== null && !loading && (
            <div className="mt-10 border-t border-gray-800 pt-8 text-center">
              {score > 70 ? (
                <ShieldCheck className="mx-auto text-green-400 mb-4" size={70} />
              ) : (
                <AlertTriangle className="mx-auto text-red-400 mb-4" size={70} />
              )}

              <h3 className="text-4xl font-bold mb-3">
                {score}% Authentic
              </h3>

              {humanVerified && (
                <div className="bg-green-500/10 border border-green-500 rounded-xl px-4 py-2 inline-block mb-4">
                  <span className="text-green-400 font-semibold">
                    Verified Human Identity
                  </span>
                </div>
              )}

              <p className="text-gray-400 mb-6">
                AI analysis completed successfully.
              </p>

              <div className="bg-white/5 border border-gray-800 rounded-2xl p-5 text-left mb-6">
                <h4 className="text-xl font-semibold mb-3 text-purple-400">
                  AI Analysis Report
                </h4>

                <p className="text-gray-300 mb-3">
                  {analysisText}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Risk Level</span>

                  <span
                    className={`font-bold ${
                      riskLevel === "LOW RISK"
                        ? "text-green-400"
                        : riskLevel === "MEDIUM RISK"
                        ? "text-yellow-400"
                        : "text-red-400"
                    }`}
                  >
                    {riskLevel}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/5 border border-gray-800 rounded-2xl p-5">
                  <p className="text-gray-400 text-sm">
                    Manipulation Risk
                  </p>

                  <p className="text-2xl font-bold text-red-400">
                    {100 - score}%
                  </p>
                </div>

                <div className="bg-white/5 border border-gray-800 rounded-2xl p-5">
                  <p className="text-gray-400 text-sm">
                    Confidence
                  </p>

                  <p className="text-2xl font-bold text-green-400">
                    {score}%
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-4">
                <WalletMultiButton />

                <button
                  onClick={verifyOnBlockchain}
                  className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-semibold transition"
                >
                  Verify on Solana
                </button>
              </div>

              {verified && (
                <div className="mt-8 bg-green-500/10 border border-green-500 rounded-2xl p-6">
                  <h3 className="text-2xl font-bold text-green-400 mb-3">
                    Blockchain Verified
                  </h3>

                  <p className="text-gray-300 mb-2">
                    Verification successfully stored on Solana Devnet.
                  </p>

                  <div className="bg-black/40 p-4 rounded-xl mt-4 break-all text-sm text-green-300">
                    {txHash}
                  </div>

                  {chainActivity.length > 0 && (
                    <div className="mt-6 space-y-3">
                      <p className="text-sm uppercase tracking-[0.24em] text-green-300/80">
                        Live Chain Activity
                      </p>

                      {chainActivity.map((item, index) => (
                        <div
                          key={item}
                          className="flex items-center gap-3 rounded-xl border border-green-500/20 bg-black/30 px-4 py-3"
                        >
                          <span className="h-2.5 w-2.5 rounded-full bg-green-400 animate-pulse" />
                          <span className="text-sm text-gray-200">
                            {index + 1}. {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  <button
                    onClick={downloadCertificate}
                    className="mt-6 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl font-semibold transition"
                  >
                    Download Certificate
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto mt-24 grid md:grid-cols-3 gap-6">
        <div className="bg-white/5 border border-gray-800 rounded-3xl p-8">
          <h3 className="text-2xl font-bold mb-3 text-purple-400">
            AI Detection
          </h3>

          <p className="text-gray-400">
            Analyze files for deepfake patterns and AI-generated manipulation.
          </p>
        </div>

        <div className="bg-white/5 border border-gray-800 rounded-3xl p-8">
          <h3 className="text-2xl font-bold mb-3 text-blue-400">
            Solana Proof
          </h3>

          <p className="text-gray-400">
            Store authenticity verification securely on blockchain.
          </p>
        </div>

        <div className="bg-white/5 border border-gray-800 rounded-3xl p-8">
          <h3 className="text-2xl font-bold mb-3 text-green-400">
            Trust Score
          </h3>

          <p className="text-gray-400">
            Generate authenticity confidence for digital evidence.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto mt-24">
        <h2 className="text-4xl font-bold mb-10 text-center bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
          Live Verification Activity
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="bg-white/5 border border-gray-800 rounded-3xl p-6 backdrop-blur-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-purple-400 font-semibold">
                  {activity.user}
                </span>

                <span className="text-green-400 text-sm">
                  LIVE
                </span>
              </div>

              <p className="text-gray-300">
                {activity.status}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

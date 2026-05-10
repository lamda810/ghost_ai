"use client";

import { useEffect, useState } from "react";

export default function WalletErrorBanner() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      const text =
        typeof detail === "string" && detail.toLowerCase().includes("unexpected error")
          ? "Phantom wallet is unavailable or not connected. Please try again or install the extension."
          : String(detail ?? "Wallet connection failed.");

      setMessage(text);
    };

    window.addEventListener("wallet-error", handler as EventListener);
    return () => window.removeEventListener("wallet-error", handler as EventListener);
  }, []);

  if (!message) return null;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => setMessage(null)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setMessage(null);
        }
      }}
      className="max-w-2xl mx-auto mb-6 p-3 bg-red-900/80 border border-red-700 rounded-xl text-sm text-white cursor-pointer"
      title="Click to dismiss"
    >
      <strong>Wallet notice:</strong> {message} <span className="text-red-200">(click to dismiss)</span>
    </div>
  );
}

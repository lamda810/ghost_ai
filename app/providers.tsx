"use client";

import type { ReactNode } from "react";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import "@solana/wallet-adapter-react-ui/styles.css";

const wallets = [new PhantomWalletAdapter()];

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ConnectionProvider endpoint="https://api.devnet.solana.com">
      <WalletProvider
        wallets={wallets}
        autoConnect={false}
        onError={(error) => {
          // Surface adapter errors to console to avoid uncaught WalletConnectionError
          // Keep this minimal for development; replace with user-facing UI as needed.
          const msg = error?.message ?? String(error);
          try {
            if (typeof window !== "undefined") {
              window.dispatchEvent(new CustomEvent("wallet-error", { detail: msg }));
            }
          } catch {
            // swallow any dispatch errors in older browsers
          }
        }}
      >
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

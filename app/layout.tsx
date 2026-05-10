import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "GhostTrace AI",
  description: "AI Manipulation Detection with Solana",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

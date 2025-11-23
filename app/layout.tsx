import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ThemeProvider from "@/components/theme-provider";

export const metadata: Metadata = {
  metadataBase: new URL("https://atepoyo.com"),
  title: {
    default: "atepoyo.com",
    template: "%s | atepoyo.com",
  },
  description: "atepoyoが気ままに綴るブログ。",
  authors: [{ name: "atepoyo" }],
  alternates: {
    types: {
      "application/rss+xml": [
        { title: "atepoyo.com RSS Feed", url: "/rss.xml" },
      ],
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="flex flex-col min-h-screen" suppressHydrationWarning>
        <ThemeProvider>
          <Header />
          <main
            className="flex-grow"
            style={{ paddingTop: "var(--content-top-offset)" }}
          >
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

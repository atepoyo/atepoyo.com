import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ThemeProvider from "@/components/theme-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body
        className="flex flex-col min-h-screen"
        style={{ "--header-height": "6rem" } as React.CSSProperties}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <Header />
          <main
            className="flex-grow container mx-auto px-4 mt-16"
            style={{ paddingTop: "var(--header-height)" }}
          >
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
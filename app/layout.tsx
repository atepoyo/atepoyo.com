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
        suppressHydrationWarning
      >
        <ThemeProvider>
          <Header />
          <main
            className="flex-grow"
            style={{ paddingTop: "var(--content-top-margin)" }}
          >
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata = {
  title: "Glossary App",
  description: "A student glossary app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="container min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

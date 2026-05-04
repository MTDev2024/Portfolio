import "./globals.css";
import Navbar from "@/components/layout/Navbar";

export const metadata = {
  title: "Portfolio - Développeur Frontend",
  description: "Portfolio de développeur React / Next.js",
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <Navbar />
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}

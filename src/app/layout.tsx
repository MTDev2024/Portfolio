import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
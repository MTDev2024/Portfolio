import "./globals.css";

export const metadata = {
  title: "Portfolio",
  description: "Développeur Frontend",
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
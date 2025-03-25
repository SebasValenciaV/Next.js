import "./globals.css";

export const metadata = {
  title: "Mi Sitio Web",
  description: "Descripción de mi sitio web",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}

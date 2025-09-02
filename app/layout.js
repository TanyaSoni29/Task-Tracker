import "./globals.css";

export const metadata = { title: "Todo App" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

export const metadata = {
  title: "GCSE Revision App",
  description: "Free AI GCSE revision app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
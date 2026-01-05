export const metadata = { title: "GCSE Revision App", description: "Free AI-powered GCSE revision" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}

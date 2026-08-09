import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jagnath Sanitaries | Rajkot",
  description: "Sanitaryware, bath fittings, tiles, kitchen sinks and bathroom accessories in Rajkot.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

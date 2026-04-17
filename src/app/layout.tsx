import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import FacebookPixel from "../components/FacebookPixel";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Junior PS | Marketing Especializado para Restaurantes",
  description: "Aceleramos as vendas da sua rede ou franquia com estratégias de marketing gastronômico focadas em resultados. Do tráfego pago à fidelização.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-zinc-950 text-slate-50`}>
        {children}
        <FacebookPixel />
      </body>
    </html>
  );
}

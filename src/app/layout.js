import './globals.css';
import SiteShell from '@/components/prototype/SiteShell';

export const metadata = {
  title: {
    default: 'LIGHTBULB | Precision Utility & B2B Packaging',
    template: '%s | LIGHTBULB',
  },
  description: 'Industrial utility meets refined everyday motion. Engineered in Ifako-Gbagada, Lagos. Premium Everyday Retail Gear & Enterprise Packaging Systems.',
  keywords: [
    'Lightbulb Engineering',
    'Lightbulb Concept',
    'Lightbulb Packaging',
    'Industrial packaging Lagos',
    'Modular Lapdesk',
    'B2B Packaging Nigeria',
  ],
  openGraph: {
    title: 'LIGHTBULB | Precision Utility & B2B Packaging',
    description: 'Industrial utility meets refined everyday motion. Engineered in Ifako-Gbagada, Lagos.',
    siteName: 'Lightbulb Engineering',
    locale: 'en_NG',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
          rel="stylesheet"
        />
      </head>
      <body className="bg-surface text-on-surface antialiased font-sans flex flex-col min-h-screen">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}

import './globals.css'

export const metadata = {
  title: 'Pizza Napoletana Calculator',
  description: 'Calculate precise Neapolitan pizza dough recipes with intelligent timeline scheduling for Ooni ovens',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
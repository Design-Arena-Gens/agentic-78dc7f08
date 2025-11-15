import './globals.css';

export const metadata = {
  title: 'Clothing Co. ? Modern Apparel',
  description: 'A minimal, modern ecommerce clothing store built with Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

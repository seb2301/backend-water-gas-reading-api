import './App.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className='hero-image'>
        {children}
      </body>
    </html>
  );
}

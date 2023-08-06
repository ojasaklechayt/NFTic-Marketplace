import Head from 'next/head';
import './globals.css';

const interStyle = (
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
    rel="stylesheet"
  />
);

const poppinsStyle = (
  <link
    href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap"
    rel="stylesheet"
  />
);

export const metadata = {
  title: 'NFTic Marketplace',
  description: 'Show your NFT love',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        {interStyle}
        {poppinsStyle}
      </Head>
      <body>{children}</body>
    </html>
  );
}

import './globals.css';

export const metadata = {
  title: 'NFTic Marketplace',
  description: 'Show your NFT love',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

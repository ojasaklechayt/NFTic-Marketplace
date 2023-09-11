import './globals.css';
import { metadata } from './metadata';
import { BlockchainProvider } from './Context/AppConfig';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>NFTic Marketplace</title>
        <link rel="stylesheet" href="your-stylesheet.css" />
      </head>
      <body>
        <BlockchainProvider>{children}</BlockchainProvider>
      </body>
    </html>
  );
}

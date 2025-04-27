import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        {/* Removed viewport meta tag as it should be in _app.js instead */}
        <meta name="description" content="Opticare - Your path to clearer vision starts here. Professional eye care services and vision solutions." />
        <meta name="keywords" content="opticare, eye care, vision, ophthalmology, optometry" />
        <meta name="theme-color" content="#0077b6" />
        
        {/* Open Graph / Facebook - Helps with link previews when shared on Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://danledan.vercel.app/" />
        <meta property="og:title" content="Opticare - Professional Eye Care Services" />
        <meta property="og:description" content="Your path to clearer vision starts here. Book your appointment today." />
        
        {/* Twitter - Helps with link previews when shared on Twitter */}
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:url" content="https://danledan.vercel.app/" />
        <meta property="twitter:title" content="Opticare - Professional Eye Care Services" />
        <meta property="twitter:description" content="Your path to clearer vision starts here. Book your appointment today." />

        {/* Favicon */}
        <link rel="icon" href="/opto2.ico" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

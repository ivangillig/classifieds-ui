// components/Head.js
import NextHead from "next/head";
import { string } from "prop-types";

const defaultDescription = "";
const defaultOGURL = "";
const defaultOGImage = "";

const appName = process.env.NEXT_PUBLIC_APP_NAME || "ClassifiedsApp";

const Head = ({ title, description, url, ogImage }) => (
  <NextHead>
    <meta charSet="UTF-8" />
    <title>{title ? `${appName} - ${title}` : appName}</title>
    <meta name="description" content={description || defaultDescription} />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="shortcut icon" href="/static/favicon/favicon.png" />
    <meta name="msapplication-TileColor" content="#ffffff" />
    <meta name="msapplication-config" content="/static/favicon/browserconfig.xml" />
    <meta name="theme-color" content="#ffffff" />
    <meta property="og:url" content={url || defaultOGURL} />
    <meta property="og:title" content={title || appName} />
    <meta property="og:description" content={description || defaultDescription} />
    <meta name="twitter:site" content={url || defaultOGURL} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={ogImage || defaultOGImage} />
    <meta property="og:image" content={ogImage || defaultOGImage} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
  </NextHead>
);

Head.propTypes = {
  title: string,
  description: string,
  url: string,
  ogImage: string,
};

export default Head;

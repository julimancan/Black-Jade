import Head from "next/head";

const SeoHeader = ({ title, description, pageBgColor, url }) => {
  return (
    <Head>
      <title>{title}</title>

      <meta
        name="apple-mobile-web-app-status-bar"
        content={pageBgColor || "#ffffff"}
      />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />

      <meta name="description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} key="ogtitle" />
      <meta property="og:site_name" content={title} key="ogsitename" />
      <meta property="og:description" content={description} key="ogdesc" />
    </Head>
  );
};

export default SeoHeader;

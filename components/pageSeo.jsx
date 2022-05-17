import Head from "next/head";

const PageSeo = ({ title, description, pageBgColor, url }) => {
  return (
    <Head>
      {title && (
        <>
          <title>{title}</title>
          <meta property="og:title" content={title} key="ogtitle" />
          <meta property="og:site_name" content={title} key="ogsitename" />
        </>
      )}
      {description && (
        <>
          <meta name="description" content={description} />
          <meta property="og:description" content={description} key="ogdesc" />
        </>
      )}
      {pageBgColor && (
        <meta
          name="apple-mobile-web-app-status-bar"
          content={pageBgColor || "#ffffff"}
        />
      )}
      {url && <meta property="og:url" content={url} />}
    </Head>
  );
};

export default PageSeo;

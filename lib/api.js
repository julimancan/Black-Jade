import client from "./sanity";
// import  imageUrlBuilder from "@sanity/image-url";


const siteSettingsItems = `
title,
description,
"favicon": favicon{alt, "url": asset->url},
"h1": h1->{title, "fontUrl": fontFile.asset->url},
menuTextColor,
menuBgColor,
instagramAccountLink,
facebookAccountLink,
`;

export const getSiteSettings = async () => {
  const results = await client.fetch(`*[_type == "siteSettings"] {
    ${siteSettingsItems}
  }`);
  return results[0];
};

// const builder = imageUrlBuilder(client);


// export function urlFor(source) {
//   return builder.image(source);
// };


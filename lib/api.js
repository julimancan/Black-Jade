import client from "./sanity";
// import  imageUrlBuilder from "@sanity/image-url";

const siteSettingsItems = `
title,
description,
"favicon": favicon.asset->url,
"fonts": fonts{
  "h1": h1->{title, "fontUrl": fontFile.asset->url},
  "h2": h2->{title, "fontUrl": fontFile.asset->url},
  "p": p->{title, "fontUrl": fontFile.asset->url},
},
"colors": colors{
  menuBgColor,
  menuBarColor,
  menuTextColor,
  homepageTextColor
},
instagramAccountLink,
facebookAccountLink,
`;

export const getSiteSettings = async () => {
  const results = await client.fetch(`*[_type == "siteSettings"] {
    ${siteSettingsItems}
  }`);
  return results[0];
};

const homepageItems = `
  "links": links[]{
    linkName,
    linkTo
  },
  "bgPhotos": cloudinaryList[]{
    height,
    width,
    url
  }
`;
export const getHomepageItems = async () => {
  const results = await client.fetch(`*[_type == "homepage"] {
    ${homepageItems}
  }`);
  return results[0];
};


const navigationItems = `
  title,
  items[]{
    linkName, 
    linkTo
  }
`;

export const getNavigationMenu = async () => {
  const results = await client.fetch(`*[_type == "navigationMenu"] {
    ${navigationItems}
  }`);
  return results[0];
};

const artItems = `
  title, 
  description,
  "images": imagesLocal[] { alt, "url": cloudImage.asset->url },
  "animations": animations[] { alt, "url": youtubeLink}
`;

export const getArtContent = async () => {
  const results = await client.fetch(`*[_type == "art"] {
    ${artItems}
  }`);
  return results[0];
};

// const builder = imageUrlBuilder(client);

// export function urlFor(source) {
//   return builder.image(source);
// };

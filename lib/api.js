import client from "./sanity";
import imageUrlBuilder from "@sanity/image-url";

const siteSettingsItems = `
title,
description,
email,
"logo": favicon.asset->url,
"faviconZip": faviconZip.asset->url,
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
  "animations": animations[] { 
    alt, 
    "url": youtubeLink, 
    uploadOrLink, 
    "upload": animationUpload.asset->url
 }
`;

export const getArtContent = async () => {
  const results = await client.fetch(`*[_type == "art"] {
    ${artItems}
  }`);
  return results[0];
};

const photoItems = `
  title,
  description,
  weddings[]{"url": asset->url},
  portraits[]{"url": asset->url}
`;

export const getPhotoContent = async () => {
  const results = await client.fetch(`*[_type == "photoContent"] {
    ${photoItems}
  }`);
  return results[0];
};

const videoItems = `
  seo,
  "videos": videoList[]->{
    title,
    url,
    description
  }
`;

export const getVideosPageContent = async () => {
  const results = await client.fetch(`*[_type == "videoPage"] {
    ${videoItems}
  }`);
  return results[0];
};

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}
const clientInfo = `
  name,
  password,
  downloadable,
  heroSection{
    title,
    subtitle,
    "photo": image{
      width,
      height,
      secure_url
    }
  }
`;

const slugQuery = `
  *[_type == "clients"]{
    "slug": clientFolder
  }
`;
export const getAllClientsSlugs = async () => {
  const results = await client.fetch(slugQuery);
  console.log("here", results);
  return results;
};

export const getClientBySlug = async (slug) => {
  const results = await client.fetch(
    `*[_type == "clients" && clientFolder == $slug]{
    ${clientInfo}
    }`,
    { slug }
  );
  return results[0];
};

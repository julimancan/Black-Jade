// import { Cloudinary } from "@cloudinary/url-gen";

//  const cloudinary = new Cloudinary({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY, // add your api_key
//   api_secret: process.env.CLOUD_API_SECRET, // add your api_secret
//   secure: true
// })

export const getCloudImages = async (options = {}) => {
  const params = { ...options };

  if (options.nextCursor) {
    params.next_cursor = options.nextCursor;
    delete params.nextCursor;
  }
  const paramString = Object.keys(params)
    .map((key) => `${key}=${encodeURIComponent(params[key])}`)
    .join("&");
  console.log(paramString);
  const results = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/resources/image?${paramString}&max_length=100`,
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          process.env.CLOUD_API_KEY + ":" + process.env.CLOUD_API_SECRET
        ).toString("base64")}`,
      },
    }
  ).then((res) => res.json());

  return results;

  // const folderImages = resources.filter(resource => resource.folder === folder);
  // return folderImages;

  // return cloudinary.v2.api.resources({
  //   type: "upload",
  //   prefix: folder,
  // })
};

export const search = async (options = {}) => {
  const params = {
    ...options,
  };

  if (options.nextCursor) {
    params.next_cursor = options.nextCursor;
    delete params.nextCursor;
  }

  const paramString = Object.keys(params)
    .map((key) => `${key}=${encodeURIComponent(params[key])}`)
    .join("&");

  const results = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/resources/search?${paramString}`,
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          process.env.CLOUD_API_KEY +
            ":" +
            process.env.CLOUD_API_SECRET
        ).toString("base64")}`,
      },
    }
  ).then((r) => r.json());

  return results;
};

export const getFolders = async () => {
  const results = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/folders`,
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          process.env.CLOUD_API_KEY + ":" + process.env.CLOUD_API_SECRET
        ).toString("base64")}`,
      },
    }
  ).then((res) => res.json());

  return results;
};

export const mapImageResources = (resources) => {
  const images = resources.map((resource) => {
    const { width, height } = resource;
    return {
      id: resource.asset_id,
      title: resource.public_id,
      imageUrl: resource.secure_url,
      width,
      height,
    };
  });
  return images;
};

/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  env: {
    SANITY_DATASET_NAME: process.env.SANITY_DATASET_NAME,
    SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
    BASE_URL: process.env.BASE_URL,
    CLOUD_NAME: process.env.CLOUD_NAME,
  },
  images: {
    domains: ['res.cloudinary.com', "cdn.sanity.io", "img.youtube.com"],
  },
  compiler: {
    styledComponents: true
  },
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname
  }
}

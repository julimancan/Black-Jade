
module.exports = {
  reactStrictMode: true,
  env: {
    SANITY_DATASET_NAME: process.env.SANITY_DATASET_NAME,
    SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID
  },
  images: {
    domains: ['res.cloudinary.com', "cdn.sanity.io"],
  },
  compiler: {
    styledComponents: true
  },
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname
  }
}

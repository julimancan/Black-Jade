export const getYoutubeId = (youtubeLink) => {
  const answer = youtubeLink;
  return answer.split("v=")[1];
};

export const getAspectRatio = (url) => {
  const [width, length] = url.split("-")[1].split(".")[0].split("x");
  return Number(width) / Number(length);
};

export const securePhoto = url => `https${url.split("http")[1]}`;


export const addFlAttachmentToCloudinaryImageUrl = (imageUrl) => {
  const [cloudAddress, imageAddress] = imageUrl.split("/upload")
  return `${cloudAddress}/upload/fl_attachment${imageAddress}`; 
}

export const buildThresholdArray = () => Array.from(Array(100).keys(), (i) => i / 100);

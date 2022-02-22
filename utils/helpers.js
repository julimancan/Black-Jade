export const getYoutubeId = (youtubeLink) => {
  const answer = youtubeLink;
  return answer.split("v=")[1];
};

export const getAspectRatio = (url) => {
  const [width, length] = url.split("-")[1].split(".")[0].split("x");
  return Number(width) / Number(length);;
};

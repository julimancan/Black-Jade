export const getYoutubeId = (youtubeLink) => {
  const answer = youtubeLink;
  return answer.split("v=")[1];
}

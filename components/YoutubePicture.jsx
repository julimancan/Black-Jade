
const YoutubePicture = ({ youtubeId, alt, classNames }) => {

  const mainUrl = `http://img.youtube.com/vi/${youtubeId}/`

  // define the version of image to be used options are hqdefault, mqdefault, sddefault, maxresdefault or 0 for default all .jpg

  const mobileUrl = `${mainUrl}maxresdefault.jpg`
  const tabletUrl = `${mainUrl}maxresdefault.jpg`
  const desktopUrl = `${mainUrl}0.jpg`

  return (
    <picture className={`${classNames || ""}`}>
      <source
        media="(max-width: 700px)"
        srcSet={mobileUrl}
      />
      <source
        media="(min-width: 800px) (max-width: 1199px)"
        srcSet={tabletUrl}
      />
      <source
        media="(min-width: 1200px)"
        srcSet={desktopUrl}
      />

      <img
        src={desktopUrl}
        alt={alt}
      />
    </picture>
  );
};

export default YoutubePicture;

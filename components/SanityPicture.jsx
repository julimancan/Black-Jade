import { urlFor } from "../lib/api";

const SanityPicture = ({ image, alt, smWidth, smHeight, mdWidth, mdHeight, lgWidth, lgHeight, classNames }) => {
  // const [smWidth, smHeight] = sm;
  // const [mdWidth, mdHeight] = md;
  // const [lgWidth, lgHeight] = lg;
  return (
    <picture className={`${classNames || ""}`}>
      <source
        media="(max-width: 699px)"
        srcSet={urlFor(image)
          .dataset("production")
          .width(smWidth || 200)
          .height(smHeight || 200)
          .url()}
      />
      <source
        media="(min-width: 700px) (max-width: 1199px)"
        srcSet={urlFor(image)
          .dataset("production")
          .width(mdWidth || 300)
          .height(mdHeight || 300)
          .url()}
      />
      <source
        media="(min-width: 1200px)"
        srcSet={urlFor(image)
          .dataset("production")
          .width(lgWidth || 400)
          .height(lgHeight || 400)
          .url()}
      />

      <img
        src={urlFor(image).dataset("production").width(smWidth || 450).height(smHeight || 450).url()}
        alt={alt}
      />
    </picture>
  );
};

export default SanityPicture;

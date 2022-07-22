import {
  getAllClientsSlugs,
  getClientBySlug,
  getNavigationMenu,
  getSiteSettings,
} from "../../lib/api";
import { mapImageResources } from "../../lib/cloudinary";
import styled from "@emotion/styled";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useGlobalState } from "../../state";
import { BsDownload } from "react-icons/bs";
import {
  addFlAttachmentToCloudinaryImageUrl,
  buildThresholdArray,
} from "../../utils/helpers";
import { useIntersect } from "../../utils/useIntersect";
import { search } from "../../lib/cloudinary";

const StyledClientPage = styled.main`
  margin-top: 0 !important;
  overflow-x: unset;

  header {
    display: flex;
    width: 100%;
    background-color: black;
    position: relative;
    span {
      width: 100vw !important;
      aspect-ratio: 16/9;
      background: rgba(0, 0, 0, black);
      img {
        opacity: 0.8;
      }
    }
    section {
      position: absolute;
      color: white !important;
      top: 50%;
      transform: translateY(-50%);
      text-align: center;
      h1 {
        font-size: 2.5rem;
        color: white;
        margin: 2rem;
      }
      button {
        background-color: transparent;
        border: 2px solid white;
        color: white;
        padding: 0.5rem 1rem;
        margin: 2rem;
        cursor: pointer;
        border-radius: 0 !important;
      }
    }
  }
  .image-collection {
    display: grid;
    padding: 0 10px;
    margin-top: 1rem !important;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-auto-flow: dense;
    li {
      position: relative;
      span {
        width: 100% !important;
        height: 100% !important;
      }
      svg {
        position: absolute;
        top: 1%;
        right: 2%;
        cursor: pointer;
      }
    }
  }
`;

const GridItem = styled.li`
  @media (min-width: 700px) {
    grid-row: ${({ vertical }) => (vertical ? "span 3" : "span 1")};
    grid-column: ${({ vertical }) => (vertical ? "span 1" : "span 1")};

    aspect-ratio: ${({ vertical }) => (vertical ? "9/16" : "16/9")};
  }
`;

export const getStaticPaths = async () => {
  const clients = await getAllClientsSlugs();
  const paths = clients.map((client) => ({
    params: { slug: client.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const { slug } = params;

  const clientImages = await search({
    method: "POST",
    body: JSON.stringify({
      expression: `folder="Clients/${slug}"`,
    })
  })

  const cloudinary = require("cloudinary").v2;

  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
    secure: true,
  });
  const zipDownloadUrl = await cloudinary.utils.download_folder(
    `Clients/${slug}`,
    { flatten_folders: true, target_public_id: slug },
    (error, result) => result
  );
  const { resources, next_cursor: nextCursor } = clientImages;

  const newImages = mapImageResources(resources);

  const clientInfo = await getClientBySlug(slug);

  const siteConfig = await getSiteSettings();
  const navMenuItems = await getNavigationMenu();

  return {
    props: {
      clientImages: newImages,
      clientInfo,
      nextCursor: nextCursor || "",
      siteConfig,
      navMenuItems,
      zipDownloadUrl,
      slug,
    },
  };
};

const Client = ({
  clientImages: defaultImages, // = null
  clientInfo, // = null
  nextCursor: defaultNextCursor, // = null
  siteConfig, // = null
  navMenuItems, // = null
  slug, // = null
  zipDownloadUrl, // = null
}) => {
  const [nextCursor, setNextCursor] = useState(defaultNextCursor || "");
  const [needsLoading, setNeedsLoading] = useState(true);
  const [images, setImages] = useState(defaultImages);

  const gridRef = useRef();
  const setSiteSettings = useGlobalState("siteSettings")[1];
  const setNavMenuItems = useGlobalState("navMenuItems")[1];

  useEffect(() => {
    setSiteSettings(siteConfig);
    setNavMenuItems(navMenuItems.items);
  }, []);

  // used for loading when user reaches end of the page

  const [ref, entry] = useIntersect({
    threshold: buildThresholdArray(),
  });

  const handleLoadMore = async () => {
    if (nextCursor === "") return;

    const results = await fetch(`/api/searchCloudinary`, {
      method: "POST",
      body: JSON.stringify({
        nextCursor,
        expression: `folder="Clients/${slug}"`,
      }),
    }).then((res) => res.json());

    const { resources, next_cursor: nextPageCursor } = results;

    if (!nextPageCursor) return;

    setNextCursor(nextPageCursor);

    const newImages = mapImageResources(resources);
    setImages([...images, ...newImages]);

    setNeedsLoading(true);
  };

  const scrollToGallery = () => {
    gridRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  if (needsLoading) {
    if (entry.isIntersecting) {
      handleLoadMore();
      setNeedsLoading(false);
    }
  }
  return (
    <StyledClientPage>
      <header>
        <Image
          src={clientInfo.heroSection.photo.secure_url}
          alt={clientInfo.heroSection.title}
          width={clientInfo.heroSection.photo.width}
          height={clientInfo.heroSection.photo.height}
          objectFit="cover"
        />
        <section>
          <h1>{clientInfo.heroSection.title}</h1>
          <h2>{clientInfo.heroSection.subtitle}</h2>
          <button onClick={scrollToGallery}>View Gallery</button>
          {clientInfo.downloadable && (
            <a href={zipDownloadUrl} download="file-name">
              <button>Download All</button>
            </a>
          )}
        </section>
      </header>
      <ul className="image-collection" ref={gridRef}>
        {images.map((image, i) => {
          return (
            <GridItem key={image.id} vertical={image.height / image.width > 1}>
              <Image
                src={image.imageUrl}
                objectFit="cover"
                alt={`${clientInfo.name}-${i}`}
                height={image.height}
                width={image.width}
              />
              {clientInfo.downloadable && (
                <a
                  href={addFlAttachmentToCloudinaryImageUrl(image.imageUrl)}
                  download
                  target="_blank"
                  rel="noreferrer"
                >
                  <BsDownload />
                </a>
              )}
              {i === images.length - 1 && <div ref={ref} />}
            </GridItem>
          );
        })}
      </ul>
    </StyledClientPage>
  );
};

export default Client;

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
import { addFlAttachmentToCloudinaryImageUrl } from "../../utils/helpers";

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
    /* /* grid-template-columns: 1fr 1fr; */
    padding: 0 30px;

    /* margin-top: 1rem !important;
    grid-template-columns: 1fr;
    @media (min-width: 700px) {
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }
    @media (min-width: 950px) {
      grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
      grid-template-rows: repeat(auto-fit, 1000px);
    } */

    display: block;

    /* columns: 2 minmax(200px, 400px);
    @media (min-width: 700px) {
      columns: 3 minmax(200px, 400px);
    }
    @media (min-width: 1200px) {
    } */
    /* columns: 5 minmax(200px, 400px); */

    /* grid-template-rows: repeat(auto-fit, minmax(calc(4*160px), 1fr)); */
    /* grid-auto-flow: dense; */
    /* grid-auto-rows: minmax(min(500px, 100%), 1fr); */
    /* grid-gap: 2px; */
    /* grid-auto-rows: min-max(80px, auto); */
    /* grid-auto-flow: dense; */
    padding: 0 10px;

    margin-top: 1rem !important;
    /* grid-template-columns: repeat(auto-fit, 1fr); */
    /* grid-template-columns: repeat(4, 1fr); */

    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-auto-flow: dense;
    grid-auto-rows: minmax(min(100px, 100%), 1fr);
    li {
      position: relative;
      /* height: 100%; */
      span {
        width: 100% !important;
        height: 100% !important;
        /* width: fit-content !important; */
        /* height: fit-content !important; */
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
  const clientImages = await fetch(
    `${process.env.BASE_URL}/api/searchCloudinary`,
    {
      method: "POST",
      body: JSON.stringify({
        expression: `folder="Clients/${slug}"`,
      }),
    }
  ).then((res) => res.json());

  const cloudinary = require("cloudinary").v2;

  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY, // add your api_key
    api_secret: process.env.CLOUD_API_SECRET, // add your api_secret
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
      nextCursor,
      siteConfig,
      navMenuItems,
      zipDownloadUrl,
    },
  };
};

const Client = ({
  clientImages: defaultImages,
  clientInfo,
  nextCursor: defaultNextCursor,
  siteConfig,
  navMenuItems,
  zipDownloadUrl,
}) => {
  const [nextCursor, setNextCursor] = useState(defaultNextCursor);
  const [images, setImages] = useState(defaultImages);
  const gridRef = useRef();
  const setSiteSettings = useGlobalState("siteSettings")[1];
  const setNavMenuItems = useGlobalState("navMenuItems")[1];
  useEffect(() => {
    setSiteSettings(siteConfig);
    setNavMenuItems(navMenuItems.items);
  }, []);

  const handleLoadMore = async (e) => {
    e.preventDefault();
    const results = await fetch(`/api/searchCloudinary`, {
      method: "POST",
      body: JSON.stringify({
        nextCursor,
      }),
    }).then((res) => res.json());
    const { resources, next_cursor: nextPageCursor } = results;
    const newImages = mapImageResources(resources);
    setImages([...images, ...newImages]);
    setNextCursor(nextPageCursor);
  };

  const scrollToGallery = () => {
    gridRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
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
        </section>
      </header>
      {clientInfo.downloadable && (
        <a href={zipDownloadUrl} download="file-name">
          <button>Download All</button>
        </a>
      )}
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
                >
                  <BsDownload />
                </a>
              )}
            </GridItem>
          );
        })}
      </ul>
      <button onClick={handleLoadMore}>Load More</button>
    </StyledClientPage>
  );
};

export default Client;

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

const StyledClientPage = styled.main`
  * {
    /* border: 1px solid blue; */
  }
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
    /* grid-template-columns: 1fr 1fr;
    padding: 0 30px; */
    margin-top: 1rem !important;
    grid-template-columns: repeat(auto-fit, 1fr);
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

    grid-auto-flow: dense;
    grid-auto-rows: minmax(min(400px, 100%), 1fr);
    /* grid-gap: 2px; */
    /* grid-auto-rows: min-max(80px, auto); */
    /* grid-auto-flow: dense; */
    li {
      position: relative;
      height: 100%;
      width: 100%;
      /* background-color: red; */
      display: flex;
      justify-content: center;
    }
  }
`;

const GridItem = styled.li`
  grid-row: ${({vertical}) => vertical ? "span 2" : "span 1"};
  grid-column: ${({vertical}) => vertical ? "span 1" : "span 2"};

  aspect-ratio: ${({vertical}) => vertical ? "9/16" : "16/9"};
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
    },
  };
};

const Client = ({
  clientImages: defaultImages,
  clientInfo,
  nextCursor: defaultNextCursor,
  siteConfig,
  navMenuItems,
}) => {
  console.log({
    defaultImages,
    clientInfo,
    defaultNextCursor,
    siteConfig,
    navMenuItems,
  });
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
            </GridItem>
          );
        })}
      </ul>
      <button onClick={handleLoadMore}>Load More</button>
    </StyledClientPage>
  );
};

export default Client;

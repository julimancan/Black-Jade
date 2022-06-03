import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import {
  getCloudImages,
  getFolders,
  mapImageResources,
} from "../lib/cloudinary";

const StyledPhotoTest = styled.main`
  .image-grid {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(2, minmax(200px, 1fr));
    li {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
  img {
    height: 300px;
    width: 300px;
    object-fit: cover;
  }
`;

export async function getStaticProps(ctx) {
  const cloudImages = await getCloudImages();
  const { resources, next_cursor: nextCursor } = cloudImages;
  const { folders } = await getFolders();

  const images = mapImageResources(resources);
  return {
    props: {
      images,
      nextCursor,
      folders,
    },
  };
}
const photoTest = ({
  images: defaultImages,
  nextCursor: defaultNextCursor,
  folders,
}) => {
  const [images, setImages] = useState(defaultImages);
  const [nextCursor, setNextCursor] = useState(defaultNextCursor);
  const [activeFolder, setActiveFolder] = useState();

  console.log(images);
  const handleOnFolderClick = (e) => {
    const folderPath = e.target.dataset.folderPath;
    setActiveFolder(folderPath);
    console.log(folderPath);
    setNextCursor(undefined);
    setImages([]);
    // setTotalCount(0);
  };

  useEffect(() => {
    (async function run() {
      const results = await fetch(`/api/searchCloudinary`, {
        method: "POST",
        body: JSON.stringify({
          expression: `folder="${activeFolder || ""}"`,
        }), 
      }).then((res) => res.json());
      console.log({ results });
      const newImages = mapImageResources(results.resources);
      setImages(newImages);
    })();
  }, [activeFolder]);
  const handleLoadMore = async (e) => {
    e.preventDefault();
    const results = await fetch(`api/cloudImages`, {
      method: "POST",
      body: JSON.stringify({
        nextCursor,
      }),
    }).then((res) => res.json());
    const { resources, next_cursor: nextPageCursor } = results;

    const newImages = mapImageResources(resources);
    setNextCursor(nextPageCursor);

    setImages([...images, ...newImages]);
  };
  return (
    <StyledPhotoTest>
      Enter
      <ul onClick={handleOnFolderClick}>
        {folders.map((folder) => {
          const isActive = folder.path === activeFolder;
          return (
            <li key={folder.path} data-active-folder={isActive}>
              <button data-folder-path={folder.path}>{folder.name}</button>
            </li>
          );
        })}
      </ul>
      <ul className="image-grid">
        {images.map((image) => (
          <li key={`asset-id-${image.id}`}>
            <img src={image.imageUrl} alt={image.title} />
            <h2>{image.title}</h2>
          </li>
        ))}
      </ul>
      <p>
        <button onClick={handleLoadMore}>Load More</button>
      </p>
    </StyledPhotoTest>
  );
};

export default photoTest;

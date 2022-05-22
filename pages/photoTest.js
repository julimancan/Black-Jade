import { useEffect, useState } from "react";
import { getCloudImages, getFolders, mapImageResources } from "../lib/cloudinary";

export async function getStaticProps(ctx){
  const cloudImages = await getCloudImages();
  const { resources, next_cursor: nextCursor } = cloudImages;
  const { folders } = await getFolders();
  
  const images = mapImageResources(resources);
  return {
    props:{
      images,
      nextCursor,
      folders
    }
  }
}
const photoTest = ({images: defaultImages, nextCursor: defaultNextCursor, folders}) => {
  const [images, setImages] = useState(defaultImages);
  const [nextCursor, setNextCursor] = useState(defaultNextCursor);
  const [activeFolder, setActiveFolder] = useState();

  
  console.log({images, nextCursor, folders});
  useEffect(()=> {
    (async function run() {
      const results = await fetch(`api/cloudImages`, {
        method: "POST",
        body: JSON.stringify({
          expression: `folder="Portraits"`
        })
      }).then(res => res.json());
      console.log({results});
      setImages(results.resources);
    })()
  }, [])
  return (
    <div>
      Enter
      <ul>
          {folders.map(folder => {
            // const isActive = folder.path === activeFolder;
            return (
              <li key={folder.path}>
                <button data-folder-path={folder.path} >{ folder.name }</button>
              </li>
            )
          })}
        </ul>

    </div>
  );
}


export default photoTest;
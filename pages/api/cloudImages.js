import { getCloudImages } from "../../lib/cloudinary";

export default async function handler (req, res) {
  const params = JSON.parse(req.body);

  const results = await getCloudImages(params);
  res.status(200).json({...results});

}
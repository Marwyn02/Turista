import { Request, Response } from "express";
import Post from "@/models/Post";

interface AmenityArray {
  name: string;
  description: string;
  checked: boolean;
}

interface ImageArray {
  image: string;
  public_id: string;
}

interface EditedPostObject {
  id: string;
  image: ImageArray[];
  title: string;
  coordinate: {
    lng: number;
    lat: number;
  };
  location: string;
  description: string;
  amenities: AmenityArray[];
}

export default async function Edit(
  req: Request,
  res: Response
): Promise<Response> {
  const {
    id,
    image,
    title,
    coordinate,
    location,
    description,
    amenities,
  }: EditedPostObject = req.body;

  try {
    const result = await Post.findByIdAndUpdate(id, {
      $set: {
        title: title,
        image: image,
        coordinate: coordinate,
        location: location,
        description: description,
        amenities: amenities,
      },
    });

    await result.save();

    return res.status(200).json({
      success: true,
      message: `Post ID:${id} has been updated successfully!`,
      redirect: `/${id}`,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: `Post ID:${id} updation failed, `,
      error,
    });
  }
}

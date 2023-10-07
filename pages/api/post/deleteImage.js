export default async function deleteImage(req, res) {
  console.log(req);

  const cloud_name = process.env.CLOUD_NAME;
  const api_key = process.env.CLOUD_API_KEY;

  const baseUrl = `https://api.cloudinary.com/v1_1/${cloud_name}/image/destroy`;

  const deleteRequests = req.map(async (reqs) => {
    const url = `${baseUrl}?public_id=${reqs.public_id}&api_key=${api_key}`;

    const response = await fetch(url, {
      method: "DELETE",
    });

    if (response.ok) {
      console.log(`Image with public_id ${reqs} deleted successfully`);
    } else {
      console.error(`Failed to delete image with public_id ${reqs}`);
    }
  });
  await Promise.all(deleteRequests);

  console.log("All images deleted successfully");
}

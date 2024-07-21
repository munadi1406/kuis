import fs from 'fs';
import path from 'path';
import { v4 } from 'uuid';
import { fileURLToPath } from 'url';
export { renderers } from '../../renderers.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const POST = async ({ params, request, url }) => {
  const data = await request.formData();
  const file = data.get("image");
  if (!file) {
    return new Response(
      JSON.stringify({ message: "No file uploaded" }),
      { status: 400 }
    );
  }
  const buffer = await file.arrayBuffer();
  const fileExtension = path.extname(file.name);
  const uniqueFileName = `_${v4()}${fileExtension}`;
  const dirPath = path.resolve(__dirname, "images");
  const filePath = path.join(dirPath, uniqueFileName);
  console.log("Current directory:", __dirname);
  console.log("Target directory:", dirPath);
  console.log("Target file path:", filePath);
  try {
    if (!fs.existsSync(dirPath)) {
      console.log("Directory does not exist, creating...");
      fs.mkdirSync(dirPath, { recursive: true });
      if (fs.existsSync(dirPath)) {
        console.log("Directory created successfully.");
      } else {
        console.log("Failed to create directory.");
      }
    } else {
      console.log("Directory already exists.");
    }
  } catch (err) {
    console.error("Failed to create directory:", err);
    console.log(err);
  }
  try {
    fs.writeFileSync(filePath, Buffer.from(buffer));
    const fileUrl = `${"https://4321-idx-kuis-1721514690989.cluster-7ubberrabzh4qqy2g4z7wgxuw2.cloudworkstations.dev/"}api/image?name=${uniqueFileName}`;
    return new Response(
      JSON.stringify({
        success: 1,
        file: {
          url: fileUrl,
          name: uniqueFileName,
          size: file.size
        }
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("File upload error:", error);
    return new Response(
      JSON.stringify({ message: "File upload failed" }),
      { status: 500 }
    );
  }
};
const GET = async ({ params, url }) => {
  const imageName = url.searchParams.get("name");
  if (!imageName) {
    return new Response(
      JSON.stringify({ message: "Image name is required" }),
      { status: 400 }
    );
  }
  const imagePath = path.join(__dirname, "images", imageName);
  try {
    const image = fs.readFileSync(imagePath);
    const ext = path.extname(imageName).substring(1);
    const mimeType = ext === "jpg" ? "jpeg" : ext;
    return new Response(image, {
      status: 200,
      headers: {
        "Content-Type": `image/${mimeType}`
      }
    });
  } catch (error) {
    console.error("Error reading image:", error);
    return new Response(
      JSON.stringify({ message: "Image not found" }),
      { status: 404 }
    );
  }
};
const DELETE = async ({ url }) => {
  const imageName = url.searchParams.get("name");
  if (!imageName) {
    return new Response(
      JSON.stringify({ message: "Image name is required" }),
      { status: 400 }
    );
  }
  const imagePath = path.join(__dirname, "images", imageName);
  try {
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
      return new Response(
        JSON.stringify({ message: "Image deleted successfully" }),
        { status: 200 }
      );
    } else {
      return new Response(
        JSON.stringify({ message: "Image not found" }),
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error deleting image:", error);
    return new Response(
      JSON.stringify({ message: "Failed to delete image" }),
      { status: 500 }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  GET,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

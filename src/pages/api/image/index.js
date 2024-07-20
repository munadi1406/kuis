import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from 'uuid';



export const POST = async ({ params, request, url }) => {
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
  const uniqueFileName = `${uuidv4()}${fileExtension}`;
  const filePath = path.join(process.cwd(), "public", "images", uniqueFileName);

  // Ensure the directory exists
  const dirPath = path.dirname(filePath);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  try {
    fs.writeFileSync(filePath, Buffer.from(buffer));
    
    // const baseUrl = `${url.protocol}://${url.host}`;
    const fileUrl = `${import.meta.env.PUBLIC_BASE_URL}api/image?name=${uniqueFileName}`;
    // const fileUrl = `${baseUrl}/api/image?name=${uniqueFileName}`;

    return new Response(
      JSON.stringify({
        success: 1,
        file: {
          url: fileUrl,
          name: uniqueFileName,
          size: file.size,
        },
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




export const GET = async ({ params ,url}) => {
    const imageName = url.searchParams.get('name');

  if (!imageName) {
    return new Response(
      JSON.stringify({ message: 'Image name is required' }),
      { status: 400 }
    );
  }

  const imagePath = path.join(process.cwd(), 'public', 'images', imageName);

  try {
    const image = fs.readFileSync(imagePath);
    const ext = path.extname(imageName).substring(1);
    const mimeType = ext === 'jpg' ? 'jpeg' : ext;

    return new Response(image, {
      status: 200,
      headers: {
        'Content-Type': `image/${mimeType}`
      }
    });
  } catch (error) {
    console.error('Error reading image:', error);
    return new Response(
      JSON.stringify({ message: 'Image not found' }),
      { status: 404 }
    );
  }
};


export const DELETE = async ({ url }) => {
    // Ambil nama gambar dari query parameter 'name'
    const imageName = url.searchParams.get('name');
  
    if (!imageName) {
      return new Response(
        JSON.stringify({ message: 'Image name is required' }),
        { status: 400 }
      );
    }
  
    // Tentukan path gambar
    const imagePath = path.join(process.cwd(), 'public', 'images', imageName);
  
    try {
      // Cek apakah file gambar ada
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath); // Hapus file gambar
        return new Response(
          JSON.stringify({ message: 'Image deleted successfully' }),
          { status: 200 }
        );
      } else {
        return new Response(
          JSON.stringify({ message: 'Image not found' }),
          { status: 404 }
        );
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      return new Response(
        JSON.stringify({ message: 'Failed to delete image' }),
        { status: 500 }
      );
    }
  };
import React, { useRef, useEffect, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import edjsHTML from "editorjs-html";

const getImageName = (url) => {
  const parts = url.split('/');
  return parts[parts.length - 1];
};
// extend the image tool to enhance the image removal lifecycle
class CustomImage extends ImageTool {
  removed() {
    // access the image block's file data
    const data = this._data.file.url;
    const imageName = getImageName(data);
    if (imageName) {
      fetch("/api/image?name=" + imageName, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.text())
        .then((data) => {
          // console.log(data)
          // console.log("Hapus Gambar:", data);
        })
        .catch((err) => {
          // console.log("Error:", err.message);
        });
    }
  }
}

const EditorInput = ({ name,onChange,id }) => {
  const editorRef = useRef(null);
  const editorInstance = useRef(null); // Use ref to store the editor instance
  // const saveEditorData = async () => {
  //   try {
  //     // Access editor instance from ref

  //     const savedData = await editorInstance.current.save();
  //     console.log("Editor Data:", savedData);
  //   } catch (error) {
  //     console.error("Failed to save editor data:", error);
  //   }
  // };
  useEffect(() => {
    // Initialize Editor.js and store the instance in a ref
    editorInstance.current = new EditorJS({
      holder: editorRef.current,
      tools: {
        
        image: {
          class: CustomImage,
          config: {
            endpoints: {
              byFile: import.meta.env.PUBLIC_BASE_URL + "api/image",
            },

            onUploadError: (error) => {
              // console.error("Upload Error:", error);
              alert("Failed to upload image: " + error.message);
            },
            onUploadSuccess: (file, response) => {
              // console.log("Upload Successful:", file, response);
            },
          },
        },
      },
      onChange: async (data) => {
        const datas = await data.saver.save();
        onChange({
          target:{
            id,
            name,
            value:datas
          }
        });
      },
    });

    // Clean up editor on component unmount
    return () => {
      editorInstance.current?.destroy();
    };
  }, []);

  return (
    <div>
      <div ref={editorRef} className="border w-full"></div>
    </div>
  );
};

export default EditorInput;

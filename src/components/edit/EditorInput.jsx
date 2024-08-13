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

const EditorInput = ({ name,onChange,id,data,dataLength }) => {
  const editorRef = useRef(null);
  const editorInstance = useRef(null);

  // console.log('editor from',data)

  useEffect(() => {
    // Function to initialize EditorJS
    const initEditor = () => {
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
                alert("Failed to upload image: " + error.message);
              },
            },
          },
        },
        onChange: async () => {
          const savedData = await editorInstance.current.save();
          onChange({
            target: {
              id,
              name,
              value: savedData,
            },
          });
        },
        onReady: () => {
          // Called when the editor is ready
          // console.log("Editor is ready");
  
          // Example of blocks to insert
         
  
          // Insert default blocks
          if (editorInstance.current) {
            editorInstance.current.render({
              blocks: data?.blocks ? data.blocks : [],
            }).catch((error) => {
              console.error("Failed to render default blocks:", error);
            });
          }
        },
       
      });
    };

    // Destroy the previous editor instance if it exists
    if (editorInstance.current) {
      editorInstance.current.isReady
        .then(() => {
          editorInstance.current.destroy();
        })
        .finally(initEditor); // Initialize a new editor after the old one is destroyed
    } else {
      initEditor(); // If no previous instance, just initialize the editor
    }

    // Cleanup on component unmount
    return () => {
      if (editorInstance.current) {
        editorInstance.current.isReady
          .then(() => {
            editorInstance.current.destroy();
          })
          .catch((error) => {
            console.error("Failed to destroy the editor:", error);
          });
      }
    };
  }, [dataLength]);
  


  

  return (
    <div>
      <div ref={editorRef} className="border w-full"></div>
    </div>
  );
};

export default EditorInput;

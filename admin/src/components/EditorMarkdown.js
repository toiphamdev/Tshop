import React, { useState, useCallback } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditorMarkdown = ({ placeholder, editorHtml, setEditorHtml }) => {
  const handleChange = useCallback((html) => {
    setEditorHtml(html);
  }, []);

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  return (
    <div>
      <ReactQuill
        theme={"snow"}
        onChange={handleChange}
        value={editorHtml}
        modules={modules}
        formats={formats}
        bounds={".app"}
        placeholder={placeholder}
      />
    </div>
  );
};

export default EditorMarkdown;

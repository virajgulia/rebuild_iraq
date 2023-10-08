import React, { useState, useEffect } from "react";
import RichTextEditor from "./RichTextEditor";
import Toolbar from "./Toolbar";
import DraftJS from "./DraftJS";
// react plugin that creates text editor
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const ArticleEditor = ({ onChangeEditor, editorHtml }) => {
  const [isLoaded, setisLoaded] = useState(false);
  const [reactQuillText, setReactQuillText] = useState(
    editorHtml ? editorHtml : ""
  );

  useEffect(() => {
    if (editorHtml !== "") {
      setReactQuillText(editorHtml);
    }
  }, [editorHtml]);

  const handleReactQuillChange = (value) => {
    setReactQuillText(value);
    onChangeEditor(value);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setisLoaded(true);
    }
  }, []);

  return (
    <div className="article-editor">
      {isLoaded && (
        <ReactQuill
          value={reactQuillText}
          onChange={handleReactQuillChange}
          theme="snow"
          modules={{
            toolbar: [
              [{ 'font': [] }],
              [{ 'color': [] }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              ["bold", "italic", "underline"],
              ["link", "blockquote", "code", "image"],
              [{ 'indent': '-1'}, { 'indent': '+1' }], 
              [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
              [
                {
                  list: "ordered",
                },
                {
                  list: "bullet",
                },
              ],
            ],
          }}
        />
      )}
    </div>
  );
};

export default ArticleEditor;

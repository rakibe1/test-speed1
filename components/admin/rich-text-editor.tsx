"use client"

import { useMemo } from "react"
import dynamic from "next/dynamic"
import "react-quill/dist/quill.snow.css" // Import Quill styles

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
}

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  // Dynamically import ReactQuill to prevent SSR issues
  const ReactQuill = useMemo(() => dynamic(() => import("react-quill"), { ssr: false }), [])

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["link", "image"],
      ["clean"],
    ],
  }

  const formats = [
    "header",
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
  ]

  return (
    <div className="h-[300px] mb-12">
      {" "}
      {/* Added height and margin-bottom to prevent layout shift */}
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        className="h-[calc(100%-42px)]" // Adjust height to fit within parent div
      />
    </div>
  )
}

// import React, { useState, useCallback } from "react";
// import { useDropzone } from "react-dropzone";

// function UploadPDF({ onUpload, isUploading }) {
//   const [pdf, setPdf] = useState(null);

//   const onDrop = useCallback(
//     (acceptedFiles) => {
//       const file = acceptedFiles[0];
//       setPdf(file);
//       onUpload(file);
//     },
//     [onUpload]
//   );

//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop,
//     accept: "application/pdf",
//   });

//   return (
//     <div
//       {...getRootProps()}
//       style={{
//         backgroundColor: isUploading ? "lightyellow" : pdf ? "lightgreen" : "lightgray",
//         border: "3px dashed orange",
//         justifyContent: "center",
//         alignItems: "center",
//         flexDirection: "column",
//         display: "flex",
//         flex: 1,
//         textAlign: "center",
//         fontSize: "20px",
//         fontWeight: "bold",
//         borderRadius: 20,
//       }}
//     >
//       <input {...getInputProps()} />
//       {isUploading && <p>Uploading PDF...</p>}
//       {!isUploading && pdf && <p>PDF Uploaded Successfully</p>}
//       {!isUploading && !pdf && <p>Upload PDF</p>}
//       {!isUploading && !pdf && <p>Drag & drop some PDFs here, or click to select files</p>}
//     </div>
//   );
// }

// export default UploadPDF;

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "./UploadPDF.css";

function UploadPDF({ onUpload, isUploading }) {
  const [pdf, setPdf] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setPdf(file);
      onUpload(file);
    },
    [onUpload]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "application/pdf",
  });

  return (
    <div
      {...getRootProps()}
      style={{
        backgroundColor: isUploading
          ? "lightyellow"
          : pdf
          ? "lightgreen"
          : "lightgray",
        border: "3px dashed orange",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        display: "flex",
        flex: 1,
        textAlign: "center",
        fontSize: "20px",
        fontWeight: "bold",
        borderRadius: 20,
        position: "relative",
      }}
    >
      <input {...getInputProps()} />
      {isUploading && (
        <>
          <p>Uploading PDF...</p>
          <div className="spinner"></div>
        </>
      )}
      {!isUploading && pdf && <p>PDF Uploaded Successfully</p>}
      {!isUploading && !pdf && <p>Upload PDF</p>}
      {!isUploading && !pdf && (
        <p>Drag & drop some PDFs here, or click to select files</p>
      )}
    </div>
  );
}

export default UploadPDF;

import { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { FileDropZoneStyled } from "../style/FileDropZone.styled";

export const FileDropZone = ({filesChanged}) => {
    const { acceptedFiles, getRootProps, getInputProps,
        isFocused,
        isDragAccept,
        isDragReject } = useDropzone({maxFiles : 1});
    const files = acceptedFiles.map(file => (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    ));
  
    useEffect(() => {
      if (filesChanged) {
        filesChanged(acceptedFiles)
      }
    }, [acceptedFiles])
  
    return (
      <section className="container">
        <FileDropZoneStyled {...getRootProps({ className: 'dropzone',isFocused, isDragAccept, isDragReject})}>
          <input {...getInputProps()}/>
          <p>Drag 'n' drop some files here, or click to select files</p>
        </FileDropZoneStyled>
        <aside>
          <h4>Files</h4>
          <ul>{files}</ul>
        </aside>
        
      </section>
    );
  }
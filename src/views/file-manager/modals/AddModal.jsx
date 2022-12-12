import React, { useState, useEffect} from "react";
import {createPortal}  from "react-dom";
import { Modal } from "../../../base-components/modal";
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useService from "../../../service";
import { useDropzone } from 'react-dropzone';
import { checkMimeType } from "../../../utils/mimeTypes";
import { Spinner } from "../../../components/spinner/Spinner";
import { useNavigate } from "react-router-dom";

function Basic({filesChanged}) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({maxFiles : 1});
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
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </section>
  );
}

export default function show({ show, onClose }) {
  const [fileName, setFileName] = useState("");
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  let { service } = useService();
  const [files, setFiles] = useState(null);

  const uploadFile = async() => {
    console.log('Uploading File... ',files[0]);
    const mimeType = checkMimeType(files[0].path);
    const endPoint = mimeType.type.split('/')[0] === 'video' ? 'media' : 'documents';
    const dataResponse = await service.create(endPoint, {
      "extName": files[0].path.split('.')[1],
      "fileName": fileName
    });

    if(dataResponse.status === 403) {
      navigate('/login');
    }

    
    const awsResponse = await service.uploadFileToS3(files[0],dataResponse.data.preSignedUrl, mimeType.type);
    
    await queryClient.invalidateQueries();

    return dataResponse.data;
  }

  const onSuccessFn = async() => {
    onClose();
    await queryClient.invalidateQueries();
  }

  const onErrorFn = (err) => {
    console.log("Failed To Upload", err);
  }

  const { mutate: uploadDocument, isLoading } =
    useMutation({mutationFn : uploadFile, onSuccess: onSuccessFn, onError: onErrorFn});

  const root = document.getElementById('root');
  return (
    <Modal show={show} onHidden={() => onClose()} >
      {isLoading ? createPortal(<Spinner msg={"UPLOADING..."}/>,root) : null}
      <div className="p-[20px]">
        <label htmlFor="regular-form-1" className="form-label">
          File name
        </label>
        <input
          id="file-name"
          type="text"
          className="form-control"
          placeholder="File name"
          value={fileName}
          onChange={e => setFileName(e.target.value)}
        />
      </div>
      <div className="px-[20px]">
        {show && (
          <Basic filesChanged={(files) =>  setFiles(files) } isLoading={isLoading}/>
        )}
      </div>
      <div id="custom-previewsContainer" className="dropzone dropzone-previews"></div>
      <div className="p-[20px]">
        <button className="btn btn-primary w-24 mr-1 mb-2" onClick={uploadDocument}>Upload</button>
      </div>
    </Modal>
  );
}

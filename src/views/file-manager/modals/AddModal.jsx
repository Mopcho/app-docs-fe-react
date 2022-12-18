import React, { useState, useEffect} from "react";
import {createPortal}  from "react-dom";
import { Modal } from "../../../base-components/modal";
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useService from "../../../service";
import { checkMimeType } from "../../../utils/mimeTypes";
import { Spinner } from "../../../components/spinner/Spinner";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "../../../components/ErrorMessage/ErrorMessage";
import { FileDropZone } from "../../../components/FileDropZone/FileDropZone";

export default function show({ show, onClose }) {
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState(false);
  const [touched, setTouched] = useState(false);
  const [globalError, setGlobalError] = useState(false);

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
      return navigate('/login');
    }

    if(dataResponse.status >= 400) {
      return setGlobalError(registerResponse.data.message);
    }

    await service.uploadFileToS3(files[0],dataResponse.data.preSignedUrl, mimeType.type);
    
    await queryClient.invalidateQueries();

    return dataResponse.data;
  }

  const onChangeName = (ev) => {
    ev.preventDefault();

    const value = ev.target.value;

    setTouched(old => true);
    setFileName(old => value);

    if(value.length < 4) {
      return setError(old => 'FileName must be at least 4 characters long');
    }

    setError(false);
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

    const canUpload = () => {
      return (touched && !error);
    }

  const root = document.getElementById('root');
  return (
    <Modal show={show} onHidden={() => onClose()} >
      {isLoading ? createPortal(<Spinner msg={"UPLOADING..."}/>,root) : null}
      <div className="p-[20px]">
        {globalError ? <ErrorMessage msg={globalError}></ErrorMessage> : null}
        <label htmlFor="regular-form-1" className="form-label">
          File name
        </label>
        <input
          id="file-name"
          type="text"
          className="form-control"
          placeholder="File name"
          value={fileName}
          onChange={onChangeName}
        />
        {error ? <p className="text-red-600 mt-3">{error}</p> : null}
      </div>
      <div className="px-[20px]">
        {show && (
          <FileDropZone filesChanged={(files) =>  setFiles(files) } isLoading={isLoading}/>
        )}
      </div>
      <div id="custom-previewsContainer" className="dropzone dropzone-previews"></div>
      <div className="p-[20px]">
        <button className="btn btn-primary w-24 mr-1 mb-2" onClick={uploadDocument} disabled={!canUpload()}>Upload</button>
      </div>
    </Modal>
  );
}

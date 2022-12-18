import React, { useState } from "react";
import { Modal } from "../../../base-components/modal";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useService from "../../../service";
import {ErrorMessage} from '../../../components/ErrorMessage/ErrorMessage';

export default function EditModal({ file, onClose , contentType}) {
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState(false);
  const [touched, setTouched] = useState(false);
  const [globalError, setGlobalError] = useState(false);
  // edit documents
  const queryClient = useQueryClient();
  const {service} = useService();
  const { mutate: updateDocument, isLoading: isLoadingUpdateDocument } =
  useMutation(
      async ([id, data]) => {
        const dataResponse = await service.update('all', id, data);

        if(dataResponse.status >= 400) {
          return setGlobalError(dataResponse.data.message);
        }

        if(dataResponse.status === 403) {
          navigate('/login');
        }

        return dataResponse.data;
      },
      {
        onSuccess: async (data) => {
          await queryClient.invalidateQueries();
          onClose();
          // toastSuccess("Updated");
        },
        onError: async (err) => {
          console.log(err)
          // toastError("Couldn't update");
        },
      }
      );
  
      const onChangeFileName = (ev) => {
        ev.preventDefault();

        const value = ev.target.value;

        setTouched(old => true);
        setFileName(old => value);

        if(value.length < 4) {
          return setError(old => 'FileName must be at least 4 characters long');
        }
      
        setError(false);
      }

      const canEdit = () => {
        return (touched && !error);
      }

  return (
    <Modal show={file ? true : false} onHidden={() => onClose()}>
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
          onChange={onChangeFileName}
        />
        {error ? <p className="text-red-600 mt-3">{error}</p> : null}
      </div>
      <div id="custom-edit-previewsContainer" className="dropzone dropzone-previews"></div>
      <div className="p-[20px]">
        <button disabled={!canEdit()} className="btn btn-primary w-24 mr-1 mb-2" onClick={() => updateDocument([file, {fileName : name, extName : '.txt'}])}>Upload</button>
      </div>
    </Modal>
  );
}

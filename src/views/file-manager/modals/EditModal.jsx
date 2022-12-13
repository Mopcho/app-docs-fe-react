import React, { useState } from "react";
import { Modal } from "../../../base-components/modal";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useService from "../../../service";

export default function EditModal({ file, onClose , contentType}) {
  // edit documents
  const queryClient = useQueryClient();
  const {service} = useService();
  const { mutate: updateDocument, isLoading: isLoadingUpdateDocument } =
  useMutation(
      async ([id, data]) => {
        const dataResponse = await service.update('all', id, data);

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
      
  let [name, setName] = useState('');

  

  const input = (
    <div className="p-[20px]">
      <label htmlFor="regular-form-1" className="form-label">
        File name
      </label>
      <input
        id="file-name"
        type="text"
        className="form-control"
        placeholder="File name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
    </div>
  );
  return (
    <Modal show={file ? true : false} onHidden={() => onClose()}>
      {input}
      <div id="custom-edit-previewsContainer" className="dropzone dropzone-previews"></div>
      <div className="p-[20px]">
        <button className="btn btn-primary w-24 mr-1 mb-2" onClick={() => updateDocument([file, {fileName : name, extName : '.txt'}])}>Upload</button>
      </div>
    </Modal>
  );
}

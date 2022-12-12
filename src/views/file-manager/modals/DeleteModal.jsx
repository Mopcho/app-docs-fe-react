import React from "react";
import { Lucide, Modal, ModalBody } from "../../../base-components";
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useService from "../../../service";
import { createPortal } from "react-dom";
import { Spinner } from "../../../components/spinner/Spinner";

export default function DeleteModal({ fileToDelete, setFileToDelete, del }) {
  let { service } = useService();

  const queryClient = useQueryClient();
  // delete documents
  const { mutate: _delete, isLoading } = useMutation(
    async (id) => {
      const dataResponse = await service.delete(fileToDelete.contentType.includes('video') ? 'media' : 'documents' , fileToDelete.key);
      if(dataResponse.status === 403) {
        navigate('/login');
      }

      return dataResponse.data;
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          predicate: (query) => {
            console.log('query',query);
            return true;
          }
        });
        setFileToDelete(null);
      },
      onError: async (err) => {
        console.log(err);
        await queryClient.invalidateQueries();
      },
    }
  );

  const root = document.getElementById('root');
  return (
    <Modal
      show={fileToDelete ? true : false}
      onHidden={() => setFileToDelete(null)}
    >
      {isLoading ? createPortal(<Spinner msg={"DELETING..."}></Spinner>, root) : null}
      <ModalBody className="p-0">
        <div className="p-5 text-center">
          <Lucide
            icon="XCircle"
            className="w-16 h-16 text-danger mx-auto mt-3"
          />
          <div className="text-3xl mt-5">Are you sure?</div>
          <div className="text-slate-500 mt-2">
            Do you really want to delete these records? <br />
            This process cannot be undone.
          </div>
        </div>
        <div className="px-5 pb-8 text-center">
          <button
            type="button"
            onClick={() => {
              setFileToDelete(null);
            }}
            className="btn btn-outline-secondary w-24 mr-1"
          >
            Cancel
          </button>
          <button type="button" className="btn btn-danger w-24" onClick={() => _delete(fileToDelete)}>
            Delete
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
}

// hooks
import { useState } from "react";

// modals
import AddModal from "./modals/AddModal";
import DeleteModal from "./modals/DeleteModal";
import EditModal from "./modals/EditModal";

// page components
import FileManagerMenu from "./FileManagerMenu"
import FileManagerFilter from "./FileManagerFilter";
import FilesList from "./FilesList"
import { useParams } from "react-router-dom";
import { PaginationProvider } from "../../contexts/PaginationContext";


export default function FileManagerPage() {
  const [search, setSearch] = useState("")
  const onSearchChange = (e) => {
    setSearch(e.target.value)
  }

  // modal states
  const [addModal, setAddModal] = useState(null);
  const [addLabelModal, setAddLabelModal] = useState(null);
  const [fileToDelete, setFileToDelete] = useState(null);
  const [fileToEdit, setFileToEdit] = useState(null);
  //-------------
  const {contentType, status} = useParams();

  return (
    <> 
    <PaginationProvider>
      <div className="grid grid-cols-12 gap-6 mt-8">

        {/* Modals */}
        <AddModal
          show={addModal}
          onClose={() => setAddModal(false)}
        />
        <EditModal
          file={fileToEdit}
          addModal={false}
          onClose={() => setFileToEdit(null)}
          contentType={contentType}
        />
        <DeleteModal fileToDelete={fileToDelete} setFileToDelete={setFileToDelete} del={() => { }} />
        {/* End of modals */}

        {/* Main Page */}
        <div className="col-span-12 lg:col-span-3 2xl:col-span-2">
          <h2 className="intro-y text-lg font-medium mr-auto mt-2">
            File Manager
          </h2>
          <FileManagerMenu setAddLabelModal={setAddLabelModal}/>
        </div>
        <div className="col-span-12 lg:col-span-9 2xl:col-span-10">
          <FileManagerFilter onSearchChange={onSearchChange} search={search} setAddModal={setAddModal}/>
          <FilesList search={search} setFileToDelete={setFileToDelete} setFileToEdit={setFileToEdit} contentType={contentType} status={status}/>
        </div>
      </div>
      {/* End of main page */}
      </PaginationProvider>
    </>
  );
}
import Dropzone from "dropzone";
import { Link } from "react-router-dom";

function toBytes(size, type) {
  const types = ["B", "KB", "MB", "GB", "TB"];

  const key = types.indexOf(type.toUpperCase());

  if (typeof key !== "boolean") {
    return size * 1024 ** key;
  }
  return "invalid type: type must be GB/KB/MB etc.";
}

function fileView(file) {
  if (file.type == "Empty Folder")
    return `
    <div class="file my-6 mx-3">
      <a
        class="w-3/5 file__icon file__icon--empty-directory mx-auto"
      ></a></div>`;
  else if (file.type == "Folder")
    return `
    <div class="file my-6 mx-3">
      <a
        class="w-3/5 file__icon file__icon--directory mx-auto"
      ></a></div>`;
  else
    return `
    <div class="file my-6 mx-3">
      <a  class="w-3/5 file__icon file__icon--file mx-auto">
        <div class="file__icon__file-name">${file.type}</div>
      </a></div>`;
}

const init = (el, props) => {
  Dropzone.autoDiscover = false;

  if (el) {
    const myDropzone = new Dropzone(el, props.options);
    myDropzone.on("addedfile", (file) => {
      if (
        myDropzone.getAddedFiles().length === 1 &&
        myDropzone.previewsContainer.children.length > 1
      ) {
        myDropzone.previewsContainer.removeChild(
          myDropzone.previewsContainer.firstChild
        );
      }
      let files = [
        ...myDropzone.getAcceptedFiles(),
        ...myDropzone.getRejectedFiles(),
      ];

      files.forEach((f) => {
        if (f !== file) {
          myDropzone.removeFile(f);
        }
      });

      console.log(file);
    });

    if (props.file) {
      const unprocessedSize = props.file.size.split(" ");
      const size = toBytes(Number(unprocessedSize[0]), unprocessedSize[1]);
      const unprocessedFileName = props.file.fileName.split("/");
      const name = unprocessedFileName[unprocessedFileName.length - 1];
      let mockFile = { name, size };
      myDropzone.previewsContainer.innerHTML = "";
      myDropzone.displayExistingFile(mockFile, props.file.fileName);
      if (props.file.type !== "Image") {
        myDropzone.previewsContainer.querySelector(".dz-image").innerHTML =
          fileView(props.file, name);
      }
    }

    el.dropzone = myDropzone;
  }
};

export { init };

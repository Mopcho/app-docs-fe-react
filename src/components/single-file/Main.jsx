import React from 'react'
import { Link } from 'react-router-dom';
import * as $_ from "lodash";
import {
  Lucide,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownContent,
  DropdownItem,
} from "@/base-components";

export default function Main({ file, checked, onChange, edit, del, ...rest }) {
  return (
    <div {...rest}
      className="intro-y col-span-6 sm:col-span-4 md:col-span-3 2xl:col-span-2"
    >
      <div className="file box rounded-md px-5 pt-8 pb-5 px-3 sm:px-5 relative zoom-in">
        <div className="absolute left-0 top-0 mt-3 ml-3">
          <input
            className="form-check-input border border-slate-500"
            type="checkbox"
            checked={checked}
            onChange={onChange}
          />
        </div>
        {(() => {
          if (file.type == "Empty Folder")
            return (
              <Link
                to="#"
                className="w-3/5 file__icon file__icon--empty-directory mx-auto"
              ></Link>
            );
          else if (file.type == "Folder")
            return (
              <Link
                to="#"
                className="w-3/5 file__icon file__icon--directory mx-auto"
              ></Link>
            );
          else if (file.type == "Image")
            return (
              <Link
                to="#"
                className="w-3/5 file__icon file__icon--image mx-auto"
              >
                <div className="file__icon--image__preview image-fit">
                  <img
                    alt="Midone Tailwind HTML Admin Template"
                    src={$_.toLower(file["fileName"])}
                  />
                </div>
              </Link>
            );
          else
            return (
              <Link
                to="#"
                className="w-3/5 file__icon file__icon--file mx-auto"
              >
                <div className="file__icon__file-name">
                  {file.type}
                </div>
              </Link>
            );
        })()}
        <Link
          to="#"
          className="block font-medium mt-4 text-center truncate"
        >
          {
            file.fileName.split("/")[
            file.fileName.split("/").length - 1
            ]
          }
        </Link>
        <div className="text-slate-500 text-xs text-center mt-0.5">
          {file.size}
        </div>
        <Dropdown className="absolute top-0 right-0 mr-2 mt-3 ml-auto">
          <DropdownToggle tag="a" className="w-5 h-5 block" href="#">
            <Lucide
              icon="MoreVertical"
              className="w-5 h-5 text-slate-500"
            />
          </DropdownToggle>
          <DropdownMenu className="w-40">
            <DropdownContent>
              <DropdownItem>
                <Lucide icon="Users" className="w-4 h-4 mr-2" /> Share
                File
              </DropdownItem>
              <DropdownItem onClick={() => edit()}>
                <Lucide icon="Pencil" className="w-4 h-4 mr-2" />{" "}
                Edit
              </DropdownItem>
              <DropdownItem onClick={() => del()}>
                <Lucide icon="Trash" className="w-4 h-4 mr-2" />{" "}
                Delete
              </DropdownItem>
            </DropdownContent>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  )
}

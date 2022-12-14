import React from 'react'
import { Link } from 'react-router-dom';
import {
    Lucide,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownContent,
    DropdownItem,
} from "@/base-components";
import useService from "../../service";
import { checkExtension } from "../../utils/mimeTypes";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Spinner } from '../../components/spinner/Spinner';
import { createPortal } from 'react-dom';


export default function Main({ file, checked, onChange, edit, del, status, ...rest }) {
    let { service } = useService();
    const queryClient = useQueryClient();

    const downloadFile =async ({key, contentType}) => {
        const response = await service.get(contentType.includes('video') ? 'media' : 'documents',key);
        if(response.status === 403) {
            navigate('/login');
        }

        console.log(response);

        const download = await fetch(response.data.presignedUrl, {
            method: 'GET'
        });

        const blob = await download.blob();

        const url = window.URL.createObjectURL(
          new Blob([blob]),
        );
        const link = document.createElement('a');
        link.href = url;
        const extension = checkExtension(contentType);
        link.setAttribute(
          'download',
          `FileName.${extension.extName}`,
        );
        console.log(`FileName.${extension.extName}`);
        // Append to html link element page
        document.body.appendChild(link);
        // Start download
        link.click();
        // Clean up and remove the link
        link.parentNode.removeChild(link);   
    }

    const {data, isLoading, mutate: download} = useMutation({mutationFn: downloadFile})

    const {mutate: removeFromTrash} = useMutation({mutationFn: async () => {
        return await service.removeFromTrash('all', file);
    }, onSuccess : async () => {
        await queryClient.invalidateQueries();
    }, onError: async() => {
        await queryClient.invalidateQueries();
    }})

    
    const root = document.getElementById('root');
    return (
        <>
        {isLoading ? createPortal(<Spinner msg={"DOWNLOADING..."}/>,root) : null}
        <div {...rest}
        className="intro-y col-span-6 sm:col-span-4 md:col-span-3 2xl:col-span-2"
        >
            <div className="file box rounded-md px-5 pt-8 pb-5 sm:px-5 relative zoom-in">
                <div className="absolute left-0 top-0 mt-3 ml-3">
                </div>
                {(() => {
                    if (file.contentType == "Empty Folder")
                        return (
                            <button
                            onClick={() => {
                                download({key: file.key, contentType: file.contentType})
                            }}
                                className="w-3/5 file__icon file__icon--empty-directory mx-auto"
                            ></button>
                        );
                    else if (file.contentType == "Folder")
                        return (
                            <button
                            onClick={() => {
                                download({key: file.key, contentType: file.contentType})
                            }}
                                className="w-3/5 file__icon file__icon--directory mx-auto"
                            ></button>
                        );
                    else if (file.contentType.split('/')[0] === "image")
                        return (
                            <button
                            onClick={() => {
                                download({key: file.key, contentType: file.contentType})
                            }}
                                className="w-3/5 file__icon file__icon--image mx-auto"
                            >
                                <div className="file__icon--image__preview image-fit">
                                    <img
                                        alt="Midone Tailwind HTML Admin Template"
                                        src={file.preSignedUrl}
                                    />
                                </div>
                            </button>
                        );
                        else if (file.contentType.split('/')[0] === "text")
                        return (
                            // <iframe src={file.preSignedUrl} className="w-full h-4/5"></iframe>
                            // <TextFile file={file} maxLength={70}/> 
                            <button
                            onClick={() => {
                                download({key: file.key, contentType: file.contentType})
                            }}
                            className="w-3/5 file__icon file__icon--file mx-auto"
                        >
                            <div className="file__icon__file-name">
                                {file.contentType}
                            </div>
                        </button>
                        );
                        else if(file.contentType.split('/')[0] === "video") {
                            return (
                                // <iframe src={file.url} className="w-full h-4/5"></iframe>
                                <button
                                onClick={() => {
                                    download({key: file.key, contentType: file.contentType})
                                }}
                                className="w-3/5 file__icon file__icon--file mx-auto"
                            >
                                <div className="file__icon__file-name">
                                    {file.contentType}
                                </div>
                            </button>
                            )
                        }
                    else
                        return (
                            <button
                            onClick={() => {
                                download({key: file.key, contentType: file.contentType})
                            }}
                                className="w-3/5 file__icon file__icon--file mx-auto"
                            >
                                <div className="file__icon__file-name">
                                    {file.contentType}
                                </div>
                            </button>
                        );
                })()}
                <Link
                    to="#"
                    className="block font-medium mt-4 text-center truncate"
                >
                    {
                        file.name.split("/")[0]
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
                            <DropdownItem onClick={() => edit()}>
                                <Lucide icon="Pencil" className="w-4 h-4 mr-2" />{" "}
                                Edit
                            </DropdownItem>
                            <DropdownItem onClick={() => del()}>
                                <Lucide icon="Trash" className="w-4 h-4 mr-2" />{" "}
                                Delete
                            </DropdownItem>
                            {status === 'deleted' ? <DropdownItem onClick={() => removeFromTrash()}>
                                <Lucide icon="Trash" className="w-4 h-4 mr-2" />{" "}
                                Remove from trash
                            </DropdownItem> : null}
                        </DropdownContent>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
        </>
    )
}

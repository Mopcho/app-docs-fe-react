import { useQuery } from "@tanstack/react-query"
import { Link } from 'react-router-dom';

export const TextFile = ({file, maxLength}) => {
    const {data, isLoading} = useQuery([`file-${file._id}`, {file}], async () => {
        console.log('file', file);
        const raw = await fetch(file.preSignedUrl);
        const response = await raw.text();
        return response.substring(0, maxLength || 70);
    });

    return (
        <Link
            to="#"
            className="w-3/5 file__icon file__icon--image mx-auto"
            >
            <div className="file__icon--image__preview image-fit">
            {isLoading ? 'Loading...' : <p>{data}</p>}
            </div>
        </Link>
    )
}
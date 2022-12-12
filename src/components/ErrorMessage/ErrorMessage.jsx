import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

export const ErrorMessage = ({msg}) => {
    return (
        <div className="border-2 border-red-700 p-4 flex justify-start gap-5 bg-[#FFCCBA] rounded-sm my-5">
            <FontAwesomeIcon icon={faExclamationCircle} size="2x"/>
            <h2 className="text-[#D63301]">{msg}</h2>
        </div>
    )
}
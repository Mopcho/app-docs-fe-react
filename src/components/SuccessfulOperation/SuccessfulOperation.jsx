import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

export const SuccessfulOperation = ({msg}) => {
    return (
        <div className="border-2 border-[#345a0b] p-4 flex justify-start gap-5 bg-[#DFF2BF] rounded-sm my-5">
            <FontAwesomeIcon icon={faCheckCircle} size="2x"/>
            <h2 className="text-[#4F8A10]">{msg}</h2>
        </div>
    )
}
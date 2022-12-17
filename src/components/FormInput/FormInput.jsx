export const FormInput = ({name, placeholder, label, type, onChange, error, onBlur}) => {
    return (
        <div>
            {label ? <label htmlFor={name}>{label}</label> : null}
            <input type={type} placeholder={placeholder} name={name} onChange={onChange} onBlur={onBlur} className="intro-x login__input form-control py-3 px-4 block mt-4" />
            {error ? <span className="text-red-600 mt-3">{error}</span> : null}
        </div>
    )
}
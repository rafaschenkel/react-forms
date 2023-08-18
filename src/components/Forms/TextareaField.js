import classNames from 'classnames';

const TextareaField = ({ id, label, hint, error, touched, ...textareaProps }) => {
    return (
        <>
            <label
                className="form-label"
                htmlFor={id}
            >
                {label}
            </label>

            <textarea
                className={classNames('form-control', {
                    'is-invalid': !!error
                })}
                id={id}
                name={id}
                aria-describedby={`${id}Help`}
                {...textareaProps}
            />

            {error && touched ? (
                <div className="invalid-feedback">{error}</div>
            ) : (
                <div
                    id={`${id}Help`}
                    className="form-text"
                >
                    {hint}
                </div>
            )}
        </>
    );
};

export default TextareaField;

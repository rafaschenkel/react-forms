import classNames from 'classnames';

const InputField = ({ id, label, error, hint, touched, ...inputProps }) => {
    return (
        <>
            <label
                className="form-label"
                htmlFor={id}
            >
                {label}
            </label>

            <input
                className={classNames('form-control', {
                    'is-invalid': !!error && touched
                })}
                id={id}
                name={id}
                aria-describedby={`${id}Help`}
                {...inputProps}
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

export default InputField;

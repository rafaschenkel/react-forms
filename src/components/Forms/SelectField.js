import classNames from 'classnames';

const SelectField = ({ id, label, hint, error, options, touched, ...selectProps }) => {
    return (
        <>
            <label
                className="form-label"
                htmlFor={id}
            >
                {label}
            </label>

            <select
                className={classNames('form-control', {
                    'is-invalid': !!error && touched
                })}
                id={id}
                name={id}
                aria-describedby={`${id}Help`}
                {...selectProps}
            >
                <option value="">Selecione</option>
                {options &&
                    options.map(value => (
                        <option
                            key={value}
                            value={value}
                        >
                            {value}
                        </option>
                    ))}
            </select>

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

export default SelectField;

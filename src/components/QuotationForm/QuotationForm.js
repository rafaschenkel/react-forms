import React from 'react';
import FormValues from '../FormValues';
import { useFormik } from 'formik';
import InputField from '../Forms/InputField';
import SelectField from '../Forms/SelectField';
import TextareaField from '../Forms/TextareaField';

const defineLeftZero = number => (number < 10 ? '0' : '');
const hours = [...new Array(24)].map((value, index) => `${defineLeftZero(index)}${index}:00`);

const validate = values => {
    const errors = {};

    if (!values.pickUpAgency) errors.pickUpAgency = 'É preciso informar o local de retirada!';
    if (!values.pickUpDate) errors.pickUpDate = 'É preciso informar a data!';
    if (!values.pickUpHour) errors.pickUpHour = 'É preciso informar a hora!';

    return errors;
};

function QuotationForm() {
    const {
        values: formValues,
        handleChange: handleFieldChange,
        handleBlur,
        touched,
        errors,
        handleSubmit
    } = useFormik({
        initialValues: {
            pickUpAgency: '',
            pickUpDate: '',
            pickUpHour: '',
            specialRequest: ''
        },
        validate,
        onSubmit: values => {
            console.log(values);
        }
    });

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <div className="col-md-5">
                        <InputField
                            id="pickUpAgency"
                            label="Local de retirada"
                            hint="Selecione o local onde deseja retirar o carro."
                            error={errors.pickUpAgency}
                            touched={touched.pickUpAgency}
                            value={formValues.pickUpAgency}
                            onChange={handleFieldChange}
                            onBlur={handleBlur}
                        />
                    </div>

                    <div className="col-md-4">
                        <InputField
                            id="pickUpDate"
                            label="Data de retirada"
                            hint="Selecione a data de retirada."
                            touched={touched.pickUpDate}
                            error={errors.pickUpDate}
                            value={formValues.pickUpDate}
                            onChange={handleFieldChange}
                            onBlur={handleBlur}
                        />
                    </div>

                    <div className="col-md-3">
                        <SelectField
                            id="pickUpHour"
                            label="Horário de retirada"
                            hint="Selecione a hora de retirada."
                            error={errors.pickUpHour}
                            touched={touched.pickUpHour}
                            value={formValues.pickUpHour}
                            options={hours}
                            onChange={handleFieldChange}
                            onBlur={handleBlur}
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-12">
                        <TextareaField
                            id="specialRequest"
                            label="Pedido especial"
                            hint="Esse é um espaço destinado especialmente para você nos contar como podemos lhe atender
                            melhor."
                            touched={touched.specialRequest}
                            error={errors.specialRequest}
                            value={formValues.specialRequest}
                            onChange={handleFieldChange}
                            onBlur={handleBlur}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <button
                            className="btn btn-primary"
                            type="submit"
                        >
                            Enviar
                        </button>
                    </div>
                </div>
            </form>

            <div className="mt-3">
                <FormValues values={formValues} />
            </div>
        </>
    );
}

export default QuotationForm;

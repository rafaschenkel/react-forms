import React from 'react';

import FormValues from '../FormValues';
import { useFormik } from 'formik';
import InputField from '../Forms/InputField';
import SelectField from '../Forms/SelectField';
import TextareaField from '../Forms/TextareaField';
import Loading from '../Loading';

import { object as schema, string } from 'yup';

const defineLeftZero = number => (number < 10 ? '0' : '');
const hours = [...new Array(24)].map((value, index) => `${defineLeftZero(index)}${index}:00`);

const sleep = (time = 1000) => new Promise(resolve => setTimeout(() => resolve(true), time));

const validationSchema = schema({
    pickUpAgency: string().required('É preciso informar o local de retirada!'),
    pickUpDate: string()
        .required('É preciso informar a data!')
        .matches(
            /^(0[1-9]|[12][0-9]|3[0-1])[- /.](0[1-9]|1[0-12])[- /.](20)\d\d$/,
            'A data precisa estar no formato dd/mm/aaaa'
        ),
    pickUpHour: string().required('É preciso informar a hora!')
});

function QuotationForm() {
    const {
        values: formValues,
        handleChange: handleFieldChange,
        handleBlur,
        touched,
        errors,
        handleSubmit,
        isSubmitting
    } = useFormik({
        initialValues: {
            pickUpAgency: '',
            pickUpDate: '',
            pickUpHour: '',
            specialRequest: ''
        },
        validationSchema,
        onSubmit: async values => {
            await sleep(3000);
            console.log(values);
        }
    });

    return (
        <>
            <form onSubmit={submit}>
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
                            disabled={isSubmitting}
                        >
                            Enviar{' '}
                            {!!isSubmitting && (
                                <span className="mx-2">
                                    <Loading />
                                </span>
                            )}
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

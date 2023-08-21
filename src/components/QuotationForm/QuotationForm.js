import React from 'react';
import FormValues from "../FormValues";

const defineLeftZero = (number) => number < 10 ? '0' : '';
const hours = [...new Array(24)].map((value, index) => `${defineLeftZero(index)}${index}:00`);

const sleep = (time = 1000) => new Promise((resolve) => {
    setTimeout(() => {
        resolve(false);
    },time)
})

const validationSchema = schema({
    pickUpAgency: string()
        .required('É preciso preencher o local de retirada'),
    pickUpDate: string()
        .required('É preciso preencher a data de retirada')
        .matches(/^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/, 'A data precisa estar no formato dd/mm/yyyy'),
    pickUpHour: string()
        .required('É preciso preencher a hora de retirada'),
});

function QuotationForm() {
    let formValues = null; // estamos cometendo uma heresia para explicar um conceito

    const submit = (event) => {
        event.preventDefault();

        const inputNames = ['pickUpAgency', 'pickUpDate', 'pickUpHour', 'specialRequest'];
        const formInputs = event.target.elements;

        formValues = inputNames.reduce((acc, name) => ({
            ...acc,
            [name]: formInputs[name].value
        }), {});

        console.log(formValues);
    }

    return (
        <>
            <form onSubmit={submit}>

                <div className="row mb-3">
                    <div className="col-md-5">

                        <label
                            className="form-label"
                            htmlFor="pickUpAgency"
                        >
                            Local de retirada
                        </label>

                        <input
                            className="form-control"
                            id="pickUpAgency"
                            name="pickUpAgency"
                            aria-describedby="pickUpAgencyHelp"
                        />

                        <div
                            id="pickUpAgencyHelp"
                            className="form-text"
                        >
                            Selecione o local onde deseja retirar o carro.
                        </div>

                    </div>

                    <div className="col-md-4">

                        <label
                            className="form-label"
                            htmlFor="pickUpDate"
                        >
                            Data de retirada
                        </label>

                        <input
                            className="form-control"
                            id="pickUpDate"
                            name="pickUpDate"
                            aria-describedby="pickUpDateHelp"
                        />

                        <div
                            id="pickUpDateHelp"
                            className="form-text"
                        >
                            Selecione a data de retirada.
                        </div>

                    </div>

                    <div className="col-md-3">

                        <label
                            className="form-label"
                            htmlFor="pickUpHour"
                        >
                            Horário de retirada
                        </label>

                        <select
                            className="form-select"
                            id="pickUpHour"
                            name="pickUpHour"
                            aria-describedby="pickUpHourHelp"
                        >
                            {hours.map((value) => (
                                <option
                                    key={value}
                                    value={value}
                                >
                                    {value}
                                </option>
                            ))}
                        </select>

                        <div
                            id="pickUpHourHelp"
                            className="form-text"
                        >
                            Selecione a hora de retirada.
                        </div>

                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-12">

                        <label
                            className="form-label"
                            htmlFor="specialRequest"
                        >
                            Pedido especial
                        </label>

                        <textarea
                            className="form-control"
                            id="specialRequest"
                            name="specialRequest"
                            aria-describedby="specialRequestHelp"
                        />

                        <div
                            id="specialRequestHelp"
                            className="form-text"
                        >
                            Esse é um espaço destinado especialmente para você nos contar como podemos lhe atender
                            melhor
                        </div>

                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <button
                            className="btn btn-primary"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            Enviar {!!(isSubmitting) && <span className="mx-2"><Loading/></span>}
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

import { Formik } from "formik";
import React from "react";
import { InputBackground, InputIcon, ErrorLabel, InputStyles } from "./style";

interface props {
    type: string,
    name: string,
    label: string,
    icon: string,
    placeholder?: string,
    formik: any,
    format?: 'none' | 'cpf' | 'email' | 'cep',
    onChange?: (e: any) => void,
    disabled?: boolean
}

export default function Input({ type, name, label, icon, formik, placeholder, format, onChange, disabled }: props) {



    return (
        <InputStyles>
            <label htmlFor={name}>{label}</label>
            {formik.errors[name] ? <ErrorLabel>({formik.errors[name]})</ErrorLabel> : null}
            <InputBackground disabled={disabled}>
                <InputIcon icon={icon}></InputIcon>
                <input
                    type={type}
                    name={name}
                    id={name}
                    onChange={(e) => {

                        formik.handleChange(e);
                        if (onChange)
                            onChange(e);
                    }
                    }
                    value={
                        !format ? formik.values[name] :
                            format === 'cpf' ? formataCPF(formik.values[name]) :
                                format === 'cep' ? formataCEP(formik.values[name]) : ''
                    }
                    placeholder={placeholder}
                    disabled={disabled}
                />
            </InputBackground>
        </InputStyles>

    )
}

function formataCPF(cpf: string | undefined) {

    if (typeof cpf === 'undefined')
        return;

    cpf = cpf.replace(/[^\d]/g, "").substring(0, 11)


    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

function formataCEP(cpf: string | undefined) {

    if (typeof cpf === 'undefined')
        return;
    //retira os caracteres indesejados...
    cpf = cpf.replace(/[^\d]/g, "").substring(0, 8);

    //realizar a formatação...
    return cpf.replace(/(\d{5})(\d{3})/, "$1-$2");
}


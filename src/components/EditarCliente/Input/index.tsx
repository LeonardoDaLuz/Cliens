import { Formik } from "formik";
import React, { useEffect, useRef } from "react";
import { RootState } from "../../../store";
import { useAppSelector } from "../../../store/hooks";
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


    const customerState = useAppSelector((store: RootState) => store.customer);

    const customer = customerState.customer;

    const elRef = useRef(null);

    function handleFormatMasking(e: { target: HTMLInputElement }) {

    
        if (format === 'cpf')
            e.target.value = formatCPF(e.target.value);
    
    
        if (format === 'cep')
            e.target.value = formatCEP(e.target.value);
    
        formik.handleChange(e);
    
        if (onChange)
            onChange(e);
    }

    useEffect(() => {

        
        handleFormatMasking({ target: elRef.current });
        
    }, [customer])
    
    return (
        <InputStyles>
            <label htmlFor={name}>{label}</label>
            {formik.errors[name] ? <ErrorLabel>({formik.errors[name]})</ErrorLabel> : null}
            <InputBackground disabled={disabled}>
                <InputIcon icon={icon}></InputIcon>
                <input                    
                    ref={elRef}
                    type={type}
                    name={name} 
                    id={name}
                    onChange={handleFormatMasking}
                    value={formik.values[name]}
                    placeholder={placeholder}
                    disabled={disabled}
                />
            </InputBackground>
        </InputStyles>

    )
}


export function formatCPF(cpf: string | undefined) {

    cpf = cpf.replace(/[^\d]/g, ""); //remove caracteres especiais e letras

    if (cpf.length < 7 && cpf.length > 3) {
        return cpf.replace(/(\d{3})/, "$1.");
    }
    if (cpf.length < 10 && cpf.length > 6) {
        return cpf.replace(/(\d{3})(\d{3})/, "$1.$2.");
    }
    if (cpf.length > 9) {
       
        return cpf.replace(/(\d{3})(\d{3})(\d{3})/, "$1.$2.$3-");
    }

    return cpf;
}

export function formatCEP(cpf: string | undefined) {



    if (cpf === "undefined" || typeof cpf === 'undefined')
        return "";
    //retira os caracteres indesejados...
    cpf = cpf.replace(/[^\d]/g, "").substring(0, 8);

    //realizar a formatação...
    return cpf.replace(/(\d{5})(\d{3})/, "$1-$2");
}


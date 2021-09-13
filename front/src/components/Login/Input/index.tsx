import React from "react";
import { BeautifulInputStyles, InputBackground, InputIcon, ErrorLabel } from "./style";

interface props {
    type: string,
    name: string,
    label: string,
    icon: string,
    placeholder?: string,
    formik: any
}

export default function Input({ type, name, label, icon, formik, placeholder }: props) {
    return (

        <BeautifulInputStyles>
            <label htmlFor={name}>{label}</label>
            {formik.errors[name] ? <ErrorLabel>({formik.errors[name]})</ErrorLabel> : null}
            <InputBackground>
                <InputIcon icon={icon}></InputIcon>
                <input
                    type={type}
                    {...formik.getFieldProps(name)}
                    placeholder={placeholder}
                />
            </InputBackground>


        </BeautifulInputStyles>


    )
}
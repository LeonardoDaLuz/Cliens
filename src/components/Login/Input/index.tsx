import React from "react";
import { BeautifulInputStyles, InputBackground, InputIcon } from "./style";

interface props {
    type: string,
    value: string,
    placeholder: string,
    name: string,
    id: string,
    label: string,
    icon: string
}
export default function Input({ type, value, placeholder, name, id, label, icon }: props) {
    return (

        <BeautifulInputStyles>
            <label htmlFor={id}>{label}</label>
            <InputBackground>
                <InputIcon icon={icon}></InputIcon>
                <input type={type} name={name} id={id} placeholder={placeholder} value={value} />
            </InputBackground>

        </BeautifulInputStyles>


    )
}
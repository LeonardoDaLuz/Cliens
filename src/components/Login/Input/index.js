import { BeautifulInputStyles, InputBackground, InputIcon } from "./style";

export default function Input({ type, value, placeholder, name, id, label, icon }) {
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
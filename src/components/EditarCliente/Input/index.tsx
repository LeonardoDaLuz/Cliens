import { InputStyles, InputBackground, InputIcon } from "./style";

interface props {
    type: string;
    value: string;
    placeholder: string;
    name: string;
    id: string;
    label: string;
    icon: string;
}

export default function Input({ type, value, placeholder, name, id, label, icon }: props): JSX.Element {
    return (

        <InputStyles>
            <label htmlFor={id}>{label}</label>
            <InputBackground>
                <InputIcon icon={icon}></InputIcon>
                <input type={type} name={name} id={id} placeholder={placeholder} value={value} />
            </InputBackground>

        </InputStyles>


    )
}
import React from "react";
import { EditarStyles, CenterButtons } from "./style";
import { Button, Container, Icon } from "../../globalStyle";
import assets from "../../assets";
import { formatCPF } from "../../utils/formatCpf";
import Input from "./Input";
import { useFormik } from "formik";
import { useAppDispatch } from "../../store/hooks";

interface FormularyType {
    name?: string,
    cpf?: string,
    email?: string,
    cep?: string,
    street?: string,
    district?: string,
    city?: string,
    number?: number
}

type allPropsAsString<T> = {
    [P in keyof T as string]: string
}

type PropType<TObj, TProp extends keyof TObj> = TObj[TProp];

type allKeysAsString<T> = {
    [P in keyof T as string]: PropType<T, P>
}

export default function EditarCliente() {

    const dispatch = useAppDispatch();

    const validate = (values: FormularyType) => {

        const errors: allPropsAsString<FormularyType> = {};

        if (!values.name)
            errors.name = 'Requerido';
        else if (values.name.length < 6)
            errors.name = 'Deve conter pelo menos 6 caracteres';

        if (!values.cpf)
            errors.cpf = 'Requerido';
        else if (values.cpf.length != 11)
            errors.cpf = 'Deve conter 11 numeros';
        else if (!TestCPF(values.cpf))
            errors.cpf = 'CPF inválido';

        if (!values.email)
            errors.email = 'Requerido';
        else if (!isValidEmail(values.email))
            errors.email = 'Email inválido';

        if (!values.cep)
            errors.cep = 'Requerido';
        else if (!isValidEmail(values.cep))
            errors.cep = 'Email inválido';


        console.log(errors);
        return errors;
    }

    const formik = useFormik({
        initialValues: {

        },
        validate,
        onSubmit: async (values) => {
            // dispatch(loginThunk(values.login, values.password));
        }

    })
    return (
        <EditarStyles>
            <Container>
                <h1>
                    <Icon src={assets.edit_icon} width='50px' height='50px' />
                    <span>Editar Cliente</span>
                </h1>
                <form onSubmit={formik.handleSubmit}>
                    <Input formik={formik} name='name' type='text' placeholder='Nome...' label='Nome' icon={assets.name_icon} />
                    <Input formik={formik} type='text' name='cpf' placeholder='000.000.000-00' label='CPF' icon={assets.cpf_icon} format='cpf' />
                    <Input formik={formik} type='text' name='email' placeholder='example@gmail.com' label='E-mail' icon={assets.email_icon} />
                    <fieldset>
                        <legend>Endereço:</legend>
                        <Input formik={formik} type='text' name='cep' placeholder='83209-000' label='CEP' icon={assets.cep_icon} />
                        <Input formik={formik} type='text' name='rua' placeholder='Rua Osvaldo Gonçalves...' label='Rua' icon={assets.street_icon} />
                        <Input formik={formik} type='text' name='bairro' placeholder='Jardim Guaraituba...' label='Bairro' icon={assets.bairro_icon} />
                        <Input formik={formik} type='text' name='cidade' placeholder='Paranaguá...' label='Cidade' icon={assets.city_icon} />
                        <Input formik={formik} type='text' name='Número' placeholder='123...' label='Número' icon={assets.number_icon} />
                    </fieldset>

                    <CenterButtons>
                        <Button type='submit'>
                            <Icon src={assets.login_icon} width='32px' height='32px' />
                            Salvar
                        </Button>
                        <Button>
                            <Icon src={assets.login_icon} width='32px' height='32px' />
                            Voltar
                        </Button>
                    </CenterButtons>

                </form>

            </Container>
        </EditarStyles>

    );
}

function TestCPF(strCPF: string) {
    let Soma;
    let Resto;
    Soma = 0;
    if (strCPF == "00000000000") return false;

    for (let i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) return false;
    return true;
}

function isValidEmail(email: string) {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
}

/*
function IsCEP(strCEP, blnVazio)
{
    // Caso o CEP não esteja nesse formato ele é inválido!
    let objER = /^[0-9]{2}.[0-9]{3}-[0-9]{3}$/;

    strCEP = Trim(strCEP)
    if(strCEP.length > 0)
        {
            if(objER.test(strCEP))
                return true;
            else
                return false;
        }
    else
        return blnVazio;
}*/
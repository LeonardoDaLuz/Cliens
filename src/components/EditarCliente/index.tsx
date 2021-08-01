import React, { useEffect } from "react";
import { EditarStyles, CenterButtons, CenteredLoaderWheel } from "./style";
import { Button, Container, Icon, LoaderWheel } from "../../globalStyle";
import assets from "../../assets";
import { formatCPF } from "../../utils/formatCpf";
import Input from "./Input";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useHistory, useLocation, useParams } from "react-router";
import { loadCustomer, updateCustomer } from "../../store/customer";
import { RootState } from "../../store";

export interface FormularyType {
    name?: string,
    cpf?: string,
    email?: string,
    cep?: string,
    street?: string,
    district?: string,
    city?: string,
    number?: number
}

interface ViaCEPResponseType {

    cep: string,
    logradouro: string,
    complemento: string,
    bairro: string,
    localidade: string,
    uf: string,
    ibge: number,
    gia: number,
    ddd: number,
    siafi: number

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

    const history = useHistory();

    const { id } = useParams<{ id: string }>();

    useEffect(() => {

        if (id)
            dispatch(loadCustomer(id));
        else
            formik.setValues({});

    }, []);


    const customerState = useAppSelector((store: RootState) => store.customer);

    const customer = customerState.customer;

    const validate = (values: FormularyType) => {

        const errors: allPropsAsString<FormularyType> = {};

        console.log('isValidCPF', values.cpf, isValidCPF(values.cpf));

        if (!values.name)
            errors.name = 'Requerido';
        else if (!isValidName(values.name))
            errors.name = 'Deve conter nome completo';
        else if (values.name.length < 7)
            errors.name = 'Deve conter pelo menos 7 caracteres';


        if (!values.cpf)
            errors.cpf = 'Requerido';
        else if (values.cpf.length != 14) {
            errors.cpf = 'Deve conter 11 numeros';
        }
        else if (!isValidCPF(values.cpf)) {

            errors.cpf = 'CPF inválido';
        }

        if (!values.email)
            errors.email = 'Requerido';
        else if (!isValidEmail(values.email))
            errors.email = 'Email inválido';

        if (!values.cep)
            errors.cep = 'Requerido';
        else if (!IsValidCEP(values.cep))
            errors.cep = 'Cep invalido';

        if (!values.street)
            errors.street = 'Requerido';

        if (!values.district)
            errors.district = 'Requerido';

        if (!values.city)
            errors.city = 'Requerido';

        if (!values.number)
            errors.number = 'Requerido';

        return errors;
    }

    const formik = useFormik({
        initialValues: {

        },
        validate,
        onSubmit: async (values) => {

            if (id) {
                await dispatch(updateCustomer(customer.id, values));
            } else {
                await dispatch(updateCustomer(-1, values));
            }

            history.push('/');
            // dispatch(loginThunk(values.login, values.password));
        }
    })

    useEffect(() => {

        if (customer && id) {
            formik.setValues({
                name: customer.nome,
                cpf: customer.cpf,
                email: customer.email,
                cep: customer.endereco.cep.toString(),
                street: customer.endereco.rua,
                district: customer.endereco.bairro,
                city: customer.endereco.cidade,
                number: customer.endereco.numero
            });
        }
    }, [customer])



    async function autoFillWithViaCEP(e: React.ChangeEvent<HTMLInputElement>) {

        if (IsValidCEP(e.target.value)) {
            const url = 'https://viacep.com.br/ws/' + e.target.value + '/json/unicode/';
            const response = await fetch(url);
            if (response.status === 200) {
                const responseText = await response.text();

                try {
                    const data = JSON.parse(responseText) as ViaCEPResponseType;

                    if (data.logradouro) {

                        console.log("deu certo", data);

                        formik.setFieldValue('street', data.logradouro);
                        formik.setFieldValue('district', data.bairro);
                        formik.setFieldValue('city', data.localidade);

                    } else {
                        console.error('Resposta inesperada para ' + url, responseText);
                    }

                } catch (err) {
                    console.error('JSON: Não foi possível parsear a resposta da rota ' + url)
                }
            } else {
                console.error('Bad request para ' + url)
            }
        }
    }

    return (
        <EditarStyles>
            <Container>

                <h1>
                    <Icon src={assets.edit_icon} width='50px' height='50px' />
                    {id && <span>Editar Cliente</span> || <span>Adicionar Cliente</span>
                    }
                </h1>

                {(customer || !id) && customerState.status !== 'updating' &&
                    <form onSubmit={formik.handleSubmit}>
                        <Input formik={formik} name='name' type='text' placeholder='Nome...' label='Nome' icon={assets.name_icon} />
                        <Input formik={formik} type='text' name='cpf' placeholder='000.000.000-00' label='CPF' icon={assets.cpf_icon} format='cpf' />
                        <Input formik={formik} type='text' name='email' placeholder='example@gmail.com' label='E-mail' icon={assets.email_icon} />
                        <fieldset>
                            <legend>Endereço:</legend>
                            <Input formik={formik} type='text' name='cep' placeholder='83209-000' label='CEP' icon={assets.cep_icon} format='cep' onChange={autoFillWithViaCEP} />
                            <Input formik={formik} type='text' name='street' placeholder='Rua Exemplo da Silva' label='Rua' icon={assets.street_icon} />
                            <Input formik={formik} type='text' name='district' placeholder='Bairro' label='Bairro' icon={assets.bairro_icon} />
                            <Input formik={formik} type='text' name='city' placeholder='São paulo...' label='Cidade' icon={assets.city_icon} />
                            <Input formik={formik} type='number' name='number' placeholder='123...' label='Número' icon={assets.number_icon} />
                        </fieldset>

                        <CenterButtons>
                            <Button type='submit' disabled={!formik.isValid}>
                                <Icon src={assets.login_icon} width='32px' height='32px' />
                                Salvar
                            </Button>
                            <Button>
                                <Icon src={assets.login_icon} width='32px' height='32px' />
                                Voltar
                            </Button>
                        </CenterButtons>

                    </form> ||
                    <CenteredLoaderWheel />
                }

            </Container>
        </EditarStyles>

    );
}

function isValidCPF(strCPF: string) {

    strCPF = strCPF.replace(/[^\d]/g, ""); //remove caracteres repetidos

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


function IsValidCEP(strCEP: string) {

    const objER = /^\d{5}-\d{3}$/;

    if (strCEP.length > 0) {
        if (objER.test(strCEP.replace(/(\d{5})(\d{3})/, "$1-$2")))
            return true;
        else
            return false;
    }
    else
        return false;
}

function isValidName(name: string) {
    const pattern = /[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]{2,99}\s[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]{2,99}/gi;
    return pattern.test(name);

}
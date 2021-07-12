import { EditarStyles,  CenterButtons } from "./style";
import { Button, Container, Icon } from "../../globalStyle";
import assets from "../../assets";
import { formatCPF } from "../../utils/formatCpf";
import Input from "./Input";

export default function EditarCliente() {
    return (
        <EditarStyles>
            <Container>
                <h1>
                    <Icon src={assets.edit_icon} width='50px' height='50px' />
                    <span>Editar Cliente</span>
                </h1>
                <form>
                    <Input type='text' name='nome' id='nome' placeholder='Nome...' value='' label='Nome' icon={assets.name_icon} />
                    <Input type='text' name='cpf' id='cpf' placeholder='000.000.000-00' value='' label='CPF' icon={assets.cpf_icon} />
                    <Input type='text' name='login' id='login' placeholder='example@gmail.com' value='' label='E-mail' icon={assets.email_icon} />
                    <fieldset>
                        <legend>Endereço:</legend>
                        <Input type='text' name='cep' id='cep' placeholder='83209-000' value='' label='CEP' icon={assets.cep_icon} />
                        <Input type='text' name='rua' id='rua' placeholder='Rua Osvaldo Gonçalves...' value='' label='Rua' icon={assets.street_icon} />
                        <Input type='text' name='bairro' id='bairro' placeholder='Jardim Guaraituba...' value='' label='Bairro' icon={assets.bairro_icon} />
                        <Input type='text' name='cidade' id='cidade' placeholder='Paranaguá...' value='' label='Cidade' icon={assets.city_icon} />
                        <Input type='text' name='Número' id='Número' placeholder='123...' value='' label='Número' icon={assets.number_icon} />
                    </fieldset>

                    <CenterButtons>
                        <Button>
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


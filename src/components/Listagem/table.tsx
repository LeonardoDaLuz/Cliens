import { TableContainer, TableLoaderWheel } from "./style";
import { Button, Container, Icon } from "../../globalStyle";
import assets from "../../assets";
import { formatCPF } from "../../utils/formatCpf";



interface props {
    lista: [] | 'not found',
    status: string,
    searchCompleted: boolean
}


export default function Table({ lista, status, searchCompleted }: props) {

    return (
        <TableContainer>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>CPF</th>
                    <th>E-mail</th>
                    <th>Cidade</th>
                    <th style={{width: '140px'}}>Opções </th>
                </tr>
            </thead>
            <tbody>
                {lista && lista !== 'not found' && lista.map((item: any, index: Number) => {
                    return (
                        <tr>
                            <td>{index} - {item["nome"]}</td>
                            <td>{formatCPF(item["cpf"])} </td>
                            <td>{item["email"].toLocaleLowerCase()} </td>
                            <td>{item["endereco"]['cidade']} </td>
                            <td width='140px'>
                                <Button>
                                    <Icon src={assets.edit_icon} height='16px' width='16px' />
                                </Button>
                                <Button>
                                    <Icon src={assets.delete_icon} height='16px' width='16px' />
                                </Button>
                            </td>
                        </tr>
                    );
                })}

            </tbody>
            <tfoot>
                <td colSpan={5}>
                    {
                        !searchCompleted && <TableLoaderWheel />
                    }
                    {
                        searchCompleted && <span>Pesquisa concluída</span>
                    }
                </td>
            </tfoot>
        </TableContainer>
    );
}
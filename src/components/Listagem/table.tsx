import React from "react";
import { TableContainer, TableLoaderWheel } from "./style";
import { Button, Icon } from "../../globalStyle";
import assets from "../../assets";
import { formatCPF } from "../../utils/formatCpf";
import { Client } from "../../store/customers";
import { loadCustomerSucess } from "../../store/customer";
import { useAppDispatch } from "../../store/hooks";
import { useHistory } from "react-router";

type props =   {
    lista: Client[],
    loadCompleted: boolean,
    status: string
}


function Table({ lista, loadCompleted }: props) {

    const dispatch = useAppDispatch();
    const history = useHistory();

    return (
        <TableContainer>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>CPF</th>
                    <th>E-mail</th>
                    <th>Cidade</th>
                    <th style={{ width: '140px' }}>Opções </th>
                </tr>
            </thead>
            <tbody>
                {lista && lista.map((item: Client, index: number) => {
                    return (
                        <React.Fragment key={index}>
                            <tr >
                                <td>{index} - {item["nome"]}</td>
                                <td>{formatCPF(item["cpf"])} </td>
                                <td>{item["email"].toLocaleLowerCase()} </td>
                                <td>{item["endereco"]['cidade']} </td>
                                <td width='140px'>
                                    <Button onClick={(e) => {
                                        dispatch(loadCustomerSucess({ id: item.id, customer: item }));
                                        history.push('/edit/'+item.id);
                                    }}>
                                        <Icon src={assets.edit_icon} height='16px' width='16px' />
                                    </Button>
                                    <Button>
                                        <Icon src={assets.delete_icon} height='16px' width='16px' />
                                    </Button>
                                </td>
                            </tr>
                            <tr><td colSpan={5}><hr></hr></td></tr>
                        </ React.Fragment>
                    );
                })}

            </tbody>
            <tfoot>
                <tr>
                    <td key={0} colSpan={5}>
                        {
                            !loadCompleted && <TableLoaderWheel />
                        }
                        {
                            loadCompleted && <span>Pesquisa concluída</span>
                        }
                    </td>
                </tr>
            </tfoot>
        </TableContainer>
    );
}
export default Table;
import React from "react";
import { TableContainer, TableLoaderWheel } from "./style";
import { Button, Icon } from "../../globalStyle";
import assets from "../../assets";
import { formatCPF } from "../../utils/formatCpf";
import { Client, infiniteLoaderPointerReset } from "../../store/customers";
import { deleteCustomerThunk, loadCustomerSucess } from "../../store/customer";
import { useAppDispatch } from "../../store/hooks";
import { useHistory } from "react-router";

type props = {
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
                    <th>ID</th>
                    <th>Nome</th>
                    <th className='onlyDesktop'>CPF</th>
                    <th className='onlyDesktop'>E-mail</th>
                    <th className='onlyDesktop'>Cidade</th>
                    <th className='onlyMobile'>CPF, Email e Cidade</th>
                    <th className='row-options'>Opções </th>
                </tr>
            </thead>
            <tbody>
                {lista && lista.map((item: Client, index: number) => {
                    return (
                        <React.Fragment key={index}>
                            <tr >
                                <td>{item['id']}</td>
                                <td><b>{item["nome"]}</b></td>
                                <td className='onlyDesktop whitespace-nowrap'>{formatCPF(item["cpf"])} </td>
                                <td className='onlyDesktop text-excerpt'>{item["email"].toLocaleLowerCase()} </td>
                                <td className='onlyDesktop'>{item["endereco"]['cidade']} </td>
                                <td className='onlyMobile'>
                                    {formatCPF(item["cpf"])
                                    }
                                    <div className='text-excerpt'>
                                        {item["email"].toLocaleLowerCase()}
                                    </div>
                                    <div className='text-excerpt'>
                                        {item["endereco"]['cidade']}
                                    </div>
                                </td>
                                <td className='row-options'>
                                    <Button onClick={(e) => {
                                        dispatch(loadCustomerSucess({ id: item.id, customer: item }));
                                        history.push('/edit/' + item.id);
                                    }}>
                                        <Icon src={assets.edit_icon} height='16px' width='16px' />
                                    </Button>
                                    <Button onClick={async (e) => {
                                        await dispatch(deleteCustomerThunk(item.id));
                                        dispatch(infiniteLoaderPointerReset());
                                    }}>
                                        <Icon src={assets.delete_icon} height='16px' width='16px' />
                                    </Button>
                                </td>
                            </tr>
                            <tr><td colSpan={6}><hr></hr></td></tr>
                        </ React.Fragment>
                    );
                })}

            </tbody>
            <tfoot>
                <tr>
                    <td key={0} colSpan={6}>
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
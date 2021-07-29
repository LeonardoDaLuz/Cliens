import React from "react";
import { TableContainer, TableLoaderWheel } from "./style";
import { Button, Icon } from "../../globalStyle";
import assets from "../../assets";
import { formatCPF } from "../../utils/formatCpf";
import { Client } from "../../store/customers";

interface props {
    lista: Client[],
    loadCompleted: boolean,
    status: string
}


export default function Table({ lista, loadCompleted }: props) {

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
                                    <Button>
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
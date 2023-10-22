import { IResourceComponentsProps } from "@refinedev/core";
import {
    Row,
    Col,
    Layout as AntdLayout,
    Card,
    Typography,
    Form,
    Input,
    Button,
    Checkbox,
} from "antd";
import { TableList } from "../../components/table";
import { listAllFuncionanrio } from "../../services/methods/funcoes";
import { useEffect, useState } from "react";
import "./styles.css"
import React from "react";
import { Link } from "react-router-dom";

const columns = [
    {
        label: "Nome",
        dataIndex : "nome",
        sorter: {
            compare: (a: any, b: any) => a.nome - b.nome,
            multiple: 3,
          },
    },
    {
        label: "Sobrenome",
        dataIndex : "sobrenome",
        order : ""
    },
    {
        label: "Sexo",
        dataIndex : "sexo",
        order : "",
        sorter: {
            compare: (a: any, b: any) => a.sexo - b.sexo,
            multiple: 3,
          },
    },
    {
        label: "Cpf",
        dataIndex : "cpf",
        defaultSortOrder: 'ASC',
        sorter: {
            compare: (a: any, b: any) => a.cpf - b.cpf,
            multiple: 3,
          },
    },
    {
        label: "Contato",
        dataIndex : "telefone",
        order : ""
    },
    {
        label: "Perfil",
        dataIndex : "usuario.role.name",
        order : ""
    },
]
export const PessoaList: React.FC<IResourceComponentsProps> = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [order, setOrder] = useState()
    const handlePageChange = (page: number,sorter: any) => {
        setCurrentPage(page);
        setOrder(sorter)
    };
    const [data, setData] = useState();
    useEffect(() => {
        async function fetchData() {
            try {
                const dados = await listAllFuncionanrio(currentPage,order);
                setData(dados.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
      }, [currentPage, order]);

    return (
        <div>
            <div className="buttonCreatePeaple">
                    <Link to="/pessoa/create">
                        <Button type="primary">
                            Criar usuário
                        </Button>
                    </Link>
            </div>
            <TableList column={columns} onChange={handlePageChange} dataSource={data}  />
        </div>
    )
};

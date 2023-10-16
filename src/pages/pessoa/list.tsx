import { IResourceComponentsProps } from "@refinedev/core";

import { TableList } from "../../components/table";
import { listAllFuncionanrio } from "../../services/methods/funcoes";
import { useEffect, useState } from "react";



const columns = [
    {
        label: "Nome",
        dataIndex : "nome",
        order : ""
    },
    {
        label: "Sobrenome",
        dataIndex : "sobrenome",
        order : ""
    },
    {
        label: "Sexo",
        dataIndex : "sexo",
        order : ""
    },
    {
        label: "Cpf",
        dataIndex : "cpf",
        order : ""
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
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    console.log(currentPage);
    const [data, setData] = useState();
    useEffect(() => {
        async function fetchData() {
            try {
                const dados = await listAllFuncionanrio(currentPage);
                setData(dados.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
      }, [currentPage]);
    return (
        <div>
            <TableList column={columns} data={data} onPageChange={handlePageChange} />
        </div>
    )
};

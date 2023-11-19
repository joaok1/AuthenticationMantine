/* eslint-disable @typescript-eslint/no-explicit-any */
import { IResourceComponentsProps } from '@refinedev/core';
import { Button, Flex, Tooltip } from 'antd';
import { TableList } from '../../components/Table/table';
import { useEffect, useState } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import { People } from '@mui/icons-material';
import { Box } from '@mui/material';
import { listAllFuncionario } from 'src/stores/pessoaStore';

const columnActions = [
  { label: 'Editar', action: 'edit' },
  { label: 'Excluir', action: 'delete' },
  { label: 'Visualizar', action: 'visualizar' },
];
const columns = [
  {
    label: 'Nome',
    dataIndex: 'nome',
    sorter: {
      multiple: 3,
      compare: (a: any, b: any) => a.nome - b.nome,
    },
  },
  {
    label: 'Sobrenome',
    dataIndex: 'sobrenome',
    order: '',
  },
  {
    label: 'Sexo',
    dataIndex: 'sexo',
    sorter: {
      multiple: 3,
      compare: (a: any, b: any) => a.sexo - b.sexo,
    },
  },
  {
    label: 'Cpf',
    dataIndex: 'cpf',
    sorter: {
      multiple: 3,
      compare: (a: any, b: any) => a.cpf - b.cpf,
    },
  },
  {
    label: 'Contato',
    dataIndex: 'telefone',
    order: '',
  },
  {
    label: 'Perfil',
    dataIndex: 'usuario.role.name',
    order: '',
    sorter: {
      multiple: 3,
      compare: (a: any, b: any) => a.usuario.role.name - b.usuario.role.name,
    },
  },
];
export const PessoaList: React.FC<IResourceComponentsProps> = () => {
  const [currentPage, setCurrentPage] = useState(0);
  // const [deleteDados, setDeleteDados] = useState(null);
  const [order, setOrder] = useState('');
  const handlePageChange = (page: number, sorter: string) => {
    setCurrentPage(page);
    setOrder(sorter);
  };
  const [data, setData] = useState();
  useEffect(() => {
    async function fetchData() {
      try {
        const dados = await listAllFuncionario(currentPage, order);
        setData(dados.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [currentPage, order]);
  return (
    <Box>
      <Flex justify="end">
        <Link to="/pessoa/create">
          <Flex align="center">
            <Tooltip title="Cadastrar usuário">
              <Button
                type="primary"
                ghost
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <People className="icon" />
                Cadastrar usuário
              </Button>
            </Tooltip>
          </Flex>
        </Link>
      </Flex>
      <TableList
        column={columns}
        onChange={handlePageChange}
        dataSource={data}
        actions={columnActions}
      />
    </Box>
  );
};

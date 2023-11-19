/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { Flex } from 'antd';
import { useState, useEffect } from 'react';
import IPessoa from 'src/interfaces/pessoa';
import { dadosPessoa } from 'src/stores/pessoaStore';

export const Titulo = () => {
  const [dados, setDados] = useState<IPessoa>();
  useEffect(() => {
    async function fetchData() {
      try {
        const dados = await dadosPessoa();
        setDados(dados.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  return (
    <Flex justify="center" style={{ width: '100%' }}>
      <span style={{ fontSize: '24px' }}>{dados?.nome}</span>
    </Flex>
  );
};
export default Titulo;

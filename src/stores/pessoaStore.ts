import  IPessoa  from "../interfaces/pessoa";
import { PessoaCreate } from './../pages/pessoa/create';
import axios from "axios";
import Cookies from "js-cookie";


export const cadastroFuncionario = async (object: IPessoa) => {
  const data = {
    method: "post",
    url: `http://localhost:1080/api/pessoa/adicionar`,
    data: object,
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  };
  return axios(data);
}

export const dadosLogin = async () => {
  const usuario = axios.get(
    `http://localhost:1080/api/usuarios/findByLogin/${Cookies.get(
      "dados_usuario"
    )}`
  );
  return usuario;
}

export const listAllFuncionario = async (page : number, ordernacao:any) => {
  if (ordernacao) {
    ordernacao.order = ordernacao.order === 'descend' ? 'DESC' : 'ASC';
    const data = {
      method: "get",
      url: `http://localhost:1080/api/pessoa/findByAllPessoa?size=10&page=${page}&sort=${ordernacao.field,ordernacao.order}`,
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    };
    const dados = await axios(data)
    return dados;
  }
  const data = {
    method: "get",
    url: `http://localhost:1080/api/pessoa/findByAllPessoa?size=10&page=${page}`,
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  };
  const dados = await axios(data)
  return dados;
}
export const getIdUser = async () => {
  const usuario = axios.get(
    `http://localhost:1080/api/usuarios/findByLogin/${Cookies.get(
      "dados_usuario"
    )}`
  );
  return (await usuario).data.id;
}
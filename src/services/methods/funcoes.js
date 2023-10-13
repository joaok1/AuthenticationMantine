import axios from "axios";
import Cookies from "js-cookie";


  //Configurações globais do usuario
  //Resgata o usuario logado

  // Busca o id do usuario
  export const getIdUser = async () => {
    const usuario = axios.get(
      `http://localhost:1080/api/usuarios/findByLogin/${Cookies.get(
        "dados_usuario"
      )}`
    );
    return (await usuario).data.id;
  }

  export const dadosLogin = async () => {
    const usuario = axios.get(
      `http://localhost:1080/api/usuarios/findByLogin/${Cookies.get(
        "dados_usuario"
      )}`
    );
    return usuario;
  }
  // async getListagemProdutos(page) {
  //   const data = {
  //     method: "get",
  //     url: `http://localhost:1080/api/ingrediente/findAll?size=10&page=${page}`,
  //     headers: {
  //       Authorization: `Bearer ${Cookies.get("token")}`,
  //     },
  //   };
  //   return axios(data);
  // },
  // async listAllFuncionarioPage(page) {
  //   const data = {
  //     method: "get",
  //     url: `http://localhost:1080/api/pessoa/findByAllPessoa?size=10&page=${page}`,
  //     headers: {
  //       Authorization: `Bearer ${Cookies.get("token")}`,
  //     },
  //   };
  //   return axios(data);
  // }
export default actions;

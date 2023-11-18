
export default interface IPessoa {
  id: any;
  nome: string,
  sobrenome: string,
  cpf: string,
  cep: string,
  role: string,
  bairro: string,
  municipio: string,
  logradouro: string,
  estado: string,
  numero: string,
  data_nascimento: string,
  sexo: string,
  telefone: string,
  email: string,
  usuario: {
    senha: string
  }

}
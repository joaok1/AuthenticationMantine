/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-var-requires
import { cpf, cnpj } from 'cpf-cnpj-validator'

export const checkNullNumber = (number: number | undefined) => {
  if (number === null || number === undefined) {
    return 's/n'
  } else {
    return number
  }
}

export const formatarTelefone = (numero: string) => {
  const numeros = numero.replace(/\D/g, '')

  if (numeros.length === 10) {
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 6)}-${numeros.slice(6)}`
  } else if (numeros.length === 11) {
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`
  } else {
    return numero
  }
}

export const formatarCPFCNPJ = (documento: string) => {
  const numeros = documento?.replace(/\D/g, '')

  if (numeros?.length === 11) {
    return `${numeros.slice(0, 3)}.${numeros.slice(3, 6)}.${numeros.slice(
      6,
      9
    )}-${numeros.slice(9)}`
  } else if (numeros?.length === 14) {
    return `${numeros.slice(0, 2)}.${numeros.slice(2, 5)}.${numeros.slice(
      5,
      8
    )}/${numeros.slice(8, 12)}-${numeros.slice(12)}`
  } else {
    return documento
  }
}

export const removeformatarCPFCNPJ = (dados: string) => {
  const cpfWithoutFormat = dados.replace(/[^\d]/g, '')
  let login: string = ''
  return (login = cpfWithoutFormat)
}

export const dateAsString = (date: Date) => {
  return date.toLocaleDateString('pt-br')
}

export const validarCPFCNPJ = (cpfcnpj: string) => {
  if (cpfcnpj.length > 0) {
    if (cpfcnpj.length === 11) {
      return !cpf.isValid(cpfcnpj, false)
    } else {
      return !cnpj.isValid(cpfcnpj, false)
    }
  }
}

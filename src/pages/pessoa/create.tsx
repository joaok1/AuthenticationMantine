import React, { useState } from 'react';
import type { message } from 'antd';
import {
    Alert,
  AutoComplete,
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Flex,
  Form,
  Input,
  Row,
  Select,
} from 'antd';
import { IResourceComponentsProps } from '@refinedev/core';
import { cadastroFuncionario } from "../../stores/pessoaStore";
import { Link } from 'react-router-dom';
import useMessage from 'antd/es/message/useMessage';
import { redirect } from 'next/dist/server/api-utils';
import { useNavigate } from 'react-router-dom';
import style from './styles.module.css'
import { Box } from '@mui/material';
import IPessoa from 'src/interfaces/pessoa';


const { Option } = Select;

interface DataNodeType {
  value: string;
  label: string;
  children?: DataNodeType[];
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 24,
    },
  },
};


export const PessoaCreate: React.FC<IResourceComponentsProps> = () => {
    const history = useNavigate();
    const [form] = Form.useForm();

    const pessoa: IPessoa = {
      nome: '',
      sobrenome: '',
      cpf: '',
      cep: '',
      role: '',
      bairro: '',
      municipio: '',
      logradouro: '',
      estado: '',
      numero: '',
      data_nascimento: '',
      sexo: '',
      telefone: '',
      email: '',
      usuario: {
        senha: ''
      },
      id: undefined
    };
    const config = {
        rules: [{ type: 'object' as const, required: true, message: 'Please select time!' }],
      };

    const onFinish = (data: any) => {
        pessoa.bairro = data.bairro;
        pessoa.cep = data.cep;
        pessoa.cpf = data.cpf;
        pessoa.data_nascimento = data.data_nascimento;
        pessoa.email = data.email;
        pessoa.estado = data.estado;
        pessoa.logradouro = data.logradouro;
        pessoa.municipio = data.municipio;
        pessoa.nome = data.nome;
        pessoa.numero = data.numero;
        pessoa.role = data.role;
        pessoa.sexo = data.sexo;
        pessoa.sobrenome = data.sobrenome;
        pessoa.telefone = data.telefone;
        pessoa.usuario.senha = data.senha;

        cadastroFuncionario(pessoa).then((response) => {
            history("/pessoa")
            return <Alert message="Success Text" type="success" />;
        })
    };


    const prefixSelector = (
      <Form.Item name="prefix" noStyle>
        <Select style={{ width: 70 }}>
          <Option value="55">+55</Option>
        </Select>
      </Form.Item>
    );
  
    const [autoCompleteResult, setAutoCompleteResult] = useState<string[]>([]);
  
    const onWebsiteChange = (value: string) => {
      if (!value) {
        setAutoCompleteResult([]);
      } else {
        setAutoCompleteResult(['.com', '.org', '.net'].map((domain) => `${value}${domain}`));
      }
    };
  
    const websiteOptions = autoCompleteResult.map((website) => ({
      label: website,
      value: website,
    }));

    return (
        <Card title="Cadastro de Pessoas" bordered={true}>
            <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{ prefix: '55' }}
            scrollToFirstError
            >
            <Row gutter={8}>
                <Col span={12}>
                    <Card title="Dados pessoais" bordered={true}>
                        <Row gutter={8}>
                            <Col span={7}>
                                <Form.Item
                                    name="nome"
                                    label="Nome"
                                    tooltip="Digite seu nome "
                                    rules={[{ required: true, message: 'Digite seu nome!', whitespace: true }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={10}>
                                <Form.Item
                                    name="sobrenome"
                                    label="Sobrenome"
                                    tooltip="Digite seu sobrenome "
                                    rules={[{ required: true, message: 'Digite seu sobrenome!', whitespace: true }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={7}>
                                <Form.Item
                                name="email"
                                tooltip="Digite o email"
                                label="E-mail"
                                rules={[
                                    {
                                    type: 'email',
                                    message: 'E-mail inválido!',
                                    },
                                    {
                                    required: true,
                                    message: 'Digite o email!',
                                    },
                                ]}
                                >
                                <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={8}>
                            <Col span={10}>
                                <Form.Item name="data_nascimento" label="Nascimento" {...config} tooltip="Insira a data nascimento "  >
                                    <DatePicker  showTime format="DD/MM/YYYY"  />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                        name="cpf"
                                        label="Cpf"
                                        tooltip="Digite seu cpf "
                                        rules={[{ required: true, message: 'Digite seu CPF!', whitespace: true }]}
                                    >
                                    <Input  />
                                </Form.Item>
                            </Col>
                            <Col span={7}>
                                <Form.Item
                                name="role"
                                label="Cargo"
                                tooltip="Selecione o cargo " 
                                rules={[{ required: true, message: 'Selecione o cargo!' }]}
                                >
                                    <Select placeholder="selecione o cargo">
                                    <Option value="ADMIN">ADMIN</Option>
                                    <Option value="CAIXA">CAIXA</Option>
                                    <Option value="GERENTE">GERENTE</Option>
                                    <Option value="USER">USER</Option>
                                    <Option value="VENDEDOR">VENDEDOR</Option>

                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="sexo"
                                    label="Sexo"
                                    rules={[{ required: true, message: 'Selecione o sexo!' }]}
                                >
                                <Select placeholder="selecione o sexo">
                                    <Option value="Masculino">Masculino</Option>
                                    <Option value="Feminino">Feminino</Option>
                                    <Option value="Outros">Outros</Option>
                                </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="Endereço" bordered={true} >
                        <Row gutter={8}>
                            <Col span={6}>
                                <Form.Item
                                    name="cep"
                                    label="Cep"
                                    tooltip="Digite seu cep "
                                    rules={[{ required: true, message: 'Digite seu nome!', whitespace: true }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item
                                    name="bairro"
                                    label="Bairro"
                                    tooltip="Digite seu bairro "
                                    rules={[{ required: true, message: 'Digite seu sobrenome!', whitespace: true }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item
                                name="municipio"
                                tooltip="Digite o municipio"
                                label="Municipio"
                                rules={[{ required: true, message: 'Digite seu municipio!', whitespace: true }]}
                                >
                                <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={8}>
                            <Col span={12}>
                                <Form.Item name="logradouro" label="Logradouro" tooltip="Insira o logradouro "  >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                        name="estado"
                                        label="Estado"
                                        tooltip="Digite seu estado "
                                        rules={[{ required: true, message: 'Digite seu estado!', whitespace: true }]}
                                    >
                                    <Input  />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                name="numero"
                                label="Numero"
                                tooltip="Digite o numero! " 
                                rules={[{ required: true, message: 'Digite o numero!' }]}
                                >
                                    <Input  />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
            <Divider/>
            <Card title="Contatos / Usuário" bordered={true} >
                <Row gutter={8}>
                    <Col span={12}>
                        <Form.Item
                        name="senha"
                        label="Senha"
                        rules={[
                            {
                            required: true,
                            message: 'Insira a senha',
                            },
                        ]}
                        hasFeedback
                        >
                        <Input.Password />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="confirm"
                            label="Confirme a senha"
                            dependencies={['senha']}
                            hasFeedback
                            rules={[
                            {
                                required: true,
                                message: 'Confirme a senha!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                if (!value || getFieldValue('senha') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('A nova senha que você digitou não corresponde!'));
                                },
                            }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={8}>
                    <Col span={12}>
                        <Form.Item
                            name="telefone"
                            label="Telefone"
                            rules={[{ required: true, message: 'Insira o número de telefone!' }]}
                        >
                            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true, message: 'Please input website!' }]}
                        >
                        <AutoComplete options={websiteOptions} onChange={onWebsiteChange} placeholder="website">
                            <Input />
                        </AutoComplete>
                        </Form.Item>
                    </Col>
                </Row>
            </Card>
            <Form.Item {...tailFormItemLayout}>
                <Flex justify='space-between'>
                    <Box>
                        <Button type="primary" danger onClick={() => {
                        history("/pessoa")
                        }} >
                            Voltar
                        </Button>
                    </Box>
                    <Box>
                        <Button type="primary" htmlType="submit">
                            Registrar
                        </Button>
                    </Box>
                </Flex>

            </Form.Item>
            
            </Form>
        </Card>
      );
}
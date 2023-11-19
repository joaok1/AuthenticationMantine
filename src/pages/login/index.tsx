import React from 'react';
import { useLogin } from '@refinedev/core';
import {
  Row,
  Col,
  Layout as AntdLayout,
  Card,
  Typography,
  Form,
  Input,
  Button,
  Image,
  Flex,
} from 'antd';
import './styles.css';
import { Box } from '@mui/material';
import { formatarCPFCNPJ } from 'src/utils/FormatterUtils';
const { Title } = Typography;

export interface ILoginForm {
  username: string;
  password: string;
  remember: boolean;
}

export const Login: React.FC = () => {
  const [form] = Form.useForm<ILoginForm>();

  const { mutate: login } = useLogin<ILoginForm>();

  const CardTitle = (
    <Title
      level={3}
      className="title"
      style={{ marginTop: '26px', alignItems: 'center' }}
    >
      Seja bem-vindo!
    </Title>
  );

  return (
    <AntdLayout className="layout">
      <Row
        justify="center"
        align="middle"
        style={{
          height: '100vh',
        }}
      >
        <Col xs={22}>
          <Box className="container">
            <Flex justify="center" style={{ marginBottom: '20px' }}>
              <Image
                width={250}
                src="./logo.png"
                preview={false}
                alt="Refine Logo"
                className="image"
              />
            </Flex>
            <Box>
              <Card title={CardTitle} headStyle={{ borderBottom: 0 }}>
                <Form<ILoginForm>
                  layout="vertical"
                  form={form}
                  onFinish={values => {
                    login(values);
                  }}
                  requiredMark={false}
                  initialValues={{
                    remember: false,
                  }}
                >
                  <Form.Item
                    name="username"
                    label="CPF"
                    rules={[{ required: true }]}
                  >
                    <Input
                      size="large"
                      value={formatarCPFCNPJ(form.getFieldValue('username'))}
                      onChange={e => {
                        const formattedValue = formatarCPFCNPJ(e.target.value);
                        form.setFieldsValue({ username: formattedValue });
                      }}
                      placeholder="Digite seu CPF"
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    label="Senha"
                    rules={[{ required: true }]}
                    style={{ marginBottom: '12px' }}
                  >
                    <Input.Password
                      type="password"
                      placeholder="●●●●●●●●"
                      size="large"
                    />
                  </Form.Item>
                  <Button type="primary" size="large" htmlType="submit" block>
                    Entrar
                  </Button>
                </Form>
              </Card>
            </Box>
          </Box>
        </Col>
      </Row>
    </AntdLayout>
  );
};

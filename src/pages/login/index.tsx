import React from "react";
import { useLogin } from "@refinedev/core";
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
import "./styles.css";

const { Text, Title } = Typography;

export interface ILoginForm {
    username: string;
    password: string;
    remember: boolean;
}

export const Login: React.FC = () => {
    const [form] = Form.useForm<ILoginForm>();

    const { mutate: login } = useLogin<ILoginForm>();

    const CardTitle = (
        <Title level={3} className="title">
            Seja bem-vindo!
        </Title>
    );

    return (
        <AntdLayout className="layout">
            <Row
                justify="center"
                align="middle"
                style={{
                    height: "100vh",
                }}
            >
                <Col xs={22}>
                    <div className="container">
                        <div className="imageContainer">
                            <img src="./logo.png" alt="Refine Logo" className="image"/>
                        </div>
                        <div>
                            <Card title={CardTitle} headStyle={{ borderBottom: 0 }}>
                                <Form<ILoginForm>
                                    layout="vertical"
                                    form={form}
                                    onFinish={(values) => {
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
                                            placeholder="Digite seu CPF"
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="password"
                                        label="Senha"
                                        rules={[{ required: true }]}
                                        style={{ marginBottom: "12px" }}
                                    >
                                        <Input
                                            type="password"
                                            placeholder="●●●●●●●●"
                                            size="large"
                                        />
                                    </Form.Item>
                                    <Button
                                        type="primary"
                                        size="large"
                                        htmlType="submit"
                                        block
                                    >
                                        Entrar
                                    </Button>
                                </Form>
                            </Card>
                        </div>
                    </div>
                </Col>
            </Row>
        </AntdLayout>
    );
};

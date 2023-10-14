import {
    Refine,
    AuthBindings,
    Authenticated,
} from "@refinedev/core";
import {
    useNotificationProvider,
    ThemedLayoutV2,
    ErrorComponent,
    RefineThemes,
} from "@refinedev/antd";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
    NavigateToResource,
    CatchAllNavigate,
    UnsavedChangesNotifier,
    DocumentTitleHandler,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { ConfigProvider, App as AntdApp } from "antd";
import "@refinedev/antd/dist/reset.css";

import { PostList, PostCreate, PostEdit, PostShow } from "./pages/posts";
import { Login } from "./pages/login";
import { loginAuth, clearDados, verifyUserExpired } from "./services/authetication/authentication"
import Cookies from "js-cookie";
import { LanchesList } from "./pages/lanches/list";
import { UsuarioList } from "./pages/usuarios";

const API_URL = "https://api.fake-rest.refine.dev";
const TOKEN_COOKIE_KEY : string = 'token';
const USER_COOKIE_KEY: string  = 'user';
const DADOS_USUARIO : string = 'dados_usuario';

const App: React.FC = () => {
    const authProvider: AuthBindings = {
        login: async ({ username, password }) => {
            const user = {
                login: username,
                senha: password
            }
            let data = await loginAuth(user);
            console.log(data)
            if (data) {
                localStorage.setItem("username", username);
                return {
                    success: true,
                    redirectTo: "/",
                };
            }
            return {
                success: false,
                error: {
                    message: "Login failed",
                    name: "Dados invalidos",
                },
            };
        },
        logout: async () => {
            clearDados();
            return {
                success: true,
                redirectTo: "/login",
            };
        },
        onError: async (error) => {
            console.error(error);
            return { error };
        },
        check: async () => {
            await verifyUserExpired();
            if (Cookies.get(USER_COOKIE_KEY)) {
                return {
                authenticated: true,
                };
            } else {
                return {
                    authenticated: false,
                    redirectTo: "/login",
                };
            }
          },
        getPermissions: async () => ["admin"],
    };

    return (
        <BrowserRouter>
            <ConfigProvider theme={RefineThemes.Blue}>
                <AntdApp>
                    <Refine
                        dataProvider={dataProvider(API_URL)}
                        authProvider={authProvider}
                        routerProvider={routerProvider}
                        resources={[
                            {
                                name: "posts",
                                list: "/posts",
                                show: "/posts/show/:id",
                                create: "/posts/create",
                                edit: "/posts/edit/:id",
                            },
                            {
                                name: "Lanches",
                                list: "/lanches",
                                show: "/posts/show/:id",
                                create: "/posts/create",
                                edit: "/posts/edit/:id",
                            },
                            {
                                name: "Usuarios",
                                list: "/usuarios",
                                show: "/posts/show/:id",
                                create: "/posts/create",
                                edit: "/posts/edit/:id",
                            },
                        ]}
                        notificationProvider={useNotificationProvider}
                        options={{
                            syncWithLocation: true,
                            warnWhenUnsavedChanges: true,
                        }}
                    >
                        <Routes>
                            <Route
                                element={
                                    <Authenticated
                                        fallback={
                                            <CatchAllNavigate to="/login" />
                                        }
                                    >
                                        <ThemedLayoutV2>
                                            <Outlet />
                                        </ThemedLayoutV2>
                                    </Authenticated>
                                }
                            >
                                <Route
                                    index
                                    element={
                                        <NavigateToResource resource="posts" />
                                    }
                                />
                                //Parte do posts
                                <Route path="/posts">
                                    <Route index element={<PostList />} />
                                    <Route
                                        path="create"
                                        element={<PostCreate />}
                                    />
                                    <Route
                                        path="edit/:id"
                                        element={<PostEdit />}
                                    />
                                    <Route
                                        path="show/:id"
                                        element={<PostShow />}
                                    />
                                </Route>
                                <Route
                                    index
                                    element={
                                        <NavigateToResource resource="posts" />
                                    }
                                />
                                //Parte dos lanches
                                <Route path="/lanches">
                                    <Route index element={<LanchesList />} />
                                </Route >
                                //Parte dos Usuarios
                                <Route path="/usuarios">
                                    <Route index element={<UsuarioList />} />
                                </Route >
                            </Route>
                            //Dados do login
                            <Route
                                element={
                                    <Authenticated fallback={<Outlet />}>
                                        <NavigateToResource resource="posts" />
                                    </Authenticated>
                                }
                            >
                                <Route path="/login" element={<Login />} />
                            </Route>

                            <Route
                                element={
                                    <Authenticated>
                                        <ThemedLayoutV2>
                                            <Outlet />
                                        </ThemedLayoutV2>
                                    </Authenticated>
                                }
                            >
                                <Route path="*" element={<ErrorComponent />} />
                            </Route>
                        </Routes>
                        <UnsavedChangesNotifier />
                        <DocumentTitleHandler />
                    </Refine>
                </AntdApp>
            </ConfigProvider>
        </BrowserRouter>
    );
};

export default App;

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
import { Group, LunchDining } from '@mui/icons-material';
import { PostList, PostCreate, PostEdit, PostShow } from "./pages/posts";
import { Login } from "./pages/login";
import { loginAuth, clearDados, verifyUserExpired } from "./services/authetication/authentication"
import Cookies from "js-cookie";
import { LanchesList } from "./pages/lanches/list";
import { PessoaList } from "./pages/pessoa/list";
import { PessoaCreate } from "./pages/pessoa/create";
import React, { Component } from "react";
import { PessoaEdit } from "./pages/pessoa/edit";
import { ThemeProvider } from "@mui/material/styles";
import { ColorScheme, ColorSchemeProvider } from "@mantine/styles/";

import { useLocalStorage } from "@mantine/hooks";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { AppProps } from "next/app";
import { NextPage } from "next";
import {Header} from "./components/header/index"

const API_URL = "http://localhost:1080/api";
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
        getPermissions: async () => {
            return "Bearer" + Cookies.get(TOKEN_COOKIE_KEY)
        }
    };

    const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
        key: "mantine-color-scheme",
        defaultValue: "dark",
        getInitialValueInEffect: true,
      });
      const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === "dark" ? "dark" : "light"));
    
    return (
        <BrowserRouter>
            <RefineKbarProvider>
                <ColorSchemeProvider
                colorScheme={colorScheme}
                toggleColorScheme={toggleColorScheme}>
                    <ThemeProvider theme={{ ...RefineThemes.Blue, colorScheme: colorScheme }}>
                        <AntdApp>
                            <Refine
                                dataProvider={dataProvider(API_URL)}
                                authProvider={authProvider}
                                // routerProvider={routerProvider}
                                resources={[
                                    {
                                        name: "posts",
                                        list: "/posts",
                                        show: "/posts/show/:id",
                                        create: "/posts/create",
                                        edit: "/posts/edit/:id",
                                        meta: {
                                            canDelete: false,
                                            label: 'Em análise',
                                        },
                    
                                    },
                                    {
                                        name: "lanches",
                                        list: "/lanches",
                                        show: "/posts/show/",
                                        create: "/posts/create",
                                        edit: "/posts/edit/:id",
                                        meta: {
                                            canDelete: false,
                                            label: 'Lanches',
                                            icon: < LunchDining />
                                        },
                                    },
                                    {
                                        name: "pessoa",
                                        list: "/pessoa/",
                                        meta: {
                                            delete: "/pessoa/deleteById/:id",
                                            canDelete: false,
                                            label: 'Pessoas',
                                            icon: < Group/>
                                        },
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

                                        //Parte dos Pessoas
                                        <Route path="/pessoa/">
                                            <Route index element={<PessoaList />} />
                                            <Route
                                                path="create"
                                                element={<PessoaCreate />}
                                            />
                                            <Route
                                                path="edit/:id"
                                                element={<PessoaEdit />}
                                            />
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
                    </ThemeProvider>
                </ColorSchemeProvider>
            </RefineKbarProvider>
        </BrowserRouter>
    );
};

export default App;

/* eslint-disable jsx-a11y/alt-text */
import { Refine, AuthBindings, Authenticated } from '@refinedev/core';
import {
  useNotificationProvider,
  ThemedLayoutV2,
  ErrorComponent,
} from '@refinedev/antd';
import dataProvider from '@refinedev/simple-rest';
import {
  NavigateToResource,
  CatchAllNavigate,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from '@refinedev/react-router-v6';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { ConfigProvider, App as AntdApp, theme, Image } from 'antd';
import '@refinedev/antd/dist/reset.css';
import { Group, LunchDining } from '@mui/icons-material';
import { PostList, PostCreate, PostEdit, PostShow } from './pages/posts';
import { Login } from './pages/login';
import {
  loginAuth,
  clearDados,
  verifyUserExpired,
} from './services/authetication/authentication';
import Cookies from 'js-cookie';
import { LanchesList } from './pages/lanches/list';
import { PessoaList } from './pages/pessoa/list';
import { PessoaCreate } from './pages/pessoa/create';
import React, { useState } from 'react';
import { PessoaEdit } from './pages/pessoa/edit';

import { RefineKbarProvider } from '@refinedev/kbar';
import Titulo from './components/Titulo';
import ILogin from './interfaces/login';

const API_URL = 'http://localhost:1080/api';
const TOKEN_COOKIE_KEY: string = 'token';
const USER_COOKIE_KEY: string = 'user';

const App: React.FC = () => {
  const authProvider: AuthBindings = {
    login: async ({ username, password }) => {
      const user: ILogin = {
        login: username,
        senha: password,
      };
      const data = await loginAuth(user);
      if (data) {
        localStorage.setItem('username', username);
        return {
          success: true,
          redirectTo: '/',
        };
      }
      return {
        success: false,
        error: {
          message: 'Login failed',
          name: 'Dados invalidos',
        },
      };
    },
    logout: async () => {
      clearDados();
      return {
        success: true,
        redirectTo: '/login',
      };
    },
    onError: async error => {
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
          redirectTo: '/login',
        };
      }
    },
    getPermissions: async () => {
      return 'Bearer' + Cookies.get(TOKEN_COOKIE_KEY);
    },
  };

  const [currentTheme] = useState<'light' | 'dark'>('dark');
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ConfigProvider
          theme={{
            algorithm:
              currentTheme === 'light'
                ? theme.defaultAlgorithm
                : theme.darkAlgorithm,
            components: {
              Button: {
                borderRadius: 0,
              },
              Typography: {
                colorTextHeading: '#1890ff',
              },
            },
          }}
        >
          <AntdApp>
            <Refine
              dataProvider={dataProvider(API_URL)}
              authProvider={authProvider}
              notificationProvider={useNotificationProvider}
              resources={[
                {
                  name: 'posts',
                  list: '/posts',
                  show: '/posts/show/:id',
                  create: '/posts/create',
                  edit: '/posts/edit/:id',
                  meta: {
                    canDelete: false,
                    label: 'Em análise',
                  },
                },
                {
                  name: 'lanches',
                  list: '/lanches',
                  show: '/posts/show/',
                  create: '/posts/create',
                  edit: '/posts/edit/:id',
                  meta: {
                    canDelete: false,
                    label: 'Lanches',
                    icon: <LunchDining />,
                  },
                },
                {
                  name: 'pessoa',
                  list: '/pessoa/',
                  meta: {
                    delete: '/pessoa/deleteById/:id',
                    canDelete: false,
                    label: 'Pessoas',
                    icon: <Group />,
                  },
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
              }}
            >
              <Routes>
                <Route
                  element={
                    <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                      <ThemedLayoutV2 Title={() => <Titulo />}>
                        <Outlet />
                      </ThemedLayoutV2>
                    </Authenticated>
                  }
                >
                  <Route
                    index
                    element={<NavigateToResource resource="posts" />}
                  />
                  <Route path="/posts">
                    <Route index element={<PostList />} />
                    <Route path="create" element={<PostCreate />} />
                    <Route path="edit/:id" element={<PostEdit />} />
                    <Route path="show/:id" element={<PostShow />} />
                  </Route>
                  <Route
                    index
                    element={<NavigateToResource resource="posts" />}
                  />
                  <Route path="/lanches">
                    <Route index element={<LanchesList />} />
                  </Route>
                  <Route path="/pessoa/">
                    <Route index element={<PessoaList />} />
                    <Route path="create" element={<PessoaCreate />} />
                    <Route path="edit/:id" element={<PessoaEdit />} />
                  </Route>
                </Route>
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
                      <ThemedLayoutV2
                        Title={() => (
                          <Image
                            height={100}
                            width={100}
                            src={
                              'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200'
                            }
                          />
                        )}
                      >
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
      </RefineKbarProvider>
    </BrowserRouter>
  );
};

export default App;

/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import { removeformatarCPFCNPJ } from 'src/utils/FormatterUtils';
import ILogin from 'src/interfaces/login';

const API_URL = 'http://localhost:1080/api/usuarios/auth';
const API_URL_VERIFY = 'http://localhost:1080/api/usuarios/validatorUser';
const TOKEN_COOKIE_KEY: string = 'token';
const USER_COOKIE_KEY: string = 'user';
const DADOS_USUARIO: string = 'dados_usuario';
// const [authenticated, setAuthenticated] = useState(false);

// useEffect(() => {
//   // Check for authentication status when the component mounts
//   restoreAuthentication();
// }, []);

//   const showLoading = () => {
//     const loadingInstance = Loading.service({
//       lock: true,
//       fullscreen: true,
//       text: 'Carregando...',
//       spinner: 'el-icon-loading',
//       background: 'rgba(0, 0, 0, 1.7)',
//     });
//     return loadingInstance;
//   };

//   const hideLoading = () => {
//     const loadingInstance = showLoading();
//     loadingInstance.close();
//   };

//   const messageSuccess = () => {
//     console.success({
//       message: 'Seja bem-vindo!',
//     });
//   };

// Function to remove all cookies
const removeAllCookies = () => {
  const cookies = Object.keys(Cookies.get());
  cookies.forEach(cookie => {
    Cookies.remove(cookie);
  });
};

const clearAuthentication = () => {
  removeAllCookies();
  // setAuthenticated(false);
};

export const loginAuth = async (credentials: ILogin) => {
  credentials.login = removeformatarCPFCNPJ(credentials.login);
  const response = await axios.post(API_URL, credentials);
  const token = response.data.token;
  const user = jwtDecode(token);

  Cookies.set(TOKEN_COOKIE_KEY, token, { expires: 1, secure: true });
  Cookies.set(USER_COOKIE_KEY, JSON.stringify(user), {
    expires: 1,
    secure: true,
  });
  // setAuthenticated(true);
  const getUserCookie: string = Cookies.get('user') ?? '';
  const userCookie = JSON.parse(getUserCookie);
  const usuario = userCookie.sub;
  Cookies.set(DADOS_USUARIO, usuario, { expires: 1, secure: true });
  return true;
  // navigate.push('/')
  // //   showLoading();
  //   setTimeout(() => {
  //     // hideLoading();
  //     // messageSuccess();
  //     // Replace with your routing logic (React Router, for example)
  //     // history.push('/Despesas');
  //   }, 2000);
};

export const clearDados = () => {
  removeAllCookies();
  clearAuthentication();
};

export const verifyUserExpired = async () => {
  const response = await axios.get(
    `${API_URL_VERIFY}/${Cookies.get(TOKEN_COOKIE_KEY)}`
  );
  if (response.data === false) {
    removeAllCookies();
    clearAuthentication();
  }
};

import { SubmitHandler, useForm } from 'react-hook-form';
import { ToastContainer } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { authUser } from '../../thunks/user';
import { setUserInfo } from '../../reducers/userReducer';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input';
import './../SignUpPage/signUpPage.css';
import './signinPage.css';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '../../components/Button/Button';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export type IUser = {
  login: string;
  password: string;
};

export const SignInPage = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.userInfo.token.token);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<IUser>({
    mode: 'onSubmit',
  });
  const { t } = useTranslation();

  const onSubmit: SubmitHandler<IUser> = (data) => {
    const login = {
      login: data.login,
      password: data.password,
    };
    dispatch(authUser(login));
    dispatch(setUserInfo(login));
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 3000);
    }
  }, [token]);

  return (
    <div className="container-form">
      <div className="container-img-autorisation"></div>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h2>{t('signInPage.Log In')}</h2>
        <Input
          register={register('login')}
          nameInput={'login'}
          textLabel={t('signInPage.Login')}
          datatestId={'input-login'}
          type={'text'}
        />
        <Input
          register={register('password')}
          nameInput={'password'}
          textLabel={t('signInPage.Password')}
          datatestId={'input-password'}
          type="password"
          autoComplete="off"
        />
        <div className="redirect">
          {t('signInPage.New User? ')}
          <Link to="/signup" className="redirect-link">
            {t('signInPage.Sign Up')}
          </Link>
        </div>
        <Button onClick={handleSubmit(onSubmit)}>{t('signInPage.Log In')}</Button>
      </form>
      <ToastContainer position="top-right" />
    </div>
  );
};

import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ToastContainer } from 'react-toastify';
import { registerUser } from '../../thunks/user';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input';
import 'react-toastify/dist/ReactToastify.css';
import './signUpPage.css';
import { Button } from '../../components/Button/Button';
import { setSuccesRegister } from '../../reducers/userReducer';
import { useTranslation } from 'react-i18next';

export type IForm = {
  name: string;
  login: string;
  password: string;
  confirm: string;
  email: string;
};
export type IUser = {
  name: string;
  login: string;
  password: string;
};

export const SignUpPage = () => {
  const dispatch = useAppDispatch();
  const succesRegister = useAppSelector((state) => state.userInfo.succesRegister);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IForm>({
    mode: 'onSubmit',
  });

  const password = useRef('');
  password.current = watch('password');

  useEffect(() => {
    if (succesRegister) {
      setTimeout(() => {
        navigate('/signin', { replace: true });
      }, 3000);
    }
  }, [succesRegister]);

  const onSubmit: SubmitHandler<IForm> = async (data) => {
    const newUser = {
      name: data.name,
      login: data.login,
      password: data.password,
    };
    await dispatch(registerUser(newUser));
    dispatch(setSuccesRegister(false));
  };
  const { t } = useTranslation();

  return (
    <div className="container-form">
      <div className="container-img-register"></div>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h2>{t('signUpPage.Create account')}</h2>
        <div className="namesUser">
          <Input
            register={register('login', {
              required: 'Requered',
              minLength: { value: 3, message: 'Too short name' },
            })}
            nameInput={'login'}
            textLabel={t('signUpPage.Login')}
            datatestId={'input-login'}
            type={'text'}
            errors={errors}
          />
          <Input
            register={register('name', {
              required: 'Requered',
              minLength: { value: 3, message: 'Too short name' },
            })}
            nameInput={'name'}
            textLabel={t('signUpPage.Name')}
            datatestId={'input-name'}
            type={'text'}
            errors={errors}
          />
        </div>
        <Input
          register={register('password', {
            required: 'Requered',
            pattern: {
              value: /^(?=.{8,}$)(?=(?:.*?[A-Z]){2})(?=.*?[a-z])(?=(?:.*?[0-9]){2}).*$/,
              message: 'Must be contain 2numbers, 2lowercase, 2uppercase letters, min 8',
            },
          })}
          nameInput={'password'}
          textLabel={t('signUpPage.Password')}
          datatestId={'input-password'}
          type="password"
          errors={errors}
          autoComplete="off"
        />
        <Input
          register={register('confirm', {
            required: 'Requered',
            validate: (value) => value === password.current,
          })}
          nameInput={'confirm'}
          textLabel={t('signUpPage.Confirm Password')}
          datatestId={'input-confirm'}
          type="password"
          errors={errors}
          autoComplete="off"
        />
        <Input
          register={register('email', {
            required: 'Requered',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
          nameInput={'email'}
          textLabel={t('signUpPage.Email')}
          datatestId={'input-email'}
          type="email"
          errors={errors}
          autoComplete="off"
        ></Input>
        <div className="redirect">
          {t('signUpPage.Already have an account?')}
          <Link to="/signin" className="redirect-link">
            {t('signUpPage.Log In')}
          </Link>
        </div>
        <Button onClick={handleSubmit(onSubmit)}>{t('signUpPage.Register')}</Button>
      </form>
      <ToastContainer position="top-right" />
    </div>
  );
};

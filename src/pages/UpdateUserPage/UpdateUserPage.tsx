import { SubmitHandler, useForm } from 'react-hook-form';
import Input from '../../components/Input/Input';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import jwt_decode from 'jwt-decode';
import { deleteUser, updateUser } from '../../thunks/user';
import { setSuccesDelete } from '../../reducers/userReducer';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { Button } from '../../components/Button/Button';
import { TOKEN } from '../../constants/constants';
import { useTranslation } from 'react-i18next';
import {
  changeModalFunction,
  changeModalName,
  changeModalText,
  changeModalTitle,
  setModalInfo,
  toggleActive,
} from '../../reducers/modalReducer';
import './updateUserPage.css';

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

export type IUserFromToken = {
  iat: number;
  login: string;
  userId: string;
};

export const UpdateUserPage = () => {
  const token = TOKEN() as string;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const succesDelete = useAppSelector((state) => state.userInfo.succesDelete);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    mode: 'onSubmit',
  });
  const { t } = useTranslation();

  useEffect(() => {
    if (succesDelete) {
      navigate('/', { replace: true });
      dispatch(setSuccesDelete(false));
    }
  }, [succesDelete]);

  const onSubmit: SubmitHandler<IForm> = (data) => {
    const newUser = {
      name: data.name,
      login: data.login,
      password: data.password,
    };
    if (token) {
      const decodedToken: IUserFromToken = jwt_decode(token as string);
      const userId = decodedToken.userId;
      dispatch(updateUser({ userId, newUser, token }));
    } else {
      toast.error('Error, please try again later');
    }
  };

  const onDelete = async () => {
    if (token) {
      const decodedToken: IUserFromToken = jwt_decode(token as string);
      const userId = decodedToken.userId;
      await dispatch(deleteUser({ userId }));
    } else {
      toast.error('Invalid token, login and try again');
    }
  };

  function openModal(
    modalName: string,
    modalTitle: string,
    confirmFunction: (e: MouseEvent) => void,
    modalButtonTxt = 'Ok',
    info = null
  ) {
    dispatch(changeModalName(modalName));
    dispatch(changeModalTitle(modalTitle));
    dispatch(changeModalText(modalButtonTxt));
    dispatch(changeModalFunction(confirmFunction));
    dispatch(toggleActive());
    if (info) dispatch(setModalInfo(info));
  }

  return (
    <div className="container-form form-update">
      <div className="container-img-update"></div>
      <form className="form">
        <h2>{t('updateUserPage.Update User Info')}</h2>
        <div className="namesUser">
          <Input
            register={register('login', {
              required: t('updateUserPage.Required'),
              minLength: { value: 3, message: 'Too short name' },
            })}
            nameInput={'login'}
            textLabel={t('updateUserPage.Login')}
            datatestId={'input-login'}
            type={'text'}
            errors={errors}
          />
          <Input
            register={register('name', {
              required: t('updateUserPage.Required'),
              minLength: { value: 3, message: 'Too short name' },
            })}
            nameInput={'name'}
            textLabel={t('updateUserPage.Name')}
            datatestId={'input-name'}
            type={'text'}
            errors={errors}
          />
        </div>
        <Input
          register={register('password', {
            required: t('updateUserPage.Required'),
            pattern: {
              value: /^(?=.{8,}$)(?=(?:.*?[A-Z]){2})(?=.*?[a-z])(?=(?:.*?[0-9]){2}).*$/,
              message: 'Must be contain 2numbers, 2lowercase, 2uppercase letters, min 8',
            },
          })}
          nameInput={'password'}
          textLabel={t('updateUserPage.Password')}
          datatestId={'input-password'}
          type="password"
          errors={errors}
          autoComplete="off"
        />
        <div className="buttons-form-update">
          <Button
            className={'btn-warn'}
            onClick={(e) => {
              e.preventDefault();
              openModal(
                'ConfirmModal',
                t('updateUserPage.Do you really want to delete a user?'),
                onDelete,
                t('updateUserPage.Ok')
              );
            }}
          >
            {t('updateUserPage.Delete User')}
          </Button>
          <Button onClick={handleSubmit(onSubmit)}>{t('updateUserPage.Update info')}</Button>
        </div>
      </form>
      <ToastContainer position="top-right" />
    </div>
  );
};

import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../constants/constants';
import { IUser } from '../pages/SignUpPage/SignUpPage';
import { TOKEN } from '../constants/constants';
import { toast } from 'react-toastify';
import { setSuccesDelete, setToken, setUserInfo } from '../reducers/userReducer';

export interface ILogin {
  login: string;
  password: string;
}

export const registerUser = createAsyncThunk('user/register', async (user: IUser) => {
  try {
    const response = await fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 409) {
      throw new Error(`User login already exists!`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error((err as Error).message);
  }
});

export const authUser = createAsyncThunk('user/auth', async (login: ILogin) => {
  try {
    const response = await fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      body: JSON.stringify(login),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 403) {
      throw new Error('User was not founded or incorrect password!');
    }
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error((err as Error).message);
  }
});

export const updateUser = createAsyncThunk(
  'user/update',
  async (params: { userId: string; newUser: IUser; token: string }, { dispatch }) => {
    try {
      const response = await fetch(`${BASE_URL}/users/${params.userId}`, {
        method: 'PUT',
        body: JSON.stringify(params.newUser),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${params.token}`,
        },
      });
      if (response.status === 404) {
        throw new Error('User was not founded!');
      }
      if (response.status === 200) {
        dispatch(authUser({ login: params.newUser.login, password: params.newUser.password }));
        dispatch(setUserInfo({ login: params.newUser.login, password: params.newUser.password }));
      }
      const data = await response.json();
      return data;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'user/delete',
  async (params: { userId: string }, { dispatch }) => {
    try {
      const response = await fetch(`${BASE_URL}/users/${params.userId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${TOKEN()}`,
        },
      });
      if (response.status === 204) {
        toast.success('User deleted successfully');
        localStorage.clear();
        dispatch(setSuccesDelete(true));
        dispatch(setToken({ token: null }));
      } else {
        toast.error('Error, please try again later');
      }
      const data = await response.json();
      return data;
    } catch (err) {
      throw new Error('Error, please try again later');
    }
  }
);

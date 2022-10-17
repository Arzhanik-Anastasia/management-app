import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL, TOKEN } from '../constants/constants';
import { IBoard, INewBoard, setBadToken } from '../reducers/boardsReducer';

export const getBoards = createAsyncThunk('boards/getBoards', async (_, { dispatch }) => {
  try {
    const response = await fetch(`${BASE_URL}/boards`, {
      headers: {
        Authorization: `Bearer ${TOKEN()}`,
      },
    });
    if (response.status === 404) {
      throw new Error(`Board was not founded!`);
    }
    if (response.status === 401) {
      dispatch(setBadToken());
      throw new Error(`Unauthorized!`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error('Something go wrong');
  }
});

export const createBoard = createAsyncThunk(
  'boards/createBoard',
  async (board: INewBoard, { dispatch }) => {
    try {
      const response = await fetch(`${BASE_URL}/boards`, {
        method: 'POST',
        body: JSON.stringify(board),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN()}`,
        },
      });
      if (response.status === 404) {
        throw new Error(`Board was not founded!`);
      }
      if (response.status === 401) {
        dispatch(setBadToken());
        throw new Error(`Unauthorized!`);
      }
      const data = await response.json();
      return data;
    } catch (err) {
      throw new Error('Something go wrong');
    }
  }
);

export const updateBoard = createAsyncThunk(
  'boards/updateBoard',
  async (board: IBoard, { dispatch }) => {
    try {
      const response = await fetch(`${BASE_URL}/boards/${board.id}`, {
        method: 'PUT',
        body: JSON.stringify({ title: board.title, description: board.description }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN()}`,
        },
      });
      if (response.status === 404) {
        throw new Error(`Board was not founded!`);
      }
      if (response.status === 401) {
        dispatch(setBadToken());
        throw new Error(`Unauthorized!`);
      }
      const data = await response.json();
      return data;
    } catch (err) {
      throw new Error('Something go wrong');
    }
  }
);

export const deleteBoard = createAsyncThunk(
  'boards/deleteBoard',
  async (id: string, { dispatch }) => {
    try {
      const response = await fetch(`${BASE_URL}/boards/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${TOKEN()}`,
        },
      });
      if (response.status === 404) {
        throw new Error(`Board was not founded!`);
      }
      if (response.status === 204) {
        const response = await fetch(`${BASE_URL}/boards`, {
          headers: {
            Authorization: `Bearer ${TOKEN()}`,
          },
        });
        const data = await response.json();
        return data;
      }
      if (response.status === 401) {
        dispatch(setBadToken());
        throw new Error(`Unauthorized!`);
      }
    } catch (err) {
      throw new Error('Something go wrong');
    }
  }
);

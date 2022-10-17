import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL, TOKEN } from '../constants/constants';

export type INewTask = {
  title: string;
  description: string;
  userId: string;
  order?: number;
  boardId?: string;
  columnId?: string;
};

export const addTask = createAsyncThunk(
  'tasks/add',
  async (params: { boardId?: string; columnId: string; token: string; newTask: INewTask }) => {
    try {
      const response = await fetch(
        `${BASE_URL}/boards/${params.boardId}/columns/${params.columnId}/tasks`,
        {
          method: 'POST',
          body: JSON.stringify(params.newTask),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${params.token}`,
          },
        }
      );
      if (response.status === 401) {
        throw new Error(`Unauthorized!`);
      }
      const data = await response.json();
      return data;
    } catch {
      throw new Error('Error, please try again later');
    }
  }
);
export const updateTask = createAsyncThunk(
  'tasks/update',
  async (params: {
    boardId: string;
    oldColumnId: string;
    id: string;
    token: string;
    newTask: INewTask;
  }) => {
    try {
      const response = await fetch(
        `${BASE_URL}/boards/${params.boardId}/columns/${params.oldColumnId}/tasks/${params.id}`,
        {
          method: 'PUT',
          body: JSON.stringify(params.newTask),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${params.token}`,
          },
        }
      );
      if (response.status === 401) {
        throw new Error(`Unauthorized!`);
      }
      const data = await response.json();
      return data;
    } catch {
      throw new Error('Error, please try again later');
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/delete',
  async (params: { boardId: string; columnId: string; id: string; token: string }) => {
    try {
      const response = await fetch(
        `${BASE_URL}/boards/${params.boardId}/columns/${params.columnId}/tasks/${params.id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${params.token}`,
          },
        }
      );
      if (response.status === 401) {
        throw new Error(`Unauthorized!`);
      }
      const data = await response.json();
      return data;
    } catch {
      throw new Error('Error, please try again later');
    }
  }
);

export const getAllTask = createAsyncThunk('tasks/all', async () => {
  try {
    const response = await fetch(`${BASE_URL}/search/tasks`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${TOKEN()}`,
      },
    });
    if (response.status === 401) {
      throw new Error(`Unauthorized!`);
    }
    const data = await response.json();
    return data;
  } catch {
    throw new Error('Error, please try again later');
  }
});

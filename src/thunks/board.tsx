import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL, TOKEN } from '../constants/constants';
import { IColumn, ITask, setBadToken } from '../reducers/oneBoardReducer';

//use constant token in this case
export const getBoard = createAsyncThunk(
  'board/get',
  async (params: { boardId: string }, { dispatch }) => {
    try {
      const response = await fetch(`${BASE_URL}/boards/${params.boardId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN()}`,
        },
      });
      if (response.status === 401) {
        dispatch(setBadToken());
        throw new Error(`Unauthorized!`);
      }
      const data = await response.json();
      data.columns.sort((a: IColumn, b: IColumn) => (a.order > b.order ? 1 : -1));
      data.columns.forEach((column: IColumn) => {
        column.tasks.sort((a: ITask, b: ITask) => (a.order > b.order ? 1 : -1));
      });
      return data;
    } catch (err) {
      throw new Error('Something go wrong');
    }
  }
);

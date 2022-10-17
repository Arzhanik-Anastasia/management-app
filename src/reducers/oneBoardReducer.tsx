import { createSlice } from '@reduxjs/toolkit';
import { getBoard } from '../thunks/board';
import { updateColumn } from '../thunks/column';
import { addTask, deleteTask, updateTask } from '../thunks/task';

export type ITask = {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
};

export type IColumn = {
  id: string;
  title: string;
  order: number;
  tasks: ITask[];
};

export type BoardState = {
  board: {
    id: string;
    title: string;
    columns: IColumn[];
  };
  isLoading: boolean;
  badToken: boolean;
};

const initialState: BoardState = {
  board: {
    id: '',
    title: '',
    columns: [],
  },
  isLoading: false,
  badToken: false,
};

const oneBoardReducer = createSlice({
  name: 'oneBoard',
  initialState,
  reducers: {
    setBadToken(state) {
      state.badToken = true;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBoard.fulfilled, (state, action) => {
        state.board = action.payload;
        state.isLoading = false;
      })
      .addCase(getBoard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBoard.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addTask.fulfilled, () => {})
      .addCase(addTask.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateColumn.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateColumn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateColumn.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateTask.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTask.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteTask.fulfilled, () => {})
      .addCase(deleteTask.rejected, () => {});
  },
});

export default oneBoardReducer.reducer;
export const { setBadToken } = oneBoardReducer.actions;

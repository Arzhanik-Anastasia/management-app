import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from '../reducers/userReducer';
import boardReduser from '../reducers/boardsReducer';
import modalReducer from '../reducers/modalReducer';
import oneBoardReducer from '../reducers/oneBoardReducer';

export const store = configureStore({
  reducer: {
    userInfo: userReducer,
    oneBoard: oneBoardReducer,
    boards: boardReduser,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

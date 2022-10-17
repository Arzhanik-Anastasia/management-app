import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { IColumn } from '../../../reducers/oneBoardReducer';
import { useAppDispatch } from '../../../store/hooks';
import { getBoard } from '../../../thunks/board';
import { updateColumn } from '../../../thunks/column';
import './titleColumn.css';

type IProps = {
  setIsInput: Dispatch<SetStateAction<boolean>>;
  column: IColumn;
  boardId: string;
};
export const InputTitle = ({ setIsInput, column, boardId }: IProps) => {
  const dispatch = useAppDispatch();
  const [valueTitle, setNewTitle] = useState<string>('');
  const { id, order, title } = column;
  const token = localStorage.getItem('token') as string;

  const updateTitleColumn = async () => {
    const newColumn = {
      title: valueTitle,
      order: order,
    };
    await dispatch(updateColumn({ boardId, id, token, newColumn }));
    setIsInput(false);
    dispatch(getBoard({ boardId }));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  return (
    <div className="title__input">
      <input
        className="title_column"
        type="text"
        placeholder={title}
        onChange={(e) => handleChange(e)}
        value={valueTitle}
      />
      <div className="apply__icon" onClick={updateTitleColumn}></div>
      <div className="cancel__icon" onClick={() => setIsInput(false)}></div>
    </div>
  );
};

import { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useTranslation } from 'react-i18next';
import { Navigate, useParams } from 'react-router';
import { Button } from '../../components/Button/Button';
import { Column } from '../../components/Column/Column';
import {
  changeModalFunction,
  changeModalName,
  changeModalText,
  changeModalTitle,
  IInfo,
  setModalInfo,
  toggleActive,
} from '../../reducers/modalReducer';
import { Spinner } from '../../components/Spinner/Spinner';
import { IColumn } from '../../reducers/oneBoardReducer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getBoard } from '../../thunks/board';
import { addColumn } from '../../thunks/column';
import { IBoard } from '../../reducers/boardsReducer';
import './boardPage.css';
import { getBoards } from '../../thunks/boards';

interface IBoardInfo {
  id: string | undefined;
}

export function BoardPage() {
  const { boardId } = useParams();
  const token = localStorage.getItem('token') as string;
  const dispatch = useAppDispatch();
  const { board, isLoading, badToken } = useAppSelector((state) => state.oneBoard);
  const { boards } = useAppSelector((state) => state.boards);
  const { t } = useTranslation();
  const [wrongRoute, setWrongRoute] = useState(false);

  useEffect(() => {
    dispatch(getBoards());
  }, []);

  useEffect(() => {
    if (boards.length === 0) return;
    if (boards.find((board: IBoard) => board.id === boardId) && token && boardId) {
      dispatch(getBoard({ boardId }));
    } else setWrongRoute(true);
  }, [boards]);

  function openModal(
    modalName: string,
    modalTitle: string,
    confirmFunction: (info: IInfo) => void,
    modalButtonTxt = 'Ok',
    info: IBoardInfo | null = null
  ) {
    dispatch(changeModalName(modalName));
    dispatch(changeModalTitle(modalTitle));
    dispatch(changeModalText(modalButtonTxt));
    dispatch(changeModalFunction(confirmFunction));
    dispatch(toggleActive());
    if (info) dispatch(setModalInfo(info));
  }

  const onAddColumn = async ({ title, id }: IInfo) => {
    const boardId = id;
    const newColumn = {
      title: title || '',
    };
    if (token && boardId) {
      await dispatch(addColumn({ boardId, newColumn }));
      await dispatch(getBoard({ boardId }));
    }
  };

  const Board = () => {
    if (boardId && board.columns.length > 0) {
      return (
        <DndProvider backend={HTML5Backend}>
          <ul className="columns">
            {board.columns.map((column: IColumn) => {
              return <Column key={column.id} boardId={boardId} column={column} />;
            })}
          </ul>
        </DndProvider>
      );
    } else {
      return null;
    }
  };

  if (badToken) {
    return <Navigate to="/welcome" state={{ from: location }} />;
  }

  if (!wrongRoute) {
    return (
      <div className="board-page__inner">
        <Button
          onClick={() =>
            openModal(
              'FormModal',
              t('boardPage.Create a new column'),
              onAddColumn,
              t('boardPage.Create'),
              { id: boardId }
            )
          }
          className={'btn-add-column'}
        >
          {t('boardPage.Add Column')}
        </Button>
        <div className="content-board">{isLoading ? <Spinner /> : <Board />}</div>
      </div>
    );
  } else {
    return <Navigate to="/404" state={{ from: location }} />;
  }
}

import { IColumn, ITask } from '../../reducers/oneBoardReducer';
import { useAppDispatch } from '../../store/hooks';
import { getBoard } from '../../thunks/board';
import { addTask, updateTask } from '../../thunks/task';
import jwt_decode from 'jwt-decode';
import { ITaskProps, Task } from '../Task/Task';
import { IUserFromToken } from '../../pages/UpdateUserPage/UpdateUserPage';
import {
  changeModalFunction,
  changeModalName,
  changeModalText,
  changeModalTitle,
  IInfo,
  setModalInfo,
  toggleActive,
} from '../../reducers/modalReducer';
import { deleteColumn, updateColumn } from '../../thunks/column';
import { useRef, useState } from 'react';
import { DragSourceMonitor, useDrag, useDrop } from 'react-dnd';
import { InputTitle } from './titleColumn/TitleColumn';
import { useTranslation } from 'react-i18next';
import './column.css';
import { Button } from '../Button/Button';

type IColumnProps = {
  boardId: string;
  column: IColumn;
};

export const Column = ({ boardId, column }: IColumnProps) => {
  const dispatch = useAppDispatch();
  const { id, title, order, tasks } = column;
  const token = localStorage.getItem('token') as string;
  const decodedToken: IUserFromToken = jwt_decode(token as string);
  const userId = decodedToken.userId;
  const [isInput, setIsInput] = useState(false);
  const { t } = useTranslation();

  function openModal(
    modalName: string,
    modalTitle: string,
    confirmFunction: (info: IInfo) => Promise<void>,
    modalButtonTxt = 'Ok',
    info: IInfo | null = null
  ) {
    dispatch(changeModalName(modalName));
    dispatch(changeModalTitle(modalTitle));
    dispatch(changeModalText(modalButtonTxt));
    dispatch(changeModalFunction(confirmFunction));
    dispatch(toggleActive());
    if (info) dispatch(setModalInfo(info));
  }

  const onDeleteColumn = async ({ id }: IInfo) => {
    const columnId = id;
    if (token && boardId) {
      await dispatch(deleteColumn({ boardId, columnId, token }));
      dispatch(getBoard({ boardId }));
    }
  };

  const refColumn = useRef<HTMLLIElement>(null);

  const [{ opacity }, dragRef] = useDrag({
    type: 'column',
    item: { column, boardId },
    collect: (monitor: DragSourceMonitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: ['column', 'task'],
    async drop(item: IColumnProps | ITaskProps) {
      if ((item as IColumnProps).column) {
        if ((item as IColumnProps).column.id === column.id) {
          return;
        } else {
          const newColumn = {
            title: (item as IColumnProps).column.title,
            order: column.order,
          };
          const { id } = (item as IColumnProps).column;
          await dispatch(updateColumn({ boardId, id, token, newColumn }));
          await dispatch(getBoard({ boardId }));
        }
      } else if ((item as ITaskProps).task && column.tasks.length === 0) {
        const order = column.tasks.length > 0 ? (item as ITaskProps).task.order : 1;
        const newTask = {
          title: (item as ITaskProps).task.title,
          order,
          description: (item as ITaskProps).task.description,
          userId: (item as ITaskProps).task.userId,
          boardId,
          columnId: column.id,
        };
        const { id } = (item as ITaskProps).task;
        const oldColumnId = (item as ITaskProps).columnId;
        await dispatch(updateTask({ boardId, oldColumnId, id, token, newTask }));
        await dispatch(getBoard({ boardId }));
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = isOver && canDrop;
  let backgroundColor = '#a7d1f8';
  let border = '1px solid #a7d1f8';
  if (isActive) {
    backgroundColor = '#4ea1f0';
    border = '1px dashed black';
  } else if (canDrop) {
    backgroundColor = '#85bff5';
    border = '1px solid #85bff5';
  }

  dragRef(dropRef(refColumn));

  const onAddTask = async ({ title, description }: IInfo) => {
    const columnId = id;
    if (token && boardId) {
      const newTask = {
        title: title || '',
        description: description || 'No description',
        userId: userId,
      };
      await dispatch(addTask({ boardId, columnId, token, newTask }));
      dispatch(getBoard({ boardId }));
    }
  };

  return (
    <>
      <li
        key={id}
        className="column"
        id={`column-${order}`}
        ref={refColumn}
        style={{ opacity, backgroundColor, border }}
      >
        <div className="column__header">
          {isInput ? (
            <InputTitle setIsInput={setIsInput} column={column} boardId={boardId} />
          ) : (
            <h3 onClick={() => setIsInput(true)}>{title}</h3>
          )}
          <div
            className="delete-column"
            onClick={() =>
              openModal(
                'ConfirmModal',
                t('column.Do you really want to delete a column?'),
                onDeleteColumn,
                t('column.Ok'),
                { id: id }
              )
            }
          ></div>
        </div>
        <ul className="tasks">
          {tasks.length > 0
            ? tasks.map((task: ITask) => {
                return <Task key={task.id} boardId={boardId} columnId={id} task={task} />;
              })
            : null}
        </ul>
        <Button
          onClick={() =>
            openModal('BigFormModal', t('column.Create a new task'), onAddTask, t('column.Create'))
          }
        >
          {t('column.Add Task')}
        </Button>
      </li>
    </>
  );
};

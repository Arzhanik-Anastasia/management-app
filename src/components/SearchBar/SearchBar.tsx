import { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getAllTask } from '../../thunks/task';
import './searchBar.css';

type ITaskType = {
  boardId: string;
  columnId: string;
  description: string;
  id: string;
  order: number;
  title: string;
  user: { name: string };
  userId: string;
};

export const SearchBar = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.boards.tasks);
  const [searchValue, setSearchValue] = useState('');
  const [filterTask, setFilterTask] = useState<ITaskType[]>(tasks);
  const [isVisible, setVisible] = useState(false);
  const { t } = useTranslation();

  const onSearch = async () => {
    if (!searchValue) return;
    await dispatch(getAllTask());
    const filterTask: ITaskType[] = [];
    if (tasks.length > 0) {
      tasks.forEach((task: ITaskType) => {
        if (task.title.includes(searchValue) || task.description.includes(searchValue)) {
          filterTask.push(task);
        }
      });
      setFilterTask(filterTask);
      setVisible(true);
      setSearchValue('');
    }
  };

  useEffect(() => {
    setFilterTask(tasks);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="search-panel">
      <div className="search-block">
        <input
          className="input-search"
          name="search"
          placeholder={t('mainPage.Task placeholder')}
          value={searchValue}
          onChange={(e) => handleChange(e)}
        ></input>
        <button className="btn-search btn" onClick={onSearch}>
          Search
        </button>
      </div>
      {isVisible ? (
        <div className="list-search">
          <div className="list-content">
            <div className="header-list">
              <div>{t('mainPage.Task title')}</div>
              <div>{t('mainPage.Task description')}</div>
            </div>
            <div className="list">
              {filterTask.length > 0 ? (
                filterTask.map((task: ITaskType) => (
                  <Link to={task.boardId} key={task.id}>
                    <div>{task.title}</div>
                    <div>{task.description}</div>
                  </Link>
                ))
              ) : (
                <p>{t('mainPage.Task search')}</p>
              )}
            </div>
            <span className="close" onClick={() => setVisible(false)}></span>
          </div>
        </div>
      ) : null}
    </div>
  );
};

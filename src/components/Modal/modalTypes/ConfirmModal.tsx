import { useTranslation } from 'react-i18next';
import { toggleActive } from '../../../reducers/modalReducer';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { Button } from '../../Button/Button';

export const ConfirmModal = () => {
  const { title, text, changingInfo, confirmFunction } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  const closingModal = () => {
    confirmFunction({ id: changingInfo.id });
    dispatch(toggleActive());
  };
  const { t } = useTranslation();

  return (
    <div className="modal__cont" onClick={(e) => e.stopPropagation()}>
      <h2 className="modal__title">{title}</h2>
      <Button className="btn__modal" onClick={() => closingModal()}>
        {text}
      </Button>
      <Button className="btn__modal" onClick={() => dispatch(toggleActive())}>
        {t('modal.Back')}
      </Button>
    </div>
  );
};

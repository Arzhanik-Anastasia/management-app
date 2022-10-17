import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  changeModalFunction,
  changeModalName,
  changeModalText,
  changeModalTitle,
  toggleActive,
} from '../../reducers/modalReducer';
import './modal.css';
import * as ModalsContent from './modalTypes';

export const Modal = () => {
  const { activeModal, name } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();
  const ModalContent = ModalsContent?.[name];

  const closingModal = () => {
    dispatch(toggleActive());
    dispatch(changeModalName('ConfirmModal'));
    dispatch(changeModalTitle(''));
    dispatch(changeModalText(''));
    dispatch(changeModalFunction(() => {}));
  };

  return (
    <div onClick={() => closingModal()} className={activeModal ? 'modal' : 'modal-not_active'}>
      <ModalContent onClick={(event) => event.stopPropagation()} />
    </div>
  );
};

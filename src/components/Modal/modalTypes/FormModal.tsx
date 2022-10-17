import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { IBoard } from '../../../reducers/boardsReducer';
import {
  changeModalFunction,
  changeModalName,
  changeModalText,
  changeModalTitle,
  toggleActive,
} from '../../../reducers/modalReducer';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { Button } from '../../Button/Button';
import Input from '../../Input/Input';

export const FormModal = () => {
  const dispatch = useAppDispatch();
  const { text, title, confirmFunction, changingInfo } = useAppSelector((state) => state.modal);
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IBoard>({
    mode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<IBoard> = (data: IBoard) => {
    const info = {
      title: data.title,
      description: data.description,
      id: changingInfo.id,
    };
    confirmFunction(info);
    closingModal();
  };

  const closingModal = () => {
    dispatch(toggleActive());
    dispatch(changeModalName('ConfirmModal'));
    dispatch(changeModalTitle(''));
    dispatch(changeModalText(''));
    dispatch(changeModalFunction(() => {}));
  };

  return (
    <div className="modal__cont container-form" onClick={(e) => e.stopPropagation()}>
      <h2 className="modal__title">{title}</h2>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <Input
          register={register('title', {
            required: 'Requered',
            minLength: { value: 3, message: t('modal.Too short title') },
          })}
          nameInput={'title'}
          textLabel={t('modal.Title')}
          datatestId={'input-title'}
          type={'text'}
          errors={errors}
        />
        <Button
          data-testid="button-submit-form"
          className="btn__modal"
          onClick={handleSubmit(onSubmit)}
        >
          {text}
        </Button>
      </form>
      <Button data-testid="button-close-form" className="btn__modal" onClick={() => closingModal()}>
        {t('modal.Back')}
      </Button>
    </div>
  );
};

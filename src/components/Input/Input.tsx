import { FieldErrors, FieldValues, UseFormRegisterReturn } from 'react-hook-form';
import './input.css';

type IProps = {
  register?: UseFormRegisterReturn;
  nameInput: string;
  textLabel: string;
  type: string;
  datatestId: string;
  errors?: FieldErrors<FieldValues>;
  max?: string;
  className?: string;
  classNameLabel?: string;
  autoComplete?: string;
};

const Input = ({
  register,
  nameInput,
  textLabel,
  type,
  datatestId,
  errors,
  max,
  className,
  classNameLabel,
  autoComplete,
}: IProps) => {
  return (
    <>
      <label htmlFor={nameInput} className={classNameLabel}>
        <p>{textLabel}</p>
        <input
          className={className}
          type={type}
          data-testid={datatestId}
          {...register}
          max={max}
          autoComplete={autoComplete}
        />
        <span
          className="error-span"
          data-testid="error"
          style={{ color: 'red', display: 'inline-block', width: '70%' }}
        >
          {errors?.[nameInput]?.message}
          {errors?.[nameInput]?.type === 'validate' && 'Passwords do not match'}
        </span>
      </label>
    </>
  );
};

export default Input;

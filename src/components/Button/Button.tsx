import { MouseEventHandler } from 'react';
import './button.css';
type IPropsButton = {
  children: React.ReactNode;
  onClick: (() => void) | MouseEventHandler<HTMLButtonElement>;
  className?: string;
};
export const Button = ({ children, onClick, className }: IPropsButton) => {
  const classes = className ? `btn ${className}` : 'btn';
  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  );
};

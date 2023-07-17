import styles from './Button.module.css';

type ButtonProps = {
  type?: 'primary' | 'back' | 'position';
  onClick?: (e: never) => void;
  children: React.ReactNode;
};

const Button = function ({ type, onClick, children }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${styles.btn} ${type ? styles[type] : ''}`.trim()}
    >
      {children}
    </button>
  );
};

export default Button;

import { Link } from 'react-router-dom';

const Button = function ({
  children,
  disabled,
  to,
  type = 'primary',
}: {
  children: React.ReactNode;
  disabled?: boolean;
  to?: string;
  type?: 'primary' | 'small' | 'secondary';
}): React.JSX.Element {
  const base =
    'inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed ';

  const styles: { [key: string]: string } = {
    primary: base + 'px-3 py-2.5 md:px-5 md:py-3',
    small: base + 'px-3 py-1.5 md:px-4 md:py-2 text-xs',
    secondary:
      'inline-block text-sm rounded-full border-2 border-stone-300 font-semibold uppercase tracking-wide text-stone-400 transition-colors duration-300 hover:bg-stone-300 hover:text-stone-800 focus:bg-stone-300 focus:outline-none focus:text-stone-800 focus:ring focus:ring-stone-300 focus:ring-offset-2 disabled:cursor-not-allowed px-3 py-2 md:px-5 md:py-2.5',
  };

  return (
    <>
      {to ? (
        <Link to={to} className={styles[type]}>
          {children}
        </Link>
      ) : (
        <button className={styles[type]} disabled={disabled}>
          {children}
        </button>
      )}
    </>
  );
};

export default Button;

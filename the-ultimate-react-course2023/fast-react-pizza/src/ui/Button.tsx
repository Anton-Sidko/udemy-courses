import { Link } from 'react-router-dom';

const Button = function ({
  children,
  disabled,
  to,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  to?: string;
}): React.JSX.Element {
  const className =
    'inline-block rounded-full bg-yellow-400 px-4 py-3 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed sm:px-6 sm:py-4';

  return (
    <>
      {to ? (
        <Link to={to} className={className}>
          {children}
        </Link>
      ) : (
        <button className={className} disabled={disabled}>
          {children}
        </button>
      )}
    </>
  );
};

export default Button;

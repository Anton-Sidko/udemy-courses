import { Link, useNavigate } from 'react-router-dom';

const LinkButton = function ({
  children,
  to,
}: {
  children: React.ReactNode;
  to: string;
}): React.JSX.Element {
  const navigate = useNavigate();
  const className = 'text-sm text-blue-500 hover:text-blue-700 hover:underline';

  return (
    <>
      {to === '-1' ? (
        <button className={className} onClick={() => navigate(-1)}>
          {children}
        </button>
      ) : (
        <Link to={to} className={className}>
          {children}
        </Link>
      )}
    </>
  );
};

export default LinkButton;

import { Link } from 'react-router-dom';

const Header = function (): React.JSX.Element {
  return (
    <header>
      <Link to="/">Fast React Pizza Co.</Link>

      <p>Anton</p>
    </header>
  );
};

export default Header;

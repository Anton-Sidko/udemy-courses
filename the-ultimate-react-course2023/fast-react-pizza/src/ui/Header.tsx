import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';

const Header = function (): React.JSX.Element {
  return (
    <header>
      <Link to="/">Fast React Pizza Co.</Link>

      <SearchOrder />

      <p>Anton</p>
    </header>
  );
};

export default Header;

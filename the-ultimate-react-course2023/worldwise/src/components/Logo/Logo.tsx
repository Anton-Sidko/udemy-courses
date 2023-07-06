import { Link } from 'react-router-dom';
import styles from './Logo.module.css';

const Logo = function (): React.JSX.Element {
  return (
    <Link to="/">
      <img
        src="/logo.png"
        alt="WorldWise logo"
        className={styles.logo}
      />
    </Link>
  );
};

export default Logo;


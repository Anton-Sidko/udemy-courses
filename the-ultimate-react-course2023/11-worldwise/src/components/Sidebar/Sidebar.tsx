import { Outlet } from 'react-router-dom';

import AppNav from '../AppNav/AppNav';
import Footer from '../Footer/Footer';
import Logo from '../Logo/Logo';
import styles from './Sidebar.module.css';

const Sidebar = function (): React.JSX.Element {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <Outlet />

      <Footer />
    </div>
  );
};

export default Sidebar;

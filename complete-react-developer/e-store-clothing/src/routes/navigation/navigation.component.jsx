import { Fragment } from 'react';
import { Outlet, Link } from 'react-router-dom';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

import './navigation.styles.scss';

const Navigation = () => {
  return (
    // Fragment or <></>
    <Fragment>
      <div className="navigation">
        <Link
          className="logo-container"
          to="/"
        >
          <CrwnLogo className="logo" />
        </Link>

        <nav className="nav-links-container">
          <Link
            className="nav-link"
            to="/shop"
          >
            SHOP
          </Link>
          <Link
            className="nav-link"
            to="/sign-in"
          >
            SIGN IN
          </Link>
        </nav>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;

import Logo from '../components/Logo';

const NavBar = function ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
};

export default NavBar;

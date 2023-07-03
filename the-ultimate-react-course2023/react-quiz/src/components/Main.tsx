const Main = function ({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return <main className="main">{children}</main>;
};

export default Main;

const MainLayout = (props) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-4 lg:pt-12">
      <div className="md:col-start-2 md:col-span-2">{props.children}</div>
    </section>
  );
};

export default MainLayout;
